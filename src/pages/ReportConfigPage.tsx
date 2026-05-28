import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Form, 
  Input, 
  Space, 
  Typography, 
  Tabs, 
  Table, 
  Popconfirm, 
  InputNumber, 
  Select, 
  Tag 
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ReportConfig, ColumnConfig, ReportSectionConfig, ReportRowConfig } from '../types';
import { useReport } from '../context/ReportContext';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ReportConfigPageProps {}

const ReportConfigPage: React.FC<ReportConfigPageProps> = () => {
  const { currentConfig, updateConfig } = useReport();
  const [editing, setEditing] = useState(false);

  if (!currentConfig) {
    return <div>请先选择或创建报表配置</div>;
  }

  const handleSave = (values: any) => {
    updateConfig({
      ...currentConfig,
      name: values.name,
      description: values.description,
    });
    setEditing(false);
  };

  const addColumn = () => {
    const newColumn: ColumnConfig = {
      key: `col_${Date.now()}`,
      title: '新列',
      width: 150,
      align: 'left',
    };
    updateConfig({
      ...currentConfig,
      columns: [...currentConfig.columns, newColumn],
    });
  };

  const updateColumn = (index: number, updates: Partial<ColumnConfig>) => {
    const newColumns = [...currentConfig.columns];
    newColumns[index] = { ...newColumns[index], ...updates };
    updateConfig({
      ...currentConfig,
      columns: newColumns,
    });
  };

  const deleteColumn = (index: number) => {
    if (currentConfig.columns.length <= 3) {
      alert('至少需要保留3个基础列');
      return;
    }
    updateConfig({
      ...currentConfig,
      columns: currentConfig.columns.filter((_, i) => i !== index),
    });
  };

  const addSection = () => {
    const newSection: ReportSectionConfig = {
      id: `section_${Date.now()}`,
      title: `新章节 ${currentConfig.sections.length + 1}`,
      rows: [],
    };
    updateConfig({
      ...currentConfig,
      sections: [...currentConfig.sections, newSection],
    });
  };

  const updateSection = (sectionId: string, updates: Partial<ReportSectionConfig>) => {
    updateConfig({
      ...currentConfig,
      sections: currentConfig.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    });
  };

  const deleteSection = (sectionId: string) => {
    if (currentConfig.sections.length <= 1) {
      alert('至少需要保留一个章节');
      return;
    }
    updateConfig({
      ...currentConfig,
      sections: currentConfig.sections.filter(s => s.id !== sectionId),
    });
  };

  const addRow = (sectionId: string) => {
    const newRow: ReportRowConfig = {
      id: `row_${Date.now()}`,
      checkPoint: '新指标',
    };
    updateConfig({
      ...currentConfig,
      sections: currentConfig.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            rows: [...section.rows, newRow],
          };
        }
        return section;
      }),
    });
  };

  const updateRow = (sectionId: string, rowId: string, updates: Partial<ReportRowConfig>) => {
    updateConfig({
      ...currentConfig,
      sections: currentConfig.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            rows: section.rows.map(row =>
              row.id === rowId ? { ...row, ...updates } : row
            ),
          };
        }
        return section;
      }),
    });
  };

  const deleteRow = (sectionId: string, rowId: string) => {
    updateConfig({
      ...currentConfig,
      sections: currentConfig.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            rows: section.rows.filter(r => r.id !== rowId),
          };
        }
        return section;
      }),
    });
  };

  const columnTableColumns = [
    {
      title: '列标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: ColumnConfig, index: number) => (
        <Input
          value={text}
          onChange={(e) => updateColumn(index, { title: e.target.value })}
          size="small"
        />
      ),
    },
    {
      title: '宽度',
      dataIndex: 'width',
      key: 'width',
      width: 120,
      render: (width: number, record: ColumnConfig, index: number) => (
        <InputNumber
          value={width}
          onChange={(value) => updateColumn(index, { width: value || 100 })}
          size="small"
          min={50}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: '对齐',
      dataIndex: 'align',
      key: 'align',
      width: 120,
      render: (align: string, record: ColumnConfig, index: number) => (
        <Select
          value={align}
          onChange={(value) => updateColumn(index, { align: value as any })}
          size="small"
          style={{ width: '100%' }}
        >
          <Option value="left">左对齐</Option>
          <Option value="center">居中</Option>
          <Option value="right">右对齐</Option>
        </Select>
      ),
    },
    {
      title: '固定',
      dataIndex: 'fixed',
      key: 'fixed',
      width: 120,
      render: (fixed: string, record: ColumnConfig, index: number) => (
        <Select
          value={fixed}
          onChange={(value) => updateColumn(index, { fixed: value as any })}
          size="small"
          style={{ width: '100%' }}
        >
          <Option value={undefined}>不固定</Option>
          <Option value="left">左侧固定</Option>
          <Option value="right">右侧固定</Option>
        </Select>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 80,
      render: (_: any, __: any, index: number) => (
        <Popconfirm
          title="确定要删除这一列吗？"
          onConfirm={() => deleteColumn(index)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card>
        <Title level={3}>报表基本信息</Title>
        <Form
          layout="vertical"
          initialValues={{
            name: currentConfig.name,
            description: currentConfig.description,
          }}
          onFinish={handleSave}
        >
          <Form.Item
            label="报表名称"
            name="name"
            rules={[{ required: true, message: '请输入报表名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存基本信息
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="列配置"
        extra={<Button icon={<PlusOutlined />} onClick={addColumn}>添加列</Button>}
      >
        <Table
          columns={columnTableColumns}
          dataSource={currentConfig.columns.map((col, index) => ({ ...col, key: index }))}
          pagination={false}
          bordered
          rowKey="key"
        />
      </Card>

      <Card
        title="章节配置"
        extra={<Button icon={<PlusOutlined />} onClick={addSection}>添加章节</Button>}
      >
        <Tabs type="card">
          {currentConfig.sections.map((section, sectionIndex) => (
            <Tabs.TabPane
              tab={
                <Space>
                  <span>{section.title}</span>
                  <Popconfirm
                    title="确定要删除这个章节吗？"
                    onConfirm={() => deleteSection(section.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
                  </Popconfirm>
                </Space>
              }
              key={section.id}
            >
              <Card
                type="inner"
                title={
                  <Space>
                    <span>章节名称：</span>
                    <Input
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      size="small"
                      style={{ width: 300 }}
                    />
                  </Space>
                }
                extra={<Button icon={<PlusOutlined />} onClick={() => addRow(section.id)} size="small">添加指标</Button>}
              >
                <Table
                  dataSource={section.rows}
                  rowKey="id"
                  pagination={false}
                  bordered
                  columns={[
                    {
                      title: '三级指标',
                      dataIndex: 'level3',
                      key: 'level3',
                      width: 180,
                      render: (text: string, record: ReportRowConfig) => (
                        <Input
                          value={text}
                          onChange={(e) => updateRow(section.id, record.id, { level3: e.target.value })}
                          size="small"
                          placeholder="可留空"
                        />
                      ),
                    },
                    {
                      title: '考核点',
                      dataIndex: 'checkPoint',
                      key: 'checkPoint',
                      width: 300,
                      render: (text: string, record: ReportRowConfig) => (
                        <Input
                          value={text}
                          onChange={(e) => updateRow(section.id, record.id, { checkPoint: e.target.value })}
                          size="small"
                          placeholder="考核点"
                        />
                      ),
                    },
                    {
                      title: '具体标准要求',
                      dataIndex: 'standard',
                      key: 'standard',
                      render: (text: string, record: ReportRowConfig) => (
                        <Input
                          value={text}
                          onChange={(e) => updateRow(section.id, record.id, { standard: e.target.value })}
                          size="small"
                          placeholder="标准要求"
                        />
                      ),
                    },
                    {
                      title: '操作',
                      key: 'actions',
                      width: 80,
                      render: (_: any, record: ReportRowConfig) => (
                        <Popconfirm
                          title="确定要删除这个指标吗？"
                          onConfirm={() => deleteRow(section.id, record.id)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                        </Popconfirm>
                      ),
                    },
                  ]}
                />
              </Card>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </Space>
  );
};

export default ReportConfigPage;
