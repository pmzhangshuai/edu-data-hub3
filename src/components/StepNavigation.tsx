import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StepNavigation: React.FC = () => {
  const { currentStep, setCurrentStep, stepCompleted } = useAppContext();

  const steps = [
    { id: 1, title: '指标定义', description: '选择需要纳入汇总表的指标' },
    { id: 2, title: '常模配置', description: '为每个指标设置达标标准' },
    { id: 3, title: '模板布局', description: '配置输出格式和表格样式' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">汇总表配置</h2>
        <p className="text-sm text-gray-500 mt-1">三步完成模板配置</p>
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = stepCompleted(step.id);
          const canClick = step.id <= currentStep || (step.id === currentStep + 1 && stepCompleted(currentStep));

          return (
            <button
              key={step.id}
              onClick={() => canClick && setCurrentStep(step.id)}
              disabled={!canClick}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : isCompleted
                  ? 'bg-green-50 border-2 border-green-100 hover:bg-green-100'
                  : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'
              } ${!canClick ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      步骤 {step.id}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        当前
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-800 mt-1">{step.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>提示：</strong>完成当前步骤后才能进入下一步配置
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepNavigation;
