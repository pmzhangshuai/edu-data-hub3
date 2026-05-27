import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { ChartData } from '../types';

interface LevelDistributionChartProps {
  data: ChartData[];
}

const LevelDistributionChart: React.FC<LevelDistributionChartProps> = ({ data }) => {
  const option = {
    title: {
      text: '医院等级分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '医院数量',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  );
};

export default LevelDistributionChart;
