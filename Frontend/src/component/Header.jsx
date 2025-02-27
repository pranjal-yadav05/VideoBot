import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import { motion } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);  // Ref for the mobile menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu if the user clicks outside of the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Attach event listener on mount
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.header
            className="bg-gray-900 text-gray-200 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-3xl font-bold flex items-center" style={{fontFamily: 'Playwrite IT Moderna, serif'}}>
                    VidBot
                    <img
                        src="image.png"
                        alt="VidBot"
                        height="50"
                        width="50"
                        style={{ verticalAlign: 'middle', marginLeft: '15px' }}
                    />
                </Link>

                {/* Hamburger menu button */}
                <button
                    className="md:hidden text-3xl"
                    onClick={toggleMenu}
                >
                     {'☰'}
                </button>

                {/* Mobile Navigation Menu */}
                <div
                    ref={menuRef}  // Attach ref to the mobile menu container
                    className={`fixed top-0 right-0 bg-gray-900 w-64 h-full z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}
                >
                    <nav className="flex flex-col items-center py-8 space-y-6">
                        <Link
                            to="/"
                            className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                            onClick={toggleMenu}  // Close menu on click
                        >
                            Home
                        </Link>
                        <Link
                            to="/ai-generation"
                            className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                            onClick={toggleMenu}
                        >
                            VidBot
                        </Link>
                        <Link
                            to="/pro"
                            className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                            onClick={toggleMenu}
                        >
                            VidBot Pro
                        </Link>
                    </nav>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        to="/ai-generation"
                        className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                    >
                        VidBot
                    </Link>
                    <Link
                        to="/pro"
                        className="text-xl text-gray-200 hover:text-white transition-colors duration-200"
                    >
                        VidBot Pro
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
