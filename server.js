const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_EMAILS = ['blissmusafir@gmail.com', 'parvaraval27@gmail.com'];
const CONTACT_RECIPIENT = 'blissmusafir@gmail.com';
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173';
const API_URL = process.env.PUBLIC_API_URL || `http://localhost:${PORT}`;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_TIMEOUT_MS = Number(process.env.SMTP_TIMEOUT_MS || 10000);
const MAIL_FROM = process.env.MAIL_FROM || 'Bliss Musafir <no-reply@blissmusafir.com>';
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'change-me-in-production';
const NEWSLETTER_CRON = process.env.NEWSLETTER_CRON || '0 9 * * 0';
const CORS_ORIGINS = (process.env.CORS_ORIGIN)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('public'));

function createMailer() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendMailWithTimeout(mailer, message, timeoutMs = SMTP_TIMEOUT_MS) {
  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`SMTP request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([mailer.sendMail(message), timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function parseRequestBody(req) {
  return {
    ...req.body,
    email: normalizeEmail(req.body?.email),
  };
}

function signAdminToken(email) {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(`${email}.${timestamp}`).digest('hex');
  // Encode a JSON payload to avoid delimiter collisions in emails
  const tokenObj = { email, timestamp, signature };
  return Buffer.from(JSON.stringify(tokenObj)).toString('base64url');
}

function verifyAdminToken(token) {
  if (!token) {
    return null;
  }

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const obj = JSON.parse(decoded);
    const { email, timestamp, signature } = obj || {};

    if (!email || !timestamp || !signature) {
      return null;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      return null;
    }

    const expectedSignature = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(`${email}.${timestamp}`).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    return { email };
  } catch (error) {
    return null;
  }
}

function getAuthToken(req) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function requireAdmin(req, res, next) {
  // log the incoming Authorization header to help debug failed admin actions
  try {
    console.log('Admin auth header:', req.headers.authorization);
  } catch (e) {
    console.log('Admin auth header: <unavailable>');
  }

  const session = verifyAdminToken(getAuthToken(req));
  try {
    console.log('verifyAdminToken result:', session);
  } catch (e) {
    console.log('verifyAdminToken result: <unavailable>');
  }

  if (!session) {
    return res.status(401).json({ error: 'Admin access required' });
  }

  req.adminSession = session;
  return next();
}

async function getArticlesCollection() {
  const db = client.db('blissmusafir');
  return db.collection('articles');
}

async function getNewsletterCollection() {
  const db = client.db('blissmusafir');
  return db.collection('subscribers');
}

async function getLatestArticles(limit = 3) {
  const collection = await getArticlesCollection();
  return collection.find({}).sort({ date: -1, createdAt: -1 }).limit(limit).toArray();
}

function renderDigestHtml(articles, unsubscribeUrl) {
  const tags = ['🏔 Highlands', '🌊 Coast', '🏜 Desert'];

  const stories = articles.map((article, i) => `
    <tr>
      <td style="padding:24px 0;border-bottom:1px solid #ede8dd;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:48px;vertical-align:top;padding-right:20px;">
              <span style="font-family:'Georgia',serif;font-size:42px;font-weight:700;color:#e8dfc8;line-height:1;">${String(i + 1).padStart(2,'0')}</span>
            </td>
            <td style="vertical-align:top;">
              <span style="display:inline-block;font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8b6a2e;background:#f5edd8;padding:3px 10px;border-radius:20px;margin-bottom:10px;">${tags[i] || '✦ Travel'}</span>
              <h2 style="margin:0 0 8px;font-family:'Georgia',serif;font-size:18px;color:#1c1208;line-height:1.3;">${article.title}</h2>
              <p style="margin:0 0 12px;font-size:13.5px;color:#6b5e47;line-height:1.65;">${article.excerpt || ''}</p>
              <a href="${SITE_URL}/blog/${article.id}" style="font-size:12.5px;font-weight:600;color:#2a6b3c;text-decoration:none;letter-spacing:0.3px;">Read the full story →</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bliss Musafir — Weekly Dispatch</title>
</head>
<body style="margin:0;padding:0;background:#1a1008;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fffdf8;border-radius:20px;overflow:hidden;">

      <!-- HERO -->
      <div style="background:linear-gradient(160deg,#0d2b45 0%,#1a4a2e 60%,#8b4513 100%);padding:48px 40px 40px;position:relative;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(255,220,100,0.8);">✦ Weekly Dispatch ✦</p>
        <h1 style="margin:0 0 14px;font-family:'Georgia',serif;font-size:34px;line-height:1.2;color:#fffdf8;max-width:380px;">
          This week's stories from <em style="font-style:italic;color:rgba(255,220,100,0.9);">Bliss Musafir</em>
        </h1>
        <p style="margin:0;font-size:14px;color:rgba(255,253,248,0.6);">3 fresh tales from the road - curated just for you</p>
      </div>

      <!-- POSTMARK DIVIDER -->
      <div style="padding:16px 40px 0;background:#fffdf8;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="border-top:1px solid #e8e0d0;"></td>
            <td style="padding:0 14px;white-space:nowrap;font-size:11px;color:#b5a88a;letter-spacing:2px;text-transform:uppercase;">✦ dispatched this week ✦</td>
            <td style="border-top:1px solid #e8e0d0;"></td>
          </tr>
        </table>
      </div>

      <!-- BODY -->
      <div style="padding:8px 40px 32px;background:#fffdf8;">
        <p style="margin:24px 0 18px;font-size:11px;font-weight:600;letter-spacing:3px;color:#b5a88a;text-transform:uppercase;">From the journal</p>
        <table width="100%" cellpadding="0" cellspacing="0">${stories}</table>
      </div>

      <!-- FOOTER -->
      <div style="background:#1c1208;padding:28px 40px;">
        <p style="margin:0 0 10px;font-family:'Georgia',serif;font-size:16px;color:rgba(255,253,248,0.9);">
          <em>Bliss Musafir</em> — stories from the road
        </p>
        <p style="margin:0;font-size:12px;color:rgba(255,253,248,0.35);line-height:1.7;">
          You're receiving this because you subscribed to our weekly digest.<br>
          Want fewer emails? <a href="${unsubscribeUrl}" style="color:rgba(255,220,100,0.6);text-decoration:none;">Unsubscribe here</a>.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}

async function sendWeeklyDigest() {
  const collection = await getNewsletterCollection();
  const activeSubscribers = await collection.find({ active: true }).toArray();

  if (!activeSubscribers.length) {
    return;
  }

  const articles = await getLatestArticles(3);
  if (!articles.length) {
    return;
  }

  const mailer = createMailer();

  for (const subscriber of activeSubscribers) {
    const unsubscribeUrl = `${API_URL}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
    try {
      // Use a date-specific subject so mail clients (Gmail) don't thread messages
      const subjectDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const subject = `Bliss Musafir weekly stories - ${subjectDate}`;

      // Create a unique Message-ID to further reduce the chance of threading
      const domain = (SMTP_USER && SMTP_USER.includes('@')) ? SMTP_USER.split('@')[1] : 'blissmusafir.com';
      const customMessageId = `<digest-${Date.now()}@${domain}>`;

      const info = await sendMailWithTimeout(mailer, {
        from: MAIL_FROM,
        to: subscriber.email,
        subject,
        html: renderDigestHtml(articles, unsubscribeUrl),
        messageId: customMessageId,
      });
      console.log('Weekly digest sent:', { to: subscriber.email, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected });
    } catch (err) {
      console.error('Failed to send weekly digest to', subscriber.email, err);
    }
  }
}

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blissmusafir';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = parseRequestBody(req);

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ error: 'All contact form fields are required' });
    }

    const mailer = createMailer();
    const info = await sendMailWithTimeout(mailer, {
      from: MAIL_FROM,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Contact form: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${String(message).replace(/\n/g, '<br />')}</p>
        </div>`,
    });

    console.log('Contact mail sent:', { to: CONTACT_RECIPIENT, subject: `Contact form: ${subject}`, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected });
    res.json({ message: 'Message sent successfully', info });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ error: 'Failed to send contact message' });
  }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = parseRequestBody(req);

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const collection = await getNewsletterCollection();
    const unsubscribeToken = crypto.randomUUID();

    await collection.updateOne(
      { email },
      {
        $set: {
          email,
          active: true,
          unsubscribeToken,
          subscribedAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.get('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).send('Missing unsubscribe token');
    }

    const collection = await getNewsletterCollection();
    const result = await collection.updateOne(
      { unsubscribeToken: token },
      { $set: { active: false, unsubscribedAt: new Date(), updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Unsubscribe token not found');
    }

    res.send('<h1>Unsubscribed</h1><p>You will no longer receive weekly emails from Bliss Musafir.</p>');
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).send('Failed to unsubscribe');
  }
});

// Admin login requires both an allowed email and a matching password stored in env
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = parseRequestBody(req);

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!ADMIN_EMAILS.includes(email)) {
    return res.status(401).json({ error: 'Unauthorized email address' });
  }

  if (!ADMIN_PASSWORD) {
    console.warn('ADMIN_PASSWORD not set in environment; rejecting admin login');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Use constant-time comparison to avoid timing attacks
  const pwdMatch = crypto.timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD));
  if (!pwdMatch) {
    console.warn('Failed admin login attempt for', email);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signAdminToken(email);
  res.json({ token, email });
});

// Admin-only: trigger weekly digest immediately
app.post('/api/admin/send-digest', requireAdmin, async (req, res) => {
  try {
    await sendWeeklyDigest();
    res.json({ message: 'Digest queued/sent' });
  } catch (err) {
    console.error('Error triggering digest via admin endpoint:', err);
    res.status(500).json({ error: 'Failed to trigger digest' });
  }
});

// DEBUG: local-only endpoint to trigger digest immediately (no auth) for testing.
// Remove or protect this in production.
app.post('/api/debug/send-digest', async (req, res) => {
  try {
    await sendWeeklyDigest();
    res.json({ message: 'Debug digest sent' });
  } catch (err) {
    console.error('Error sending debug digest:', err);
    res.status(500).json({ error: 'Failed to send debug digest' });
  }
});

app.get('/api/admin/me', requireAdmin, async (req, res) => {
  res.json({ email: req.adminSession.email });
});

app.post('/api/admin/logout', (req, res) => {
  res.json({ success: true });
});

app.get('/api/admin/session', requireAdmin, async (req, res) => {
  res.json({ email: req.adminSession.email });
});

// In your server.js / backend code:
// GET a single article by ID
app.get('/api/articles/:id', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const articleId = req.params.id;
    
    // Look for the string 'id' field you created in your POST route
    const article = await collection.findOne({ id: articleId });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const articles = await collection
      .find(query)
      .sort({ date: -1 })
      .toArray();
    
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.post('/api/articles', requireAdmin, async (req, res) => {
  try {
    const collection = await getArticlesCollection();
    const article = {
      ...req.body,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await collection.insertOne(article);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

app.put('/api/articles', requireAdmin, async (req, res) => {
  try {
    const collection = await getArticlesCollection();
    const { id, ...updateData } = req.body;
    
    const result = await collection.updateOne(
      { id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles', requireAdmin, async (req, res) => {
  try {
    const collection = await getArticlesCollection();
    const id = req.query.id;
    
    if (!id) {
      return res.status(400).json({ error: 'Article ID is required' });
    }
    
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  cron.schedule(NEWSLETTER_CRON, () => {
    sendWeeklyDigest().catch((error) => {
      console.error('Weekly digest failed:', error);
    });
  });
});
