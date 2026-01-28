import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Slider } from 'antd';
import React from 'react';
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
  const updateBpm = (val: number) => {
    const newBpm = Math.max(20, Math.min(300, val));
    onChange(newBpm);
  };

  return (
    <div
      className={`bpmControlSection ${!visible ? 'hiddenControls' : ''}`}
    >
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
      </div>
    </div>
  );
};

export default BpmControl;
