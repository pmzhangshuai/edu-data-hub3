import React from 'react';
import { Table, Card, Typography } from 'antd';
import { ReportConfig, DataRecord } from '../types';

const { Title } = Typography;

interface ReportViewerProps {
  config: ReportConfig;
  records: DataRecord[];
}

const ReportViewer: React.FC<ReportViewerProps> = ({ config, records }) => {
  const generateDataSource = () => {
    const dataSource: any[] = [];
    
    config.sections.forEach((section) => {
      dataSource.push({
        key: `section_${section.id}`,
        isSectionTitle: true,
        sectionTitle: section.title,
      });
      
      section.rows.forEach((row) => {
        const record = records.find((r) => r.id === row.id);
        dataSource.push({
          key: row.id,
          level3: row.level3,
          checkPoint: row.checkPoint,
          standard: row.standard,
          ...(record || {}),
        });
      });
    });
    
    return dataSource;
  };

  return (
    <Card>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
        {config.name}
      </Title>
      
      {config.description && (
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>
          {config.description}
        </p>
      )}

      <Table
        columns={config.columns.map((col) => ({
        title: col.title,
        dataIndex: col.key,
        key: col.key,
        width: col.width,
        align: col.align,
        fixed: col.fixed,
      }))}
        dataSource={generateDataSource()}
        pagination={false}
        scroll={{ x: 1500, y: 600 }}
        bordered
        size="middle"
        rowClassName={(record) =>
          record && record.isSectionTitle ? 'section-title-row' : ''
        }
        components={{
      body: {
        cell: (props: any) => {
          if (!props.record) {
            return <td {...props} />;
          }
          if (props.record.isSectionTitle) {
            if (props['data-index'] === config.columns[0].key) {
              return (
                <td
                  {...props}
                  colSpan={config.columns.length}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    backgroundColor: '#e6f7ff',
                    padding: '12px 8px',
                    color: '#1890ff',
                  }}
                >
                  {props.record.sectionTitle}
                </td>
              );
            }
            return null;
          }
          return <td {...props} />;
        },
      },
    }}
    />
    </Card>
  );
};

export default ReportViewer;
