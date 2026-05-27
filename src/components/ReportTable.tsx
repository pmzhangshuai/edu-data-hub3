import React from 'react';
import { Table, Typography, Space, Card } from 'antd';
import { ReportData } from '../types';

const { Title } = Typography;

interface ReportTableProps {
  data: ReportData;
}

const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
  const columns = [
    {
      title: '三级指标',
      dataIndex: 'level3',
      key: 'level3',
      width: 180,
      fixed: 'left' as const,
    },
    {
      title: '考核点',
      dataIndex: 'checkPoint',
      key: 'checkPoint',
      width: 350,
      fixed: 'left' as const,
    },
    {
      title: '具体标准要求（常模）',
      dataIndex: 'standard',
      key: 'standard',
      width: 250,
    },
  ];

  data.hospitals.forEach((hospital) => {
    columns.push({
      title: hospital,
      dataIndex: hospital,
      key: hospital,
      width: 160,
      align: 'center' as const,
    });
  });

  const dataSource: any[] = [];
  let key = 0;

  data.sections.forEach((section) => {
    // 添加分类标题行
    dataSource.push({
      key: key++,
      level3: section.title,
      isSectionTitle: true,
    });

    // 添加数据行
    section.rows.forEach((row) => {
      dataSource.push({
        key: key++,
        ...row,
      });
    });
  });

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          附属医院数据统计汇总表
        </Title>
        
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1500, y: 700 }}
          bordered
          size="middle"
          rowClassName={(record) => (record.isSectionTitle ? 'section-title-row' : '')}
          onRow={(record) => {
            if (record.isSectionTitle) {
              return {
                style: {
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#e6f7ff',
                  color: '#1890ff',
                },
              };
            }
            return {};
          }}
        />
      </Card>
    </Space>
  );
};

export default ReportTable;
