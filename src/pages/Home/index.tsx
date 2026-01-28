import {
  AudioOutlined,
  ClockCircleOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history, useIntl } from '@umijs/max';
import React from 'react';

const DEFAULT_COL_SPAN = { xs: 24, sm: 12, md: 8, lg: 6 };

const HomePage: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer title={intl.formatMessage({ id: 'home.welcome' })}>
      <ProCard
        ghost
        gutter={[16, 16]}
        wrap
        title={intl.formatMessage({ id: 'menu.instrument' })}
        style={{ marginBlockStart: 24 }}
      >
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/instrument/tone-training');
          }}
          title={
            <div className="flex items-center gap-2">
              <SoundOutlined className="text-blue-500" />
              <span>
                {intl.formatMessage({ id: 'menu.instrument.tone-training' })}
              </span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({
                id: 'home.training.tone-training.subtitle',
              })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({ id: 'home.training.tone-training.desc' })}
            </div>
          </div>
        </ProCard>
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/instrument/tone-identification');
          }}
          title={
            <div className="flex items-center gap-2">
              <CustomerServiceOutlined className="text-green-500" />
              <span>
                {intl.formatMessage({
                  id: 'menu.instrument.tone-identification',
                })}
              </span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({
                id: 'home.training.tone-identification.subtitle',
              })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({
                id: 'home.training.tone-identification.desc',
              })}
            </div>
          </div>
        </ProCard>
      </ProCard>

      <ProCard
        ghost
        gutter={[16, 16]}
        wrap
        title={intl.formatMessage({ id: 'menu.vocal' })}
        style={{ marginBlockStart: 24 }}
      >
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/vocal/ma-exercise');
          }}
          title={
            <div className="flex items-center gap-2">
              <AudioOutlined className="text-red-500" />
              <span>
                {intl.formatMessage({ id: 'menu.vocal.ma-exercise' })}
              </span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({
                id: 'home.training.vocal.ma-exercise.subtitle',
              })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({
                id: 'home.training.vocal.ma-exercise.desc',
              })}
            </div>
          </div>
        </ProCard>
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/vocal/resonance');
          }}
          title={
            <div className="flex items-center gap-2">
              <SoundOutlined className="text-purple-500" />
              <span>{intl.formatMessage({ id: 'menu.vocal.resonance' })}</span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({
                id: 'home.training.vocal.resonance.subtitle',
              })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({
                id: 'home.training.vocal.resonance.desc',
              })}
            </div>
          </div>
        </ProCard>
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/vocal/range-extension');
          }}
          title={
            <div className="flex items-center gap-2">
              <AudioOutlined className="text-orange-500" />
              <span>
                {intl.formatMessage({ id: 'menu.vocal.range-extension' })}
              </span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({
                id: 'home.training.vocal.range-extension.subtitle',
              })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({
                id: 'home.training.vocal.range-extension.desc',
              })}
            </div>
          </div>
        </ProCard>
      </ProCard>

      <ProCard
        ghost
        gutter={[16, 16]}
        wrap
        title={intl.formatMessage({ id: 'menu.tools' })}
        style={{ marginBlockStart: 24 }}
      >
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/tools/metronome');
          }}
          title={
            <div className="flex items-center gap-2">
              <ClockCircleOutlined className="text-cyan-500" />
              <span>{intl.formatMessage({ id: 'menu.tools.metronome' })}</span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>
              {intl.formatMessage({ id: 'home.tools.metronome.subtitle' })}
            </div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({ id: 'home.tools.metronome.desc' })}
            </div>
          </div>
        </ProCard>
      </ProCard>

      <ProCard
        ghost
        gutter={[16, 16]}
        wrap
        title={intl.formatMessage({ id: 'menu.settings' })}
        style={{ marginBlockStart: 24 }}
      >
        <ProCard
          colSpan={DEFAULT_COL_SPAN}
          layout="center"
          bordered
          hoverable
          onClick={() => {
            history.push('/settings');
          }}
          title={
            <div className="flex items-center gap-2">
              <SettingOutlined className="text-gray-500" />
              <span>{intl.formatMessage({ id: 'menu.settings' })}</span>
            </div>
          }
        >
          <div className="text-gray-500 text-center py-4">
            <div>{intl.formatMessage({ id: 'home.settings.subtitle' })}</div>
            <div className="mt-2 text-xs">
              {intl.formatMessage({ id: 'home.settings.desc' })}
            </div>
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default HomePage;
