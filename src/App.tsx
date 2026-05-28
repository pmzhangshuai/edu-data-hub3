import React, { useState } from 'react';
import { Save, Download, Eye, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AppProvider, useAppContext } from './context/AppContext';
import StepNavigation from './components/StepNavigation';
import IndicatorSelector from './components/IndicatorSelector';
import NormConfig from './components/NormConfig';
import TemplateLayout from './components/TemplateLayout';

const AppContent: React.FC = () => {
  const { currentStep, setCurrentStep, saveConfig, exportConfig, stepCompleted } = useAppContext();

  const handleSave = () => {
    saveConfig();
    toast.success('配置已保存！');
  };

  const handleExport = () => {
    exportConfig();
    toast.success('配置文件已导出！');
  };

  const handlePreview = () => {
    toast.success('正在生成预览...');
  };

  const steps = ['指标定义', '常模配置', '模板布局'];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <IndicatorSelector />;
      case 2:
        return <NormConfig />;
      case 3:
        return <TemplateLayout />;
      default:
        return null;
    }
  };

  const canGoNext = currentStep < 3 && stepCompleted(currentStep);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">高校数据采集填报系统</h1>
              <p className="text-sm text-gray-500">汇总表模板配置</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              保存配置
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              导出配置
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              预览汇总表
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <StepNavigation />
        
        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden">
            {renderStepContent()}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              上一步
            </button>
            
            <div className="flex items-center gap-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                    idx + 1 === currentStep
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : idx + 1 < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {idx + 1 < currentStep && <CheckCircle2 className="w-4 h-4" />}
                  {idx + 1}
                  <span className="hidden sm:inline">{step}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={!canGoNext}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                !canGoNext
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentStep === 3 ? '完成配置' : '下一步'}
              {currentStep !== 3 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
