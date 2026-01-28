import React from 'react';
import styles from '../index.less';

interface BeatIndicatorProps {
  currentBeat: number; // 1-indexed
  beatsPerMeasure: number;
}

const BeatIndicator: React.FC<BeatIndicatorProps> = ({
  currentBeat,
  beatsPerMeasure,
}) => {
  return (
    <div className={styles.indicatorSection}>
      <div className={styles.beatIndicatorBox}>
        {(() => {
          const baseSize = 80; // Large for few beats
          const minSize = 22; // Small for many beats
          // Dynamic size formula: enhanced slope for better range
          const dotSize = Math.max(
            minSize,
            Math.min(baseSize, 140 / (Math.sqrt(beatsPerMeasure) + 1.0)),
          );
          const fontSize = Math.max(12, dotSize * 0.42);

          return Array.from({ length: beatsPerMeasure }).map((_, idx) => {
            const beatNum = idx + 1;
            const isActive = currentBeat === beatNum;
            const isAccent = beatNum === 1;
            return (
              <div
                key={beatNum}
                className={`${styles.beatDotMini} ${
                  isActive
                    ? isAccent
                      ? styles.activeAccentDotMini
                      : styles.activeDotMini
                    : ''
                } ${isAccent ? styles.accentDotMini : ''}`}
                style={{
                  width: `${dotSize}px`,
                  height: `${dotSize}px`,
                  fontSize: `${fontSize}px`,
                }}
              >
                {beatNum}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default BeatIndicator;
