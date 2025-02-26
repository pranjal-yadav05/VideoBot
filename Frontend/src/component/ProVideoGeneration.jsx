import React, { useState, useEffect, useRef } from 'react';
import { Send, Video, FileText, Download, Loader2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingSymbols from './Symbols';
import { motion } from 'framer-motion';
import Header from './Header';

const ProVideoGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;


  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {        
        const response = await fetch(`${API_URL}/generate-pro-video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate video");
        }

        const data = await response.json();
        setGeneratedContent(data.video_url);
        setVideoId(data.video_id);

    } catch (err) {
      setError(err.message);
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if ( generatedContent) {
      try {
        const response = await fetch(generatedContent);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError('Failed to download video');
        console.error("Download error:", err);
      }
    }
  };

  return (
    <>
    <Header/> 
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300`}>
        <FloatingSymbols />

        {/* Rest of the existing content */}
        <div className="container mx-auto min-h-screen flex flex-col items-center justify-center px-4">
            <motion.h1 
                className="text-5xl font-bold mb-8" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                style={{ fontFamily: 'Playwrite IT Moderna, serif', display: 'inline-flex', alignItems: 'center' }} 
            >
                VidBot 
                <img height='50' width='50' src='image.png' style={{ verticalAlign: 'middle', marginLeft: '15px', marginRight:'15px' }} />
                Pro
            </motion.h1>
            <i>Limited prompts allowed. It may take longer to generate.</i>
          <div className="w-full max-w-2xl bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-800 mt-5">

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                {error}
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Prompt</label>
                <textarea
                  className="w-full bg-gray-900 rounded-lg p-3 text-gray-300 border border-gray-800 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-all"
                  rows="3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Enter your video prompt...`}
                />
              </div>


              {/* Generate Button */}
              <button
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg py-3 flex items-center justify-center space-x-2 transition-all transform hover:scale-102 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Generate Video</span>
                  </>
                )}
              </button>
            </div>

            {/* Preview Section */}
            {generatedContent && !isGenerating && (
              <div className="mt-6">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-medium mb-3 text-gray-200">Preview</h3>
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <video
                        className="w-full h-full rounded-lg"
                        controls
                        src={generatedContent}
                      />
                    </div>
                  <button
                    className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg py-2 flex items-center justify-center space-x-2 border border-gray-700"
                    onClick={handleDownload}
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Video</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <i className='mt-4 opacity-40'>VidBot may generate undesired output.</i>
          <div style={{ display: 'inline-flex', alignItems: 'center'}}>
            Made with ❤️ by 
            <img src='decepticons.jpg' style={{borderRadius: '30px', marginLeft: '5px'}} height={'30'} width={'30'} />
            <span style={{fontFamily:'cursive'}}>Team Decepticons</span>
          </div>

        </div>
        
      </div>
      
    </div>
    </>
  );
};

export default ProVideoGeneration;