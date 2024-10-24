import React, { useEffect, useState } from 'react';
import styles from './Candle.module.css'; // Adjust the path as needed

const Candle = () => {
  const [height, setHeight] = useState(300); // Initial height of the candle
  const [isExtinguished, setIsExtinguished] = useState(false); // State to control extinguishing

  useEffect(() => {
    const meltInterval = setInterval(() => {
      setHeight((prevHeight) => {
        if (prevHeight > 0) {
          return prevHeight - 1; // Decrease height to create melting effect
        }
        clearInterval(meltInterval); // Clear interval when height reaches 0
        return 0; // Stop reducing height
      });
    }, 1000); // Adjust the timer interval as needed

    const extinguishTimeout = setTimeout(() => {
      setIsExtinguished(true); // Set to true after a specific time
    }, 10000); // Time before extinguishing (e.g., 10 seconds)

    return () => {
      clearInterval(meltInterval); // Clean up interval on component unmount
      clearTimeout(extinguishTimeout); // Clean up timeout on component unmount
    };
  }, []);

  return (
    <div className={styles.holder}>
      <div className={`${styles.candle} ${isExtinguished ? styles.extinguished : ''}`} style={{ height: `${height}px` }}>
        <div className={styles.thread}></div>
        <div className={styles.flame}></div>
        <div className={styles.glow}></div>
        <div className={styles.wax}></div> {/* Wax Drip */}
      </div>
    </div>
  );
};

export default Candle;
