import React, { useState } from 'react';
import { AspectRatio, AdContent } from '../types';
import { Download, Maximize2, Edit3 } from 'lucide-react';

interface AdPreviewProps {
  imageUrl: string;
  aspectRatio: AspectRatio;
  adContent: AdContent;
}

const AdPreview: React.FC<AdPreviewProps> = ({ imageUrl, aspectRatio, adContent }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate CSS aspect ratio string
  const getAspectRatioStyle = (ratio: AspectRatio) => {
    const [w, h] = ratio.split(':').map(Number);
    return { aspectRatio: `${w} / ${h}` };
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ad-genius-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-800 group"
        style={getAspectRatioStyle(aspectRatio)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Generated Background Image */}
        <img 
          src={imageUrl} 
          alt="Generated Ad Background" 
          className="w-full h-full object-cover"
        />

        {/* Overlay Overlay (Ad Content Simulation) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6 md:p-10">
          
          {/* Top: Brand/URL */}
          <div className="self-start bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
             <span className="text-xs md:text-sm text-white font-medium tracking-wide">
               {adContent.url || 'your-site.com'}
             </span>
          </div>

          {/* Bottom: Headline & CTA */}
          <div className="w-full space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg leading-tight max-w-lg">
              {adContent.headline || 'Your Headline Here'}
            </h2>
            <button className="bg-white text-slate-900 hover:bg-slate-200 transition-colors px-6 py-3 rounded-full font-bold text-sm md:text-base shadow-lg flex items-center gap-2">
              {adContent.ctaText || 'Shop Now'}
            </button>
          </div>
        </div>

        {/* Hover Controls */}
        <div className={`absolute top-4 right-4 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleDownload}
            className="bg-slate-900/80 hover:bg-indigo-600 text-white p-2 rounded-full backdrop-blur-sm border border-white/10 transition-all"
            title="Download Image"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
        <Maximize2 className="w-4 h-4" />
        <span>Previewing {aspectRatio} format</span>
      </div>
    </div>
  );
};

export default AdPreview;