import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

import { METRONOME_STORAGE_KEY } from '@/constants';
import { getPageSettings, setPageSettings } from '@/utils/storage';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Select, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import BeatIndicator from './components/BeatIndicator';
import BpmControl from './components/BpmControl';
import MetronomeBackdrop from './components/MetronomeBackdrop';
import { SoundType, useMetronome } from './hooks/useMetronome';
import './index.less';

const DEFAULT_SETTINGS = {
  bpm: 100,
  beatsPerMeasure: 4,
  subdivision: 1,
  accent: true,
  soundType: 'mechanical' as SoundType,
};

const MetronomePage: React.FC = () => {
  const intl = useIntl();

  const [settings, setSettings] = useState(() =>
    getPageSettings(METRONOME_STORAGE_KEY, DEFAULT_SETTINGS),
  );

  useEffect(() => {
    setPageSettings(
      METRONOME_STORAGE_KEY,
      settings,
      intl.formatMessage({ id: 'menu.tools.metronome' }),
    );
  }, [settings, intl]);

  const { isPlaying, start, stop, currentBeat } = useMetronome(settings);

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  const updateBpm = (val: number) => {
    const newBpm = Math.max(20, Math.min(300, val));
    setSettings((prev) => ({ ...prev, bpm: newBpm }));
  };

  return (
    <PageContainer
      header={{
        title: intl.formatMessage({ id: 'menu.tools.metronome' }),
      }}
    >
      <div className="metronomePage">
        {/* Background Visuals Layer */}
        <div className="visualLayer">
          <BeatIndicator
            currentBeat={currentBeat}
            beatsPerMeasure={settings.beatsPerMeasure}
          />
          <MetronomeBackdrop bpm={settings.bpm} isPlaying={isPlaying} />
        </div>

        {/* Foreground Controls */}
        <div className="controlsLayer">
          <div className="topPlaceholder" />

          {/* BPM Section */}
          <BpmControl
            bpm={settings.bpm}
            onChange={updateBpm}
            visible={!isPlaying}
          />

          {/* Config Section */}
          <div
            className={`selectionSection ${isPlaying ? 'hiddenControls' : ''}`}
          >
            <div className="glassCard">
              <Space direction="vertical" align="center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {intl.formatMessage({
                    id: 'tools.metronome.beats-per-measure',
                  })}
                </span>
                <Select
                  bordered={false}
                  className="text-lg font-bold"
                  value={settings.beatsPerMeasure}
                  onChange={(v) =>
                    setSettings((prev) => ({ ...prev, beatsPerMeasure: v }))
                  }
                  options={Array.from({ length: 16 }).map((_, i) => ({
                    label: String(i + 1),
                    value: i + 1,
                  }))}
                  style={{ width: 80 }}
                />
              </Space>
              <Space direction="vertical" align="center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {intl.formatMessage({ id: 'tools.metronome.subdivision' })}
                </span>
                <Select
                  bordered={false}
                  className="text-lg font-bold"
                  value={settings.subdivision}
                  onChange={(v) =>
                    setSettings((prev) => ({ ...prev, subdivision: v }))
                  }
                  options={[1, 2, 3, 4, 6, 8].map((val) => ({
                    label: String(val),
                    value: val,
                  }))}
                  style={{ width: 80 }}
                />
              </Space>
              <Space direction="vertical" align="center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {intl.formatMessage({ id: 'tools.metronome.sound-type' })}
                </span>
                <Select
                  bordered={false}
                  className="text-lg font-bold"
                  value={settings.soundType}
                  onChange={(v) =>
                    setSettings((prev) => ({ ...prev, soundType: v }))
                  }
                  options={[
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.sound.mechanical',
                      }),
                      value: 'mechanical',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.sound.woodblock',
                      }),
                      value: 'woodblock',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.sound.snare',
                      }),
                      value: 'snare',
                    },
                  ]}
                  style={{ width: 140 }}
                />
              </Space>
              <Space direction="vertical" align="center">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {intl.formatMessage({ id: 'tools.metronome.accent' })}
                </span>
                <Switch
                  checked={settings.accent}
                  onChange={(checked) =>
                    setSettings((prev) => ({ ...prev, accent: checked }))
                  }
                  style={{ marginTop: 6 }}
                />
              </Space>
            </div>
          </div>

          {/* Action Section */}
          <div className="actionSection">
            <Button
              type="primary"
              shape="circle"
              onClick={togglePlay}
              icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
              className="playButton"
              style={{
                width: 90,
                height: 90,
                fontSize: '36px',
                boxShadow: isPlaying
                  ? '0 10px 30px rgba(250, 140, 22, 0.4)'
                  : '0 10px 30px rgba(24, 144, 255, 0.4)',
                background: isPlaying ? '#fa8c16' : 'var(--metronome-primary)',
                border: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MetronomePage;
