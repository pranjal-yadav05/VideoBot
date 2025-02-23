import React, { useEffect, useState } from 'react';

const TypingAnimation = () => {
    const sentences = [
        "AI-Powered Educational Video Generator",
        "Your Learning Companion",
        "Transforming Education with AI",
        "Creating Engaging Learning Experiences"
    ];
    const typingDelay = 150; // Delay for typing each letter
    const erasingDelay = 50; // Delay for erasing each letter
    const pauseBetweenSentences = 1000; // Pause before starting the next sentence




    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const currentSentence = sentences[index % sentences.length];
        const updatedText = isDeleting
            ? currentSentence.substring(0, displayedText.length - 1)
            : currentSentence.substring(0, displayedText.length + 1);

        if (isDeleting && displayedText === '') {
            setIsDeleting(false);
            setIndex((prevIndex) => prevIndex + 1);
        }


        setDisplayedText(updatedText);

        if (isDeleting) {
            setTypingSpeed(50);
            if (updatedText === '') {
                setIsDeleting(false);
                setIndex((prevIndex) => prevIndex + 1);
            }
        } else {
            setTypingSpeed(150);
            if (updatedText === currentSentence) {
                setIsDeleting(true);
            }
        }

        const timer = setTimeout(() => {
            setDisplayedText(updatedText);
            if (!isDeleting && updatedText === currentSentence) {
                setTimeout(() => setIsDeleting(true), pauseBetweenSentences);
            }
        }, isDeleting ? erasingDelay : typingDelay);


        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, index]);

    return <h2 className="text-3xl font-bold mb-8">{displayedText}</h2>;
};

export default TypingAnimation;
