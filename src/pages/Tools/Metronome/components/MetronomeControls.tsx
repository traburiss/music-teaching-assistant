import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import React from 'react';

interface MetronomeControlsProps {
  initialValues: any;
  onValuesChange: (changedValues: any, allValues: any) => void;
  disabled?: boolean;
}

const MetronomeControls: React.FC<MetronomeControlsProps> = ({
  initialValues,
  onValuesChange,
  disabled,
}) => {
  const intl = useIntl();

  return (
    <ProForm
      submitter={false}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      <Card title={intl.formatMessage({ id: 'tools.metronome.title' })}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <ProFormSlider
              name="bpm"
              label={intl.formatMessage({ id: 'tools.metronome.bpm' })}
              min={20}
              max={300}
              step={1}
              marks={{
                40: '40',
                60: '60',
                80: '80',
                100: '100',
                120: '120',
                144: '144',
                200: '200',
              }}
              fieldProps={{
                tooltip: { open: true },
              }}
              disabled={disabled}
            />
          </Col>

          <Col xs={24} md={12}>
            <ProFormSelect
              name="beatsPerMeasure"
              label={intl.formatMessage({
                id: 'tools.metronome.beats-per-measure',
              })}
              options={Array.from({ length: 16 }).map((_, i) => ({
                label: String(i + 1),
                value: i + 1,
              }))}
              disabled={disabled}
            />
          </Col>
          <Col xs={24} md={12}>
            <ProFormSelect
              name="subdivision"
              label={intl.formatMessage({
                id: 'tools.metronome.subdivision',
              })}
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
              disabled={disabled}
            />
          </Col>

          <Col span={24}>
            <ProFormRadio.Group
              name="soundType"
              label={intl.formatMessage({ id: 'tools.metronome.sound-type' })}
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
                    id: 'tools.metronome.sound.claves',
                  }),
                  value: 'claves',
                },
                {
                  label: intl.formatMessage({
                    id: 'tools.metronome.sound.snare',
                  }),
                  value: 'snare',
                },
                {
                  label: intl.formatMessage({
                    id: 'tools.metronome.sound.kick',
                  }),
                  value: 'kick',
                },
                {
                  label: intl.formatMessage({
                    id: 'tools.metronome.sound.hihat',
                  }),
                  value: 'hihat',
                },
              ]}
              disabled={disabled}
            />
          </Col>

          <Col span={24}>
            <ProFormSwitch
              name="accent"
              label={intl.formatMessage({ id: 'tools.metronome.accent' })}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Card>
    </ProForm>
  );
};

export default MetronomeControls;
