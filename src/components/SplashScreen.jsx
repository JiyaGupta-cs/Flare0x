import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { CreateTask } from '@/containers/contract/WriteContract';
import './SplashScreen.css';




const SplashScreen = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [showFirstBox, setShowFirstBox] = useState(false);
    const [showSecondBox, setShowSecondBox] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
            setShowFirstBox(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleNext = () => {
        setShowFirstBox(false);
        setShowSecondBox(true);
    };

    const handleSecondBoxNext = () => {
        setShowSecondBox(false);
    };

    return (
        <AnimatePresence>
            {showSplash && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <motion.img
                        src="/flare.png"
                        alt="Logo"
                        className="w-32 h-32"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    />
                    <motion.p
                        className="text-orange-500 text-2xl font-bold mt-4 pixelify-sans"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                    >
                        Flare0x_Bot
                    </motion.p>
                    <motion.div
                        className="w-full bg-orange-500 h-2 mt-8 rounded-lg"
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                    <motion.p
                        className="text-white text-2xl font-bold mt-4 pixelify-sans"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 2, ease: 'easeInOut' }}
                    >
                        Until The Candle Dies...
                    </motion.p>
                </motion.div>
            )}

            {showFirstBox && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center pixelify-sans"
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5 shadow-lg h-[60vh] splash-btn text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <div className="text-center rounded-lg p-6 shadow-lg max-w-sm text-white z-10 pixelify-sans">
                            <p className="text-xl font-bold">
                                Imagine a dark, quiet room, lit only by a single candle flickering with a hypnotic flame. This flame represents your focus, a delicate light that thrives only when you are calm, determined, and steady. Enter FLARE0x Bot, your guide to mastering this balance.
                            </p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <motion.button
                                className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center absolute right-[-1rem] bottom-[-1rem]"
                                onClick={handleNext}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            >
                                Next <ArrowRightIcon className="ml-2" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {showSecondBox && (
                <motion.div
                    className="fixed inset-0 bg-black flex flex-col items-center justify-center pixelify-sans"
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5 shadow-lg h-[60vh] splash-btn text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <div className="text-center rounded-lg p-6 shadow-lg max-w-sm text-white z-10 pixelify-sans">
                            <p className="text-base font-bold">As you use the app, FLARE0x challenges you to channel your energy into this flame, urging you to hold your focus just a bit longer. Each time you drift, the flame flickers; each time you’re steady, it grows brighter. Your mission? To protect and fuel this flame, knowing that each moment of focus brings you closer to mastery. Can you keep the flame alive and prove your unwavering focus?</p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <motion.button
                                className="bg-orange-500 text-white px-4 py-2 rounded-md z- flex items-center absolute right-[-1rem] bottom-[-1rem]"
                                onClick={handleSecondBoxNext}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1, ease: 'easeInOut' }}
                            >
                                Next <ArrowRightIcon className="ml-2" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {!showSplash && !showFirstBox && !showSecondBox && <CreateTask />}
        </AnimatePresence>
    );
};

export default SplashScreen;
