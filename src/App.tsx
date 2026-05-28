import React, { useState } from 'react';
import { Layout, Menu, Typography, Space, Button, Popconfirm, Tag, Select } from 'antd';
import { FileTextOutlined, SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ReportProvider, useReport } from './context/ReportContext';
import ReportViewerPage from './pages/ReportViewerPage';
import ReportConfigPage from './pages/ReportConfigPage';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('viewer');
  const {
    appState,
    setCurrentConfig,
    createNewConfig,
    deleteConfig,
  } = useReport();

  const menuItems = [
    {
      key: 'viewer',
      label: '报表预览',
      icon: <FileTextOutlined />,
    },
    {
      key: 'config',
      label: '报表配置',
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Space>
          <Title level={3} style={{ margin: 0 }}>高校数据采集填报系统</Title>
        </Space>
        <Space>
          <span>当前报表：</span>
          <Select
            style={{ width: 300 }}
            value={appState.activeConfigId}
            onChange={(value) => {
              const config = appState.reportConfigs.find(c => c.id === value);
              if (config) setCurrentConfig(config);
            }}
          >
            {appState.reportConfigs.map(config => (
              <Option key={config.id} value={config.id}>
                {config.name}
              </Option>
            ))}
          </Select>
          <Button icon={<PlusOutlined />} onClick={createNewConfig}>新建报表</Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onSelect={({ key }) => setActiveTab(key)}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: '24px' }}>
            {activeTab === 'viewer' && <ReportViewerPage />}
            {activeTab === 'config' && <ReportConfigPage />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ReportProvider>
      <AppContent />
    </ReportProvider>
  );
};

export default App;
