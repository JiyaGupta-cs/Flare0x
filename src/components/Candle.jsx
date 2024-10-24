import { useEffect, useState } from 'react';
import styles from './Candle.module.css';

const Candle = () => {
    const [isFlickering, setIsFlickering] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlickering(prev => !prev);
        }, 1000); // Change the timer duration as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.holder}>
            <div className={styles.candle}>
                <div className={styles.thread} />
                <div className={`${styles.flame} ${isFlickering ? styles.blinkingGlow : ''}`} />
            </div>
        </div>
    );
};

export default Candle;
