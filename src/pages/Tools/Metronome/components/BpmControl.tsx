import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Slider } from 'antd';
import { useIntl } from '@umijs/max';
import React from 'react';
import { METRONOME_STORAGE_KEY } from '@/constants';
import { getStats, setStats } from '@/utils/storage';
import './BpmControl.less';

interface BpmControlProps {
  bpm: number;
  onChange: (val: number) => void;
  visible?: boolean;
}

const BpmControl: React.FC<BpmControlProps> = ({
  bpm,
  onChange,
  visible = true,
}) => {
  const intl = useIntl();
  const [bpmStats, setBpmStats] = React.useState<{ bpm: number; count: number }[]>([]);

  // Load stats from localStorage
  React.useEffect(() => {
    const saved = getStats<{ bpm: number; count: number }[]>(
      METRONOME_STORAGE_KEY,
      [],
    );
    setBpmStats(saved);
  }, []);

  // Update stats debounced when bpm changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBpmStats((prev) => {
        const newStats = [...prev];
        const existing = newStats.find((s) => s.bpm === bpm);
        if (existing) {
          existing.count += 1;
        } else {
          newStats.push({ bpm, count: 1 });
        }
        // Save to localStorage using utility
        setStats(METRONOME_STORAGE_KEY, newStats);
        return newStats;
      });
    }, 2000); // 2 seconds threshold

    return () => clearTimeout(timer);
  }, [bpm]);

  const topBpms = React.useMemo(() => {
    return [...bpmStats]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((s) => s.bpm);
  }, [bpmStats]);

  const updateBpm = (val: number) => {
    const newBpm = Math.max(20, Math.min(300, val));
    onChange(newBpm);
  };

  return (
    <div className={`bpmControlSection ${!visible ? 'hiddenControls' : ''}`}>
      <div className="glassCard">
        <div className="bpmDisplayWrapper">
          <div className="bpmStepBtns">
            <Button
              type="text"
              size="large"
              icon={<MinusOutlined />}
              onClick={() => updateBpm(bpm - 5)}
              aria-label="Decrease BPM by 5"
            >
              5
            </Button>
            <Button
              type="text"
              icon={<MinusOutlined />}
              onClick={() => updateBpm(bpm - 1)}
              aria-label="Decrease BPM by 1"
            >
              1
            </Button>
          </div>

          <div className="bpmBigText">{bpm}</div>

          <div className="bpmStepBtns">
            <Button
              type="text"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => updateBpm(bpm + 5)}
              aria-label="Increase BPM by 5"
            >
              5
            </Button>
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => updateBpm(bpm + 1)}
              aria-label="Increase BPM by 1"
            >
              1
            </Button>
          </div>
        </div>
        <Slider
          className="bpmSliderFull"
          min={20}
          max={300}
          value={bpm}
          onChange={updateBpm}
          tooltip={{ open: false }}
        />

        {topBpms.length > 0 && (
          <div className="topBpmsSection">
            <span className="topBpmsLabel">{intl.formatMessage({
                    id: 'tools.metronome.beats-bpms-section-history',
                  })}</span>
            <div className="topBpmsList">
              {topBpms.map((tBpm) => (
                <div
                  key={tBpm}
                  className={`topBpmChip ${bpm === tBpm ? 'active' : ''}`}
                  onClick={() => onChange(tBpm)}
                >
                  {tBpm}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BpmControl;
