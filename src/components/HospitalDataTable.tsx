import React from 'react';
import { Table, Card, Tag } from 'antd';
import { HospitalData } from '../types';

interface HospitalDataTableProps {
  data: HospitalData[];
}

const HospitalDataTable: React.FC<HospitalDataTableProps> = ({ data }) => {
  const columns = [
    {
      title: '医院名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: '医院等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        let color = level === '三级甲等' ? 'red' : level === '三级乙等' ? 'orange' : 'blue';
        return <Tag color={color}>{level}</Tag>;
      },
    },
    {
      title: '隶属关系',
      dataIndex: 'affiliationType',
      key: 'affiliationType',
    },
    {
      title: '职工总数',
      dataIndex: 'totalEmployees',
      key: 'totalEmployees',
      sorter: (a: HospitalData, b: HospitalData) => a.totalEmployees - b.totalEmployees,
    },
    {
      title: '开放床位数',
      dataIndex: 'openBeds',
      key: 'openBeds',
      sorter: (a: HospitalData, b: HospitalData) => a.openBeds - b.openBeds,
    },
    {
      title: '高级职称人数',
      dataIndex: 'seniorTitle',
      key: 'seniorTitle',
      sorter: (a: HospitalData, b: HospitalData) => a.seniorTitle - b.seniorTitle,
    },
    {
      title: '在院学生数',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      sorter: (a: HospitalData, b: HospitalData) => a.totalStudents - b.totalStudents,
    },
    {
      title: '国考等级',
      dataIndex: 'nationalExamLevel',
      key: 'nationalExamLevel',
      render: (level: string) => {
        let color = level === 'A' ? 'green' : level === 'B' ? 'blue' : 'orange';
        return <Tag color={color}>{level}</Tag>;
      },
    },
  ];

  return (
    <Card title="附属医院数据详情">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default HospitalDataTable;
