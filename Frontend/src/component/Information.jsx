import React from 'react';
import ReactMarkdown from 'react-markdown';

const Information = () => {
    const markdownContent = `


            # **EduVidBot – AI-Powered Educational Video Generator**  

            ## **Overview**  
            EduVidBot is an AI-powered tool designed to generate educational videos based on user prompts. It creates engaging and interactive visual content to teach concepts in **mathematics, physics, and other STEM subjects**, making learning more effective and accessible.  

            ## **How It Works**  
            1. **User Input:** The user provides a prompt describing the concept they want to learn or explain. Example prompts:  
            - "Explain Newton’s Laws with real-life examples."  
            - "Derive the quadratic formula step by step."  
            - "Visualize the Pythagorean theorem with animations."  
            2. **AI Processing:** The bot processes the prompt, identifies key concepts, and generates an appropriate script, visuals, and animations.  
            3. **Video Generation:** The system converts the structured content into an educational video with:  
            - Step-by-step explanations  
            - Graphs, animations, and real-world examples  
            - Voice narration and subtitles  
            4. **Output:** The user receives a downloadable or shareable video file for learning or teaching purposes.  

            ## **Key Features**  
            ✅ **Concept-Based Video Creation:** Generates videos tailored to user-defined topics.  
            ✅ **Animated Explanations:** Uses 2D/3D graphics to illustrate complex concepts.  
            ✅ **Step-by-Step Tutorials:** Breaks down problems with solutions.  
            ✅ **Real-World Examples:** Applies theoretical concepts to practical situations.  
            ✅ **Customizable Output:** Users can specify duration, difficulty level, and preferred visual style.  

            ## **Use Cases**  
            - **Students:** Get clear explanations and visualizations of tough topics.  
            - **Teachers:** Create video lessons to supplement classroom teaching.  
            - **Content Creators:** Generate educational content for YouTube, e-learning platforms, etc.  

            ## **Future Enhancements**  
            🔹 Support for more subjects like chemistry and engineering.  
            🔹 Interactive videos with quizzes.  
            🔹 Multilingual voice narration.  


    `;
    return(
            <div className="prose prose-invert max-w-none text-gray-300">

            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    )
}

export default Information
