import React from 'react';
import { Layout, CheckSquare, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { hospitals, years, mockRawData } from '../data/mockData';

const TemplateLayout: React.FC = () => {
  const { config, updateLayoutConfig, getSelectedIndicators } = useAppContext();
  const selectedIndicators = getSelectedIndicators();

  const generatePreviewTable = () => {
    const columns = [
      { key: 'indicator', title: '三级指标', fixed: 'left' as const, width: 250 },
      ...hospitals.flatMap(hospital => 
        years.map(year => ({
          key: `${hospital.id}-${year}`,
          title: `${hospital.name} (${year})`,
          width: 150
        }))
      )
    ];

    const dataSource = selectedIndicators.map(indicator => {
      const row: any = {
        key: indicator.id,
        indicator: indicator.name
      };
      
      hospitals.forEach(hospital => {
        years.forEach(year => {
          const value = mockRawData[indicator.id]?.[hospital.id]?.[year] || '-';
          row[`${hospital.id}-${year}`] = value;
        });
      });
      
      return row;
    });

    return { columns, dataSource };
  };

  const { columns, dataSource } = generatePreviewTable();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">模板布局</h2>
        <p className="text-gray-600">配置汇总表的输出格式和样式</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5" />
              维度配置
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">行维度</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <CheckSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">三级指标</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">列维度</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <CheckSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">医院名称</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <CheckSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">年度</span>
                  </label>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">值区域</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <CheckSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">指标值</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.layoutConfig.showPassMark}
                      onChange={(e) => updateLayoutConfig({ showPassMark: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">达标标记</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">附加选项</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.layoutConfig.showNormReference}
                    onChange={(e) => updateLayoutConfig({ showNormReference: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">显示常模参考列</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.layoutConfig.tableStyle.border}
                    onChange={(e) => updateLayoutConfig({ 
                      tableStyle: { ...config.layoutConfig.tableStyle, border: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">显示边框</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.layoutConfig.tableStyle.zebraStripe}
                    onChange={(e) => updateLayoutConfig({ 
                      tableStyle: { ...config.layoutConfig.tableStyle, zebraStripe: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">斑马纹</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.layoutConfig.tableStyle.fixedHeader}
                    onChange={(e) => updateLayoutConfig({ 
                      tableStyle: { ...config.layoutConfig.tableStyle, fixedHeader: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">固定表头</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col flex-1 overflow-hidden min-h-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                实时预览
              </h3>
              <span className="text-xs text-gray-500">
                {selectedIndicators.length} 个指标，{hospitals.length} 家医院
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <table className={`w-full text-sm ${config.layoutConfig.tableStyle.border ? 'border-collapse border border-gray-300' : ''}`}>
                <thead className={`${config.layoutConfig.tableStyle.fixedHeader ? 'sticky top-0' : ''} bg-gray-50`}>
                  <tr>
                    {columns.map(col => (
                      <th
                        key={col.key}
                        className={`px-4 py-3 text-left font-medium text-gray-700 ${
                          config.layoutConfig.tableStyle.border ? 'border border-gray-300' : ''
                        }`}
                        style={{ width: col.width }}
                      >
                        {col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((row, idx) => (
                    <tr
                      key={row.key}
                      className={`${
                        config.layoutConfig.tableStyle.zebraStripe && idx % 2 === 1 ? 'bg-gray-50' : ''
                      }`}
                    >
                      {columns.map(col => (
                        <td
                          key={col.key}
                          className={`px-4 py-3 text-gray-600 ${
                            config.layoutConfig.tableStyle.border ? 'border border-gray-300' : ''
                          }`}
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLayout;
