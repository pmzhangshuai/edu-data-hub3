import React from 'react';
import { AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockRawData, hospitals } from '../data/mockData';

const NormConfig: React.FC = () => {
  const { getSelectedIndicators, getNormConfig, updateNormConfig } = useAppContext();
  const selectedIndicators = getSelectedIndicators();

  const evaluateNorm = (_indicator: any, normConfig: any, sampleValue: any) => {
    if (normConfig.normType === 'threshold') {
      const op = normConfig.operator;
      const val = parseFloat(sampleValue);
      const target = normConfig.thresholdValue;
      if (op === '≥') return val >= target;
      if (op === '≤') return val <= target;
      if (op === '=') return val == target;
    } else if (normConfig.normType === 'range') {
      const val = parseFloat(sampleValue);
      return val >= normConfig.min && val <= normConfig.max;
    } else if (normConfig.normType === 'enum') {
      return normConfig.allowedValues?.includes(sampleValue);
    }
    return false;
  };

  const getSampleValue = (indicatorId: string) => {
    const data = mockRawData[indicatorId];
    if (!data) return '';
    const hospital = hospitals[0];
    return data[hospital.id]?.[2024] || '';
  };

  const getNormConfigOrDefault = (indicator: any) => {
    let config = getNormConfig(indicator.id);
    if (!config) {
      config = {
        indicatorId: indicator.id,
        normType: 'threshold' as const,
        operator: '≥' as const,
        thresholdValue: 0,
        passLabel: '达标',
        weight: 5
      };
    }
    return config;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">常模配置</h2>
        <p className="text-gray-600">为每个已选指标设置达标判定标准</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {selectedIndicators.map((indicator) => {
          const normConfig = getNormConfigOrDefault(indicator);
          const hasConfig = getNormConfig(indicator.id) !== undefined;
          const sampleValue = getSampleValue(indicator.id);
          const isPass = hasConfig ? evaluateNorm(indicator, normConfig, sampleValue) : null;

          return (
            <div key={indicator.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">{indicator.name}</h3>
                    {!hasConfig && (
                      <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        <span>未配置</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    单位：{indicator.unit} · 来源：{indicator.source}
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">常模类型</label>
                  <select
                    value={normConfig.normType}
                    onChange={(e) => updateNormConfig(indicator.id, { 
                      normType: e.target.value as any,
                      operator: e.target.value === 'threshold' ? '≥' : undefined,
                      allowedValues: e.target.value === 'enum' ? [] : undefined
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="threshold">阈值判定</option>
                    <option value="range">区间判定</option>
                    <option value="enum">枚举判定</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">判定规则</label>
                  {normConfig.normType === 'threshold' && (
                    <div className="flex gap-2">
                      <select
                        value={normConfig.operator || '≥'}
                        onChange={(e) => updateNormConfig(indicator.id, { operator: e.target.value as any })}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      >
                        <option value="≥">≥</option>
                        <option value="≤">≤</option>
                        <option value="=">=</option>
                      </select>
                      <input
                        type="number"
                        value={normConfig.thresholdValue || 0}
                        onChange={(e) => updateNormConfig(indicator.id, { thresholdValue: parseFloat(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        placeholder="目标值"
                      />
                    </div>
                  )}
                  {normConfig.normType === 'range' && (
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={normConfig.min || 0}
                        onChange={(e) => updateNormConfig(indicator.id, { min: parseFloat(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        placeholder="最小值"
                      />
                      <span className="text-gray-500">~</span>
                      <input
                        type="number"
                        value={normConfig.max || 0}
                        onChange={(e) => updateNormConfig(indicator.id, { max: parseFloat(e.target.value) })}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        placeholder="最大值"
                      />
                    </div>
                  )}
                  {normConfig.normType === 'enum' && (
                    <input
                      type="text"
                      value={(normConfig.allowedValues || []).join(', ')}
                      onChange={(e) => updateNormConfig(indicator.id, { 
                        allowedValues: e.target.value.split(',').map(v => v.trim()).filter(v => v)
                      })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      placeholder="多个值用逗号分隔"
                    />
                  )}
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">权重</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={normConfig.weight}
                      onChange={(e) => updateNormConfig(indicator.id, { weight: parseInt(e.target.value) })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                    <span className="text-gray-500 text-sm">分</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">达标文案</label>
                    <input
                      type="text"
                      value={normConfig.passLabel}
                      onChange={(e) => updateNormConfig(indicator.id, { passLabel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      placeholder="显示的达标文案"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">示例判定</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{sampleValue}</span>
                      <span className="text-gray-400">→</span>
                      {isPass === true && (
                        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          {normConfig.passLabel}
                        </span>
                      )}
                      {isPass === false && (
                        <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          未达标
                        </span>
                      )}
                      {isPass === null && (
                        <span className="text-gray-400 text-sm">请先配置</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {selectedIndicators.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600">请先在“指标定义”步骤中选择指标</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NormConfig;
