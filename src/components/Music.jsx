import { useRef, useState } from 'react';
import styles from './Loader.module.css';

export default function Music() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div>
            <button
                className={`revolving-button ${styles.revolvingButton}`}
                onClick={togglePlayPause}
                style={{
                    position: 'fixed',
                    top: '6rem',
                    right: '20px',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: '2px solid #ff8800'
                }}
            >
                {isPlaying ? (
                    <div className={styles.loader}>
                        <div className={styles.loading}>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loader}>
                        <div className={styles.loading}>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                            <div className={styles.load}></div>
                        </div>
                        <div className={styles.crossLine}></div>
                    </div>
                )}
            </button>
            <audio
                ref={audioRef}
                src="/flare_song.mp3"
                loop
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
}
