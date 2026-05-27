import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

interface ComparisonChartProps {
  names: string[];
  employees: number[];
  beds: number[];
  students: number[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  names,
  employees,
  beds,
  students,
}) => {
  const option = {
    title: {
      text: '各医院资源对比',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['职工数', '开放床位数', '在院学生数'],
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
      },
    ],
    series: [
      {
        name: '职工数',
        type: 'bar',
        data: employees,
        itemStyle: {
          color: '#5470c6',
        },
      },
      {
        name: '开放床位数',
        type: 'bar',
        data: beds,
        itemStyle: {
          color: '#91cc75',
        },
      },
      {
        name: '在院学生数',
        type: 'bar',
        data: students,
        itemStyle: {
          color: '#fac858',
        },
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={option} style={{ height: '450px' }} />
    </Card>
  );
};

export default ComparisonChart;
