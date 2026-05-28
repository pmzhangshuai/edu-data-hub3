import React from 'react';
import { useReport } from '../context/ReportContext';
import ReportViewer from '../components/ReportViewer';
import { Spin, Alert } from 'antd';

const ReportViewerPage: React.FC = () => {
  const { currentConfig, currentRecords } = useReport();

  if (!currentConfig) {
    return <Alert message="请先选择或创建报表配置" type="warning" />;
  }

  return <ReportViewer config={currentConfig} records={currentRecords} />;
};

export default ReportViewerPage;
