import React from 'react';
import styles from '../index.less';

interface MetronomeBackdropProps {
  bpm: number;
  isPlaying: boolean;
}

const MetronomeBackdrop: React.FC<MetronomeBackdropProps> = ({
  bpm,
  isPlaying,
}) => {
  const animationDuration = 60 / bpm;

  return (
    <div
      className={`${styles.graphicSection} ${!isPlaying ? styles.graphicIdle : styles.graphicRunning}`}
    >
      <div className={styles.metronomeContainerModern}>
        {/* Elegant Architectural SVG Metronome Body */}
        <svg className={styles.metronomeSvg} viewBox="0 0 200 300">
          {/* Main tapered body with subtle curve at bottom */}
          <path
            d="M30 280 Q100 290 170 280 L135 40 L65 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={styles.metronomeOutline}
          />
          {/* Perspective line at the bottom */}
          <path
            d="M30 280 Q100 275 170 280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.3"
          />
          {/* Pivot Point Marker (cy=240) */}
          <circle cx="100" cy="240" r="3" fill="currentColor" opacity="0.5" />
        </svg>

        {/* Pendulum Modern - Anchored toPivot cx=100, cy=240 */}
        <div
          key={isPlaying ? 'playing' : 'stopped'}
          className={`${styles.pendulumModern} ${isPlaying ? styles.swingingModern : ''}`}
          style={{
            animationDuration: `${animationDuration}s`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        >
          <div className={styles.stickModern}>
            <div
              className={styles.weightModern}
              style={{ top: `${70 - bpm / 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetronomeBackdrop;
