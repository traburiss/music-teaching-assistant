import {
  CaretRightOutlined,
  MinusOutlined,
  PauseOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Select, Slider, Space } from 'antd';
import React, { useState } from 'react';
import MetronomeVisual from './components/MetronomeVisual';
import { SoundType, useMetronome } from './hooks/useMetronome';
import styles from './index.less';

const MetronomePage: React.FC = () => {
  const intl = useIntl();

  const [settings, setSettings] = useState({
    bpm: 100,
    beatsPerMeasure: 4,
    subdivision: 1,
    accent: true,
    soundType: 'mechanical' as SoundType,
  });

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
      <div className={styles.metronomePage}>
        {/* Background Visuals */}
        <MetronomeVisual
          bpm={settings.bpm}
          isPlaying={isPlaying}
          currentBeat={currentBeat}
          beatsPerMeasure={settings.beatsPerMeasure}
        />

        {/* Foreground Controls */}
        <div className={styles.controlsLayer}>
          <div className={styles.topPlaceholder} />

          {/* BPM Section */}
          <div
            className={`${styles.bpmControlSection} ${isPlaying ? styles.hiddenControls : ''}`}
          >
            <div
              className={`${styles.glassCard} flex flex-column items-center`}
            >
              <div className={styles.bpmDisplayWrapper}>
                <div className={styles.bpmStepBtns}>
                  <Button
                    type="text"
                    size="large"
                    icon={<MinusOutlined />}
                    onClick={() => updateBpm(settings.bpm - 5)}
                  >
                    -5
                  </Button>
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => updateBpm(settings.bpm - 1)}
                  >
                    -1
                  </Button>
                </div>

                <div className={styles.bpmBigText}>{settings.bpm}</div>

                <div className={styles.bpmStepBtns}>
                  <Button
                    type="text"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => updateBpm(settings.bpm + 5)}
                  >
                    +5
                  </Button>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => updateBpm(settings.bpm + 1)}
                  >
                    +1
                  </Button>
                </div>
              </div>
              <Slider
                className={styles.bpmSliderFull}
                min={20}
                max={300}
                value={settings.bpm}
                onChange={updateBpm}
                tooltip={{ open: false }}
              />
            </div>
          </div>

          {/* Config Section */}
          <div
            className={`${styles.selectionSection} ${isPlaying ? styles.hiddenControls : ''}`}
          >
            <div
              className={styles.glassCard}
              style={{ padding: '20px 40px', display: 'flex', gap: '40px' }}
            >
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
                  {intl.formatMessage({ id: 'tools.metronome.subdivision' })}
                </span>
                <Select
                  bordered={false}
                  className="text-lg font-bold"
                  value={settings.subdivision}
                  onChange={(v) =>
                    setSettings((prev) => ({ ...prev, subdivision: v }))
                  }
                  options={[
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.subdivision.1',
                      }),
                      value: 1,
                    },
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.subdivision.2',
                      }),
                      value: 2,
                    },
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.subdivision.3',
                      }),
                      value: 3,
                    },
                    {
                      label: intl.formatMessage({
                        id: 'tools.metronome.subdivision.4',
                      }),
                      value: 4,
                    },
                  ]}
                  style={{ width: 140 }}
                />
              </Space>
            </div>
          </div>

          {/* Action Section */}
          <div className={styles.actionSection}>
            <Button
              type="primary"
              shape="circle"
              onClick={togglePlay}
              icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
              style={{
                width: 90,
                height: 90,
                fontSize: '36px',
                boxShadow: isPlaying
                  ? '0 10px 30px rgba(255, 77, 79, 0.4)'
                  : '0 10px 30px rgba(24, 144, 255, 0.4)',
                background: isPlaying
                  ? 'var(--metronome-accent)'
                  : 'var(--metronome-primary)',
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
