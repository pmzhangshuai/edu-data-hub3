import React from 'react';
import { Layout, Typography } from 'antd';
import { mockReportData } from './data/mockData';
import ReportTable from './components/ReportTable';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ margin: 0, lineHeight: '64px' }}>
          高校数据采集填报系统 - 报表模块
        </Title>
      </Header>
      <Content style={{ padding: '24px 50px' }}>
        <ReportTable data={mockReportData} />
      </Content>
    </Layout>
  );
};

export default App;
