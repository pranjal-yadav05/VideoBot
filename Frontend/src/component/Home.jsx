import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingSymbols from './Symbols';
import { useState } from 'react';
import {TypeAnimation }from 'react-type-animation'

const Home = () => {
    const navigate = useNavigate();

    const [animationState, setAnimationState] = useState('');

    const handleGetStarted = () => {
        setAnimationState('exiting');
        setTimeout(() => {
            navigate('/ai-generation');
        }, 300);
    };

    return (
        <motion.div
            className={`min-h-screen bg-black text-gray-300 flex flex-col items-center justify-center max-w-4xl mx-auto p-6 overflow-hidden ${animationState}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Roboto Condensed, sans-serif' }} // Apply the font here
        >
            <FloatingSymbols />
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

            <TypeAnimation
              sequence={[
                'We visualize complex equations',
                1000,
                'We break down difficult theories',
                1000,
                'We turn formulas into animations',
                1000,
                'We make learning interactive',
                1000
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '2em', display: 'inline-block', margin:'20px' ,fontFamily:'Ubuntu Mono' }}
              repeat={Infinity}
            />


            <p className="text-lg mb-4" style={{ fontFamily: 'Roboto Condensed, sans-serif', fontSize:'1.2em' }}>
                VidBot is an AI-powered tool designed to generate educational videos based on user prompts. It creates engaging and interactive visual content to teach concepts in mathematics, physics, and other STEM subjects, making learning more effective and accessible.
            </p>
            <h2 className="text-3xl font-semibold mb-6" >How It Works 🤔</h2>

            <ol className="list-decimal list-inside mb-4" style={{ fontFamily: 'Roboto Condensed, sans-serif', fontSize:'1.2em' }}>
                <li>User Input: The user provides a prompt describing the concept they want to learn or explain.</li>
                <li>AI Processing: The bot processes the prompt, identifies key concepts, and generates an appropriate script, visuals, and animations.</li>
                <li>Video Generation: The system converts the structured content into an educational video.</li>
                <li>Output: The user receives a downloadable or shareable video file for learning or teaching purposes.</li>
            </ol>
            <button
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg py-4 px-8 transition-transform transform hover:scale-110"
                onClick={handleGetStarted}
            >
                Get Started
            </button>
        </motion.div>
    );
};

export default Home;
