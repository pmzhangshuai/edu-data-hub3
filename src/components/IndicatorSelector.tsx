import React, { useState, useMemo } from 'react';
import { Search, CheckSquare, Square, ListTree, Info } from 'lucide-react';
import { Indicator } from '../types';
import { indicators } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const IndicatorSelector: React.FC = () => {
  const { config, updateConfig } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('组织管理与机构建设');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    indicators.forEach(ind => cats.add(ind.category));
    return Array.from(cats);
  }, []);

  const filteredIndicators = useMemo(() => {
    let filtered = indicators;
    
    if (selectedCategory) {
      filtered = filtered.filter(ind => ind.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ind => 
        ind.name.toLowerCase().includes(term) || 
        ind.source.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  const toggleIndicator = (id: string) => {
    const isSelected = config.selectedIndicators.includes(id);
    if (isSelected) {
      updateConfig({
        selectedIndicators: config.selectedIndicators.filter(indId => indId !== id)
      });
    } else {
      updateConfig({
        selectedIndicators: [...config.selectedIndicators, id]
      });
    }
  };

  const selectAll = () => {
    const allIds = filteredIndicators.map(ind => ind.id);
    const newSelected = new Set([...config.selectedIndicators, ...allIds]);
    updateConfig({ selectedIndicators: Array.from(newSelected) });
  };

  const deselectAll = () => {
    const filteredIds = new Set(filteredIndicators.map(ind => ind.id));
    updateConfig({
      selectedIndicators: config.selectedIndicators.filter(id => !filteredIds.has(id))
    });
  };

  const getDataTypeTag = (type: string) => {
    const colors: Record<string, string> = {
      number: 'bg-blue-100 text-blue-700',
      string: 'bg-purple-100 text-purple-700',
      percent: 'bg-green-100 text-green-700',
      boolean: 'bg-orange-100 text-orange-700'
    };
    const labels: Record<string, string> = {
      number: '数值',
      string: '文本',
      percent: '百分比',
      boolean: '是/否'
    };
    return { color: colors[type] || 'bg-gray-100 text-gray-700', label: labels[type] || type };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">指标定义</h2>
        <p className="text-gray-600">从数据字典中选择需要纳入汇总表的指标</p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="w-64 bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <ListTree className="w-4 h-4" />
              指标分类
            </div>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Info className="w-3 h-3" />
              已选择 {config.selectedIndicators.length} 个指标
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索指标名称或来源..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
              </div>
              <button
                onClick={selectAll}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                全选当前
              </button>
              <button
                onClick={deselectAll}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                清除
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                <div className="col-span-1">选择</div>
                <div className="col-span-5">指标名称</div>
                <div className="col-span-2">类型</div>
                <div className="col-span-1">单位</div>
                <div className="col-span-3">数据来源</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredIndicators.map((indicator) => {
                const isSelected = config.selectedIndicators.includes(indicator.id);
                const tag = getDataTypeTag(indicator.dataType);
                return (
                  <div
                    key={indicator.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleIndicator(indicator.id)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-blue-500" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="col-span-5">
                        <div className="font-medium text-gray-800">{indicator.name}</div>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                          {tag.label}
                        </span>
                      </div>
                      <div className="col-span-1 text-sm text-gray-600">
                        {indicator.unit}
                      </div>
                      <div className="col-span-3 text-sm text-gray-500">
                        {indicator.source}
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredIndicators.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  没有找到匹配的指标
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorSelector;
