import { useState } from 'react';
import { Upload, FileText, Link, Plus, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Page } from '../components/Router';
import { articleService } from '../services/articleService';
import { Article } from '../lib/api';
import { fixGoogleDriveUrl } from '../utils/googleDriveHelper';
import mammoth from 'mammoth';

interface ParsedArticle {
  title: string;
  subtitle: string;
  content: string;
  category: 'India' | 'World';
  tags: string[];
  continent?: string;
  location?: string;
}

export function AdminPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [googleDriveUrl, setGoogleDriveUrl] = useState<string>('');
  const [parsedArticle, setParsedArticle] = useState<ParsedArticle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      setDocFile(file);
      setError(null);
    } else {
      setError('Please upload a valid DOC or DOCX file');
    }
  };

  const processDocFile = async () => {
    if (!docFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await docFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // Parse document content to extract title, subtitle, and content
      const lines = text.split('\n').filter((line: string) => line.trim());
      
      let title = 'Untitled Article';
      let subtitle = 'A wonderful travel destination';
      let content = text;

      // Try to extract title from first few lines
      if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine.length < 100 && !firstLine.includes('.')) {
          title = firstLine;
          content = lines.slice(1).join('\n');
        }
      }

      // Try to extract subtitle from second line
      const remainingLines = content.split('\n').filter((line: string) => line.trim());
      if (remainingLines.length > 0) {
        const secondLine = remainingLines[0].trim();
        if (secondLine.length < 200 && secondLine.length > 20) {
          subtitle = secondLine;
          content = remainingLines.slice(1).join('\n');
        }
      }

      // Convert plain text to HTML format
      const htmlContent = content
        .split('\n\n')
        .map((paragraph: string) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return '';
          
          // Convert headings
          if (trimmed.length < 50 && !trimmed.includes('.')) {
            return `<h2>${trimmed}</h2>`;
          }
          
          // Convert regular paragraphs
          return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
        })
        .filter((html: string) => html)
        .join('\n');

      const parsed: ParsedArticle = {
        title,
        subtitle,
        content: htmlContent,
        category: 'India',
        tags: extractTags(text),
        location: 'India'
      };

      setParsedArticle(parsed);
      setSuccess('Document processed successfully! Review and add Google Drive URL below.');
    } catch (err) {
      console.error('DOC parsing error:', err);
      setError('Failed to process document. Please ensure it\'s a valid DOCX file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const extractTags = (text: string): string[] => {
    const commonTags = [
      'Travel', 'Culture', 'Adventure', 'History', 'Architecture', 
      'Nature', 'Photography', 'Food', 'Spiritual', 'UNESCO',
      'Mountains', 'Beaches', 'Wildlife', 'Heritage', 'Festival'
    ];
    
    const foundTags: string[] = [];
    const lowerText = text.toLowerCase();
    
    commonTags.forEach((tag: string) => {
      if (lowerText.includes(tag.toLowerCase())) {
        foundTags.push(tag);
      }
    });
    
    // Add some default tags if none found
    if (foundTags.length === 0) {
      foundTags.push('Travel', 'Culture');
    }
    
    return foundTags.slice(0, 5); // Limit to 5 tags
  };

  const generateArticle = async () => {
    if (!parsedArticle) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Validate Google Drive URL
      if (!googleDriveUrl.trim()) {
        setError('Please provide a Google Drive URL for the article image');
        return;
      }

      // Create a new article object
      const newArticle: Omit<Article, 'id' | 'createdAt' | 'updatedAt'> = {
        title: parsedArticle.title,
        content: parsedArticle.content,
        excerpt: parsedArticle.subtitle,
        image: googleDriveUrl.trim(),
        category: parsedArticle.category,
        location: parsedArticle.location || (parsedArticle.category === 'India' ? 'India' : 'Various Locations'),
        author: 'Admin User',
        readTime: `${Math.ceil(parsedArticle.content.replace(/<[^>]*>/g, '').length / 200)} min read`,
        views: 0,
        date: new Date().toISOString().split('T')[0],
        tags: parsedArticle.tags,
        isPopular: false,
        continent: parsedArticle.continent || (parsedArticle.category === 'World' ? 'Asia' : undefined)
      };

      // Save to MongoDB via API
      await articleService.createArticle(newArticle);

      setSuccess('Article created successfully! It has been added to the site.');
      
      // Reset form after delay
      setTimeout(() => {
        setDocFile(null);
        setGoogleDriveUrl('');
        setParsedArticle(null);
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error creating article:', err);
      setError('Failed to create article. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Article Admin Panel</h1>
            <Button variant="outline" onClick={() => onNavigate('home')}>
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Upload Document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="doc-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      Click to upload DOC or DOCX file
                    </span>
                    <Input
                      id="doc-upload"
                      type="file"
                      accept=".doc,.docx"
                      onChange={handleDocUpload}
                      className="hidden"
                    />
                  </Label>
                </div>
                
                {docFile && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-700">{docFile.name}</span>
                    <Button size="sm" onClick={processDocFile} disabled={isProcessing}>
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Process'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Google Drive URL Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Google Drive Image URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drive-url">Image URL from Google Drive</Label>
                  <Input
                    id="drive-url"
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    value={googleDriveUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoogleDriveUrl(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Upload your image to Google Drive, share it with "Anyone with the link", 
                    and paste the direct link here. Make sure the link ends with a file extension or use 
                    the direct download format.
                  </p>
                </div>

                {googleDriveUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={fixGoogleDriveUrl(googleDriveUrl)}
                        alt="Google Drive preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          console.error('Failed to load Google Drive image:', googleDriveUrl);
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content Preview */}
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {parsedArticle && (
              <Card>
                <CardHeader>
                  <CardTitle>Article Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={parsedArticle.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParsedArticle(prev => prev ? {...prev, title: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtitle/Excerpt</Label>
                    <Input
                      id="subtitle"
                      value={parsedArticle.subtitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParsedArticle(prev => prev ? {...prev, subtitle: e.target.value} : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={parsedArticle.location || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParsedArticle(prev => prev ? {...prev, location: e.target.value} : null)}
                      placeholder="e.g., Agra, Uttar Pradesh"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={parsedArticle.category} onValueChange={(value: 'India' | 'World') => setParsedArticle(prev => prev ? {...prev, category: value} : null)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="World">World</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {parsedArticle.category === 'World' && (
                    <div>
                      <Label htmlFor="continent">Continent</Label>
                      <Select value={parsedArticle.continent || ''} onValueChange={(value: string) => setParsedArticle(prev => prev ? {...prev, continent: value} : null)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select continent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia">Asia</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Africa">Africa</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="South America">South America</SelectItem>
                          <SelectItem value="Oceania">Oceania</SelectItem>
                          <SelectItem value="Antarctica">Antarctica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="tags">Tags (select multiple)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Architecture', 'Nature', 'Culture', 'Adventure', 'Mountains', 'Desert', 'Beaches', 'Wildlife', 'Heritage', 'Festival', 'Food', 'Photography'].map((tag) => (
                        <label key={tag} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={parsedArticle.tags.includes(tag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setParsedArticle(prev => prev ? {...prev, tags: [...prev.tags, tag]} : null);
                              } else {
                                setParsedArticle(prev => prev ? {...prev, tags: prev.tags.filter(t => t !== tag)} : null);
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={parsedArticle.content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setParsedArticle(prev => prev ? {...prev, content: e.target.value} : null)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <Button 
                    onClick={generateArticle} 
                    className="w-full"
                    disabled={isProcessing || !parsedArticle || !googleDriveUrl.trim()}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Article...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Article
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
