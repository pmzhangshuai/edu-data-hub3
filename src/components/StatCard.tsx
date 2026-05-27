import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, prefix, suffix, color }) => {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color: color || '#3f8600' }}
      />
    </Card>
  );
};

export default StatCard;
