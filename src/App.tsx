import React from 'react';
import { Layout, Typography, Space, Row, Col } from 'antd';
import { mockHospitalData } from './data/mockData';
import { processData, getComparisonChartData, getResourceDistributionData } from './utils/dataProcessor';
import StatCard from './components/StatCard';
import LevelDistributionChart from './components/LevelDistributionChart';
import AffiliationDistributionChart from './components/AffiliationDistributionChart';
import ComparisonChart from './components/ComparisonChart';
import ResourceDistributionChart from './components/ResourceDistributionChart';
import HospitalDataTable from './components/HospitalDataTable';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const summaryData = processData(mockHospitalData);
  const comparisonData = getComparisonChartData(mockHospitalData);
  const resourceData = getResourceDistributionData(mockHospitalData);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ margin: 0, lineHeight: '64px' }}>
          高校数据采集填报系统 - 报表分析
        </Title>
      </Header>
      <Content style={{ padding: '30px 50px', background: '#f0f2f5' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={6}>
              <StatCard
                title="附属医院总数"
                value={summaryData.totalHospitals}
                color="#1890ff"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="职工总数"
                value={summaryData.totalEmployees}
                color="#52c41a"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="开放床位数"
                value={summaryData.totalBeds}
                color="#faad14"
              />
            </Col>
            <Col span={6}>
              <StatCard
                title="高级职称占比"
                value={summaryData.avgSeniorTitleRatio}
                suffix="%"
                color="#f5222d"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <LevelDistributionChart data={summaryData.hospitalsByLevel} />
            </Col>
            <Col span={12}>
              <AffiliationDistributionChart data={summaryData.hospitalsByAffiliation} />
            </Col>
          </Row>

          <ComparisonChart
            names={comparisonData.names}
            employees={comparisonData.employees}
            beds={comparisonData.beds}
            students={comparisonData.students}
          />

          <Row gutter={16}>
            <Col span={12}>
              <ResourceDistributionChart data={resourceData} />
            </Col>
            <Col span={12}>
              <Row gutter={16} style={{ height: '100%' }}>
                <Col span={12}>
                  <StatCard
                    title="在院学生总数"
                    value={summaryData.totalStudents}
                    color="#1890ff"
                  />
                </Col>
                <Col span={12}>
                  <StatCard
                    title="重点专科总数"
                    value={resourceData.find(r => r.name === '重点专科')?.value || 0}
                    color="#722ed1"
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <HospitalDataTable data={mockHospitalData} />
        </Space>
      </Content>
    </Layout>
  );
};

export default App;
