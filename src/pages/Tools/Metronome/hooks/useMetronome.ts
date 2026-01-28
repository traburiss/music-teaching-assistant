import { useCallback, useEffect, useRef, useState } from 'react';

// Audio types
export type SoundType =
  | 'mechanical'
  | 'woodblock'
  | 'claves'
  | 'snare'
  | 'kick'
  | 'hihat';

interface MetronomeState {
  bpm: number;
  beatsPerMeasure: number;
  subdivision: number;
  accent: boolean;
  soundType: SoundType;
}

export const useMetronome = (initialState: MetronomeState) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0); // 0-indexed beat in measure

  // Refs for consistent access inside timer
  const stateRef = useRef(initialState);
  useEffect(() => {
    stateRef.current = initialState;
  }, [initialState]);

  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const visualTimeoutRef = useRef<number | null>(null);
  const beatCountRef = useRef<number>(0); // Absolute beat counter including subdivisions

  // Lookahead settings
  const lookahead = 25.0; // ms
  const scheduleAheadTime = 0.1; // s

  // Initialize Audio Context on user interaction
  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  // Synthesis functions
  const playSound = (
    time: number,
    isAccent: boolean,
    sound: SoundType,
    isSubdivision: boolean = false,
  ) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Simple synthesis logic
    switch (sound) {
      case 'mechanical': {
        osc.type = 'square';
        const freq = isAccent ? 1200 : isSubdivision ? 600 : 800; // Lower pitch for subdivision
        osc.frequency.setValueAtTime(freq, time);
        gainNode.gain.setValueAtTime(isSubdivision ? 0.6 : 1, time); // Slightly softer
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        osc.start(time);
        osc.stop(time + 0.05);
        break;
      }

      case 'woodblock': {
        osc.type = 'sine';
        const freq = isAccent ? 1000 : isSubdivision ? 600 : 800;
        osc.frequency.setValueAtTime(freq, time);
        gainNode.gain.setValueAtTime(isSubdivision ? 0.7 : 1, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.start(time);
        osc.stop(time + 0.1);
        break;
      }

      case 'claves': {
        osc.type = 'sine';
        const freq = isAccent ? 2500 : isSubdivision ? 1600 : 2000;
        osc.frequency.setValueAtTime(freq, time);
        gainNode.gain.setValueAtTime(isSubdivision ? 0.7 : 1, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        osc.start(time);
        osc.stop(time + 0.1);
        break;
      }

      case 'snare': {
        // Noise burst for snare
        const bufferSize = ctx.sampleRate * 0.1; // 100ms
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Filter
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        // Lower filter freq for "deeper" sound, or just standard ghost note
        noiseFilter.frequency.value = isSubdivision ? 600 : 1000;
        noise.connect(noiseFilter);
        noiseFilter.connect(gainNode);

        // Envelope
        gainNode.gain.setValueAtTime(
          isAccent ? 1 : isSubdivision ? 0.4 : 0.7,
          time,
        );
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        noise.start(time);
        if (isAccent) playSound(time, false, 'mechanical'); // Layer click for attack
        break;
      }

      case 'kick': {
        osc.type = 'sine';
        const startFreq = isSubdivision ? 100 : 150;
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        gainNode.gain.setValueAtTime(
          isAccent ? 1 : isSubdivision ? 0.6 : 0.8,
          time,
        );
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        osc.start(time);
        osc.stop(time + 0.5);
        break;
      }

      case 'hihat': {
        // High pass noise
        const hhBufferSize = ctx.sampleRate * 0.05;
        const hhBuffer = ctx.createBuffer(1, hhBufferSize, ctx.sampleRate);
        const hhData = hhBuffer.getChannelData(0);
        for (let i = 0; i < hhBufferSize; i++) {
          hhData[i] = Math.random() * 2 - 1;
        }
        const hhNoise = ctx.createBufferSource();
        hhNoise.buffer = hhBuffer;
        const hhFilter = ctx.createBiquadFilter();
        hhFilter.type = 'highpass';
        hhFilter.frequency.value = isSubdivision ? 4000 : 7000; // Lower shimmer
        hhNoise.connect(hhFilter);
        hhFilter.connect(gainNode);

        gainNode.gain.setValueAtTime(
          isAccent ? 0.6 : isSubdivision ? 0.15 : 0.3,
          time,
        );
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        hhNoise.start(time);
        break;
      }

      default:
        break;
    }
  };

  const nextNote = () => {
    const { bpm, beatsPerMeasure, subdivision, accent, soundType } =
      stateRef.current;
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerSubdivision = secondsPerBeat / subdivision;

    nextNoteTimeRef.current += secondsPerSubdivision;

    // Calculate current position in measure
    const currentSubdivision =
      beatCountRef.current % (beatsPerMeasure * subdivision);
    const isDownbeat = currentSubdivision === 0;
    const isOnBeat = currentSubdivision % subdivision === 0;

    let shouldAccent = false;

    if (isDownbeat && accent) {
      shouldAccent = true;
    }

    if (isOnBeat) {
      // Main beat - standard sound
      playSound(nextNoteTimeRef.current, shouldAccent, soundType);
    } else {
      // Subdivision - use same sound type but deeper/softer
      if (subdivision > 1) {
        playSound(nextNoteTimeRef.current, false, soundType, true);
      }
    }

    // Update UI state sync
    // We need to sync this to animation frame potentially, but React state is okay for beat indicator
    // delay usage of setCurrentBeat to match audio time?
    // For simplicity, update ref, and let UI polling or callback handle it?
    // Actually, simple setTimeout for UI update matches 'enough' for visual indicator

    const timeToNote =
      nextNoteTimeRef.current - audioContextRef.current!.currentTime;

    if (isOnBeat) {
      const beatNumber = Math.floor(currentSubdivision / subdivision) + 1;
      visualTimeoutRef.current = window.setTimeout(() => {
        setCurrentBeat(beatNumber);
      }, timeToNote * 1000);
    }

    beatCountRef.current++;
  };

  const scheduler = useCallback(() => {
    while (
      nextNoteTimeRef.current <
      audioContextRef.current!.currentTime + scheduleAheadTime
    ) {
      nextNote();
    }
    timerIDRef.current = window.setTimeout(scheduler, lookahead);
  }, []);

  const start = useCallback(() => {
    ensureAudioContext();
    if (isPlaying) return;

    if (audioContextRef.current) {
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.05;
    }
    beatCountRef.current = 0;
    setIsPlaying(true);
    scheduler();
  }, [ensureAudioContext, isPlaying, scheduler]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(0); // Reset visual indicator to "all off"
    if (timerIDRef.current) {
      window.clearTimeout(timerIDRef.current);
    }
    if (visualTimeoutRef.current) {
      window.clearTimeout(visualTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
    };
  }, []);

  return { isPlaying, start, stop, currentBeat };
};
