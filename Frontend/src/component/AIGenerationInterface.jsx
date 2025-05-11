import React, { useState, useEffect, useRef } from 'react';
import { Send, Video, FileText, Download, Loader2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingSymbols from './Symbols';
import { motion } from 'framer-motion';
import Header from './Header';
const VideoHistoryItem = ({ video, onSelect, isSelected }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  return (
    <div 
    className={`p-3 rounded-lg cursor-pointer transition-all 
      ${isSelected ? 'bg-gray-700 border-2 border-gray-500' : 'bg-gray-800 border border-gray-600'}
    `}    
      onClick={() => onSelect(video)}
    >
      <div className="aspect-video mb-2 overflow-hidden rounded-md">
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />
      </div>
      <h4 className="font-medium text-gray-200 truncate">{video.prompt}</h4>
      <p className="text-sm text-gray-400 mt-1">
        <Clock className="inline-block w-4 h-4 mr-1" />
        {new Date(video.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <Video className="w-12 h-12 text-gray-500 mb-4" />
    <h3 className="text-gray-300 font-medium mb-2">No Videos Yet</h3>
    <p className="text-gray-500 text-sm">
      Generated videos will appear here
    </p>
  </div>
);

const AIGenerationInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [previousVideos, setPreviousVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPreviousVideos();
  }, []);

  const fetchPreviousVideos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/videos`);
      if (!response.ok) throw new Error('Error fetching videos');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPreviousVideos(data);
      } else {
        console.error('Unexpected response format:', data);
        setPreviousVideos([]);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setPreviousVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {        
        const response = await fetch(`${API_URL}/generate-video`, {
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
        
        // Refresh the video list after generating new video
        await fetchPreviousVideos();

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

  const handleVideoSelect = (video) => {
    setGeneratedContent(video.url);
    setVideoId(video._id);
    setPrompt(video.prompt);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-72' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Previous Videos</h2>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin h-6 w-6" />
            </div>
          ) : (
            <div className="space-y-4">
              {previousVideos.length === 0 ? (
                <EmptyState />
              ) : (
                previousVideos.map((video) => (
                  <VideoHistoryItem
                    key={video._id}
                    video={video}
                    onSelect={handleVideoSelect}
                    isSelected={videoId === video._id}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className={`fixed top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-lg z-50 transition-all duration-300 ${
          isSidebarOpen ? 'left-72' : 'left-0'
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
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
                <img height='50' width='50' src='image.png' style={{ verticalAlign: 'middle', marginLeft: '15px' }} />
            </motion.h1>
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

export default AIGenerationInterface;