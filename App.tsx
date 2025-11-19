import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Type, Link as LinkIcon, Layout, Wand2, Loader2, AlertCircle } from 'lucide-react';
import AspectRatioSelector from './components/AspectRatioSelector';
import AdPreview from './components/AdPreview';
import { generateBannerImage } from './services/gemini';
import { AspectRatio, AdContent, AdStyle } from './types';

const App: React.FC = () => {
  // Input State
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [headline, setHeadline] = useState('');
  const [ctaText, setCtaText] = useState('Shop Now');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Landscape);
  const [style, setStyle] = useState<AdStyle>('Photorealistic');

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please enter a product description.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBase64 = await generateBannerImage(description, aspectRatio, style);
      setGeneratedImage(imageBase64);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const adContent: AdContent = {
    headline,
    ctaText,
    url
  };

  const styles: AdStyle[] = ['Photorealistic', 'Minimalist', 'Vibrant', 'Luxury', 'Illustrated'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AdGenius
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
            Powered by Imagen 3
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Section 1: Product Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <ImageIcon className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Product Details</h2>
              </div>
              
              <div className="space-y-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Product Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Organic specialized coffee beans in a matte black bag, sitting on a wooden table with coffee cherries..."
                    className="w-full bg-slate-800 border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Visual Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          style === s 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Ad Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Type className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Ad Copy Overlay</h2>
              </div>
              
              <div className="space-y-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., Wake Up to Better Coffee"
                    className="w-full bg-slate-800 border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Website URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="your-site.com"
                      className="w-full bg-slate-800 border-slate-700 rounded-xl pl-10 p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CTA Button</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Shop Now"
                    className="w-full bg-slate-800 border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Format */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Layout className="w-4 h-4" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">Format</h2>
              </div>
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <AspectRatioSelector selected={aspectRatio} onChange={setAspectRatio} />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`
                w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25
                flex items-center justify-center gap-2 transition-all duration-200
                ${isGenerating 
                  ? 'bg-indigo-800 cursor-not-allowed opacity-80' 
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transform hover:scale-[1.02]'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Creative...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Banner Ad
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-8">
             <div className="sticky top-24 h-auto min-h-[600px] bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"></div>
                </div>

                {generatedImage ? (
                  <div className="w-full flex flex-col items-center z-10 animate-in fade-in zoom-in duration-500">
                    <AdPreview 
                      imageUrl={generatedImage} 
                      aspectRatio={aspectRatio} 
                      adContent={adContent}
                    />
                  </div>
                ) : (
                  <div className="text-center max-w-md z-10 space-y-6">
                    <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-inner">
                      <ImageIcon className="w-10 h-10 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Ready to Create?</h3>
                      <p className="text-slate-400">
                        Enter your product details and choose a format to generate professional banner ads instantly with AI.
                      </p>
                    </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;