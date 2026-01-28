import { Formatter } from 'antd/es/slider';

export const DEFAULT_NAME = 'Umi Max';

export type ToneType = 'GuitarChords' | '12Tone' | '8Tone';
export const DEFAULT_TONE_TYPE = 'GuitarChords';
export const TONE_TYPE_OPTIONS = [
  { label: 'option.tone-type.guitar-chords', value: 'GuitarChords' },
  { label: 'option.tone-type.12-tone', value: '12-Tone' },
  { label: 'option.tone-type.8-tone', value: '8-Tone' },
];

export type InstrumentName = 'guitar-acoustic' | 'guitar-electric' | 'piano';
export const DEFAULT_INSTRUMENT_NAME = 'guitar-acoustic';
export const INSTRUMENT_NAME_OPTIONS = [
  { label: 'option.instrument.guitar-acoustic', value: 'guitar-acoustic' },
  { label: 'option.instrument.guitar-electric', value: 'guitar-electric' },
  { label: 'option.instrument.piano', value: 'piano' },
];

export const MAJOR_SCALE = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const CHROMATIC_SCALE = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const OCTAVES = [2, 3, 4, 5, 6];

export const TONE_LIST_8 = OCTAVES.flatMap((oct) =>
  MAJOR_SCALE.map((note) => `${note}${oct}`),
);
export const TONE_LIST_12 = OCTAVES.flatMap((oct) =>
  CHROMATIC_SCALE.map((note) => `${note}${oct}`),
);

export const TONE_LIST_CHORDS = [
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B',
  'Em',
  'Am',
  'Dm',
  'Bm',
  'F#m',
  'C#m',
  'Gm',
  'C5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
  'B5',
  // 7
  'G7',
  'C7',
  'D7',
  'E7',
  'A7',
  'B7',
  // maj7
  'Cmaj7',
  'Gmaj7',
  'Fmaj7',
  'Amaj7',
  // m7
  'Am7',
  'Em7',
  'Dm7',
  'Bm7',
  'F#m7',
  // sus
  'Dsus4',
  'Asus4',
  'Esus4',
  // slash
  'D/F#',
  'C/G',
  'G/B',
];

export const DEFAULT_GUITAR_CHORDS = ['C', 'D', 'G', 'A', 'Em', 'Am', 'Dm'];

// Default select common chords
export const DEFAULT_TONE_LIST = ['C', 'D', 'G', 'A', 'Em', 'Am', 'Dm'];

export const LOOP_COUNT_OPTIONS = [
  { label: 'option.loop-count.infinite', value: '0' },
  { label: 'option.loop-count.n-times', value: '20' },
  { label: 'option.loop-count.n-times', value: '50' },
  { label: 'option.loop-count.n-times', value: '200' },
  { label: 'option.loop-count.custom', value: 'custom' },
];

export const DEFAULT_TTS_ENABLE = true;
export const DEFAULT_TTS_SOLFEGE = false;
export const DEFAULT_TTS_SOLFEGE_WAIT = 1500;
export const DEFAULT_TTS_NOTATION = false;
export const DEFAULT_TTS_NOTATION_WAIT = 1500;

export const MIX_DURATION = 100;
export const MAX_DURATION = 10 * 1000;
export const DURATION_STEP = 100;

export const GET_DURATION_FORMATTER = (intl: any): Formatter => {
  return (value: any) => {
    const ms = Number(value);
    if (isNaN(ms)) return `${value}`;
    const msLabel = intl.formatMessage({ id: 'formatter.millisecond' });
    if (ms < 1000) {
      return `${ms}${msLabel}`;
    }

    const seconds = Math.floor(ms / 1000);
    const remainingMs = ms % 1000;
    const secLabel = intl.formatMessage({ id: 'formatter.second' });

    if (seconds < 60) {
      if (remainingMs === 0) {
        return `${seconds}${secLabel}`;
      }
      return `${seconds}${secLabel}${remainingMs}${msLabel}`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minLabel = intl.formatMessage({ id: 'formatter.minute' });
    if (remainingSeconds === 0 && remainingMs === 0) {
      return `${minutes}${minLabel}${remainingMs}${msLabel}`;
    }
    return `${minutes}${minLabel}${remainingSeconds}${secLabel}${remainingMs}${msLabel}`;
  };
};

export const DURATION_FORMATTER: Formatter = (value: any) => {
  const ms = Number(value);
  if (isNaN(ms)) return `${value}`;

  const seconds = Math.floor(ms / 1000);
  let timeStr = '';

  if (seconds < 60) {
    timeStr = `${seconds}s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeStr = `${minutes}m`;
    if (remainingSeconds > 0) {
      timeStr += `${remainingSeconds}s`;
    }
  }

  return `${ms} ms (${timeStr})`;
};
export const DEFAULT_TONE_DURATION = 1000;
export const DEFAULT_TONE_WAIT = 1500;
export const DEFAULT_TTS_WAIT = 2000;
export const DEFAULT_TTS_RATE = 1;

export const DEFAULT_RANDOM = true;

export declare type TrainPlayerArgs = {
  toneType: ToneType;
  instrumentName: InstrumentName;
  toneList: string[];
  toneDuration: number; // ms
  toneWait: number; // ms,
  ttsEnable: boolean;
  ttsWait: number;
  ttsRate: number; // 0.1 ~ 10
  ttsSolfege: boolean;
  ttsSolfegeWait: number;
  ttsNotation: boolean;
  ttsNotationWait: number;
  random: boolean;
  loopCount: number;
  referenceNoteEnabled: boolean;
  referenceNote: string;
};

export const REFERENCE_NOTE_OPTIONS = [
  { label: 'C2', value: 'C2' },
  { label: 'C3', value: 'C3' },
  { label: 'C4', value: 'C4' },
  { label: 'C5', value: 'C5' },
  { label: 'C6', value: 'C6' },
];

export const DEFAULT_TRAIN_PLAYER_ARGS: TrainPlayerArgs = {
  toneType: DEFAULT_TONE_TYPE,
  instrumentName: DEFAULT_INSTRUMENT_NAME,
  toneList: DEFAULT_TONE_LIST,
  toneDuration: DEFAULT_TONE_DURATION,
  toneWait: DEFAULT_TONE_WAIT,
  ttsEnable: DEFAULT_TTS_ENABLE,
  ttsWait: DEFAULT_TTS_WAIT,
  ttsRate: DEFAULT_TTS_RATE,
  ttsSolfege: DEFAULT_TTS_SOLFEGE,
  ttsSolfegeWait: DEFAULT_TTS_SOLFEGE_WAIT,
  ttsNotation: DEFAULT_TTS_NOTATION,
  ttsNotationWait: DEFAULT_TTS_NOTATION_WAIT,
  random: DEFAULT_RANDOM,
  loopCount: 0,
  referenceNoteEnabled: false,
  referenceNote: 'C4',
};

export const STORAGE_PREFIX = 'mta:cfg:';
export const STATS_PREFIX = 'mta:sta:';

export const TONES_TRAINING_STORAGE_KEY = 'tones:training';
export const TONES_IDENTIFICATION_STORAGE_KEY = 'tones:identification';
export const VOCAL_MA_EXERCISE_STORAGE_KEY = 'vocal:ma-exercise';
export const VOCAL_RESONANCE_EXERCISE_STORAGE_KEY = 'vocal:resonance';
export const VOCAL_RANGE_EXTENSION_EXERCISE_STORAGE_KEY =
  'vocal:range-extension';
export const METRONOME_STORAGE_KEY = 'tools:metronome';

export const CONFIG_kEY_LIST = [
  {
    name: 'menu.instrument.tone-training',
    key: TONES_TRAINING_STORAGE_KEY,
  },
  {
    name: 'menu.instrument.tone-identification',
    key: TONES_IDENTIFICATION_STORAGE_KEY,
  },
  {
    name: 'vocal.ma-exercise.title',
    key: VOCAL_MA_EXERCISE_STORAGE_KEY,
  },
  {
    name: 'vocal.resonance.title',
    key: VOCAL_RESONANCE_EXERCISE_STORAGE_KEY,
  },
  {
    name: 'vocal.range-extension.title',
    key: VOCAL_RANGE_EXTENSION_EXERCISE_STORAGE_KEY,
  },
  {
    name: 'menu.tools.metronome',
    key: METRONOME_STORAGE_KEY,
  },
];
