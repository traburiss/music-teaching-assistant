import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    layout: 'top',
    siderWidth: 0,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
    title: true,
    useLocalStorage: true,
  },
  favicons: ['logo.svg'],
  routes: [
    {
      title: 'menu.home',
      path: '/',
      component: './Home',
      icon: 'HomeOutlined',
      key: 'menu.home',
    },
    {
      title: 'menu.instrument',
      icon: 'CustomerServiceOutlined',
      key: 'menu.instrument',
      routes: [
        {
          title: 'menu.instrument.tone-training',
          path: '/instrument/tone-training',
          component: './Instrument/ToneTraining',
          key: 'menu.instrument.tone-training',
          icon: 'SoundOutlined',
        },
        {
          title: 'menu.instrument.tone-identification',
          path: '/instrument/tone-identification',
          component: './Instrument/ToneIdentification',
          key: 'menu.instrument.tone-identification',
          icon: 'CustomerServiceOutlined',
        },
      ],
    },
    {
      title: 'menu.vocal',
      icon: 'AudioOutlined',
      key: 'menu.vocal',
      routes: [
        {
          title: 'menu.vocal.ma-exercise',
          path: '/vocal/ma-exercise',
          component: './Vocal/MaExercise',
          key: 'menu.vocal.ma-exercise',
          icon: 'SoundOutlined',
        },
        {
          title: 'menu.vocal.resonance',
          path: '/vocal/resonance',
          component: './Vocal/Resonance',
          key: 'menu.vocal.resonance',
          icon: 'SoundOutlined',
        },
        {
          title: 'menu.vocal.range-extension',
          path: '/vocal/range-extension',
          component: './Vocal/RangeExtension',
          key: 'menu.vocal.range-extension',
          icon: 'SoundOutlined',
        },
      ],
    },
    {
      title: 'menu.tools',
      icon: 'ToolOutlined',
      key: 'menu.tools',
      routes: [
        {
          title: 'menu.tools.metronome',
          path: '/tools/metronome',
          component: './Tools/Metronome',
          key: 'menu.tools.metronome',
          icon: 'ClockCircleOutlined',
        },
      ],
    },
    {
      title: 'menu.settings',
      path: '/settings',
      icon: 'SettingOutlined',
      component: './Settings',
      key: 'menu.settings',
    },
  ],
  npmClient: 'pnpm',
  esbuildMinifyIIFE: true,
  tailwindcss: {},
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: { type: 'hash' },
});
