import React, { useState } from 'react';
import { Send, Video, FileText, Download, Loader2 } from 'lucide-react';
import FloatingSymbols from './Symbols';

const AIGenerationInterface = () => {
    const [mode, setMode] = useState('video');
    const [prompt, setPrompt] = useState('');
    const [script, setScript] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [error, setError] = useState(null);
  
    const handleGenerate = async () => {
      setIsGenerating(true);
      setError(null);
  
      try {
        if (mode === 'video') {
          const response = await fetch("http://localhost:5000/generate-video", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to generate video");
          }
  
          const blob = await response.blob();
          const videoUrl = URL.createObjectURL(blob);
          setGeneratedContent(videoUrl);
        } else {
          // Handle article generation
          // Add your article generation API endpoint here
          const articleContent = "Generated article content..."; // Replace with actual API call
          setGeneratedContent(articleContent);
        }
      } catch (err) {
        setError(err.message);
        console.error("Generation error:", err);
      } finally {
        setIsGenerating(false);
      }
    };
  
    // Cleanup function for video URL
    const handleDownload = async () => {
      if (mode === 'video' && generatedContent) {
        const a = document.createElement('a');
        a.href = generatedContent;
        a.download = 'generated-video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
  
    // Cleanup URLs when component unmounts or content changes
    React.useEffect(() => {
      return () => {
        if (mode === 'video' && generatedContent) {
          URL.revokeObjectURL(generatedContent);
        }
      };
    }, [generatedContent, mode]);
  
    return (
      <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden">
        <FloatingSymbols />
        
        {/* Agent Logo and Name */}
        <div className="fixed top-8 left-8 flex items-center space-x-3 z-50">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <div className="text-2xl text-gray-300">AI</div>
          </div>
          <div className="text-xl font-semibold text-gray-200">EduGen AI</div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-800 mt-24">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-900 rounded-lg p-1 border border-gray-800">
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    mode === 'video' ? 'bg-gray-700 text-gray-200' : 'text-gray-400'
                  }`}
                  onClick={() => setMode('video')}
                >
                  <Video className="inline mr-2 h-5 w-5" />
                  Video
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-all ${
                    mode === 'article' ? 'bg-gray-700 text-gray-200' : 'text-gray-400'
                  }`}
                  onClick={() => setMode('article')}
                >
                  <FileText className="inline mr-2 h-5 w-5" />
                  Article
                </button>
              </div>
            </div>
  
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
                  placeholder={`Enter your ${mode} prompt...`}
                />
              </div>
  
              {mode === 'article' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Script</label>
                  <textarea
                    className="w-full bg-gray-900 rounded-lg p-3 text-gray-300 border border-gray-800 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition-all"
                    rows="3"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Enter article script..."
                  />
                </div>
              )}
  
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
                    <span>Generate {mode === 'video' ? 'Video' : 'Article'}</span>
                  </>
                )}
              </button>
            </div>
  
            {/* Preview Section */}
            {generatedContent && !isGenerating && (
              <div className="mt-6">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-medium mb-3 text-gray-200">Preview</h3>
                  {mode === 'video' ? (
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <video
                        className="w-full h-full rounded-lg"
                        controls
                        src={generatedContent}
                      />
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none text-gray-300">
                      {generatedContent}
                    </div>
                  )}
                  <button
                    className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg py-2 flex items-center justify-center space-x-2 border border-gray-700"
                    onClick={handleDownload}
                  >
                    <Download className="h-5 w-5" />
                    <span>Download {mode === 'video' ? 'Video' : 'Article'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AIGenerationInterface;
  
  