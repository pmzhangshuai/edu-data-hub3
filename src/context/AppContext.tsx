import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, Indicator, NormConfig, TemplateLayoutConfig, NormType } from '../types';
import { defaultAppConfig, indicators } from '../data/mockData';

interface AppContextType {
  config: AppConfig;
  currentStep: number;
  loading: boolean;
  setCurrentStep: (step: number) => void;
  updateConfig: (config: Partial<AppConfig>) => void;
  updateNormConfig: (indicatorId: string, config: Partial<NormConfig>) => void;
  updateLayoutConfig: (config: Partial<TemplateLayoutConfig>) => void;
  saveConfig: () => void;
  exportConfig: () => void;
  getSelectedIndicators: () => Indicator[];
  getNormConfig: (indicatorId: string) => NormConfig | undefined;
  stepCompleted: (step: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(defaultAppConfig);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('reportConfig');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved config:', e);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateNormConfig = (indicatorId: string, normConfig: Partial<NormConfig>) => {
    setConfig(prev => {
      const existingIndex = prev.normConfigs.findIndex(nc => nc.indicatorId === indicatorId);
      let newNormConfigs: NormConfig[];
      
      if (existingIndex >= 0) {
        newNormConfigs = [...prev.normConfigs];
        newNormConfigs[existingIndex] = { ...newNormConfigs[existingIndex], ...normConfig };
      } else {
        newNormConfigs = [...prev.normConfigs, {
          indicatorId,
          normType: 'threshold' as NormType,
          passLabel: '达标',
          weight: 5,
          ...normConfig
        }];
      }
      
      return { ...prev, normConfigs: newNormConfigs };
    });
  };

  const updateLayoutConfig = (layoutConfig: Partial<TemplateLayoutConfig>) => {
    setConfig(prev => ({
      ...prev,
      layoutConfig: { ...prev.layoutConfig, ...layoutConfig }
    }));
  };

  const saveConfig = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('reportConfig', JSON.stringify(config));
      setLoading(false);
    }, 500);
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSelectedIndicators = () => {
    return indicators.filter(ind => config.selectedIndicators.includes(ind.id));
  };

  const getNormConfig = (indicatorId: string) => {
    return config.normConfigs.find(nc => nc.indicatorId === indicatorId);
  };

  const stepCompleted = (step: number): boolean => {
    if (step === 1) {
      return config.selectedIndicators.length > 0;
    }
    if (step === 2) {
      return config.selectedIndicators.every(id => 
        config.normConfigs.some(nc => nc.indicatorId === id)
      );
    }
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        config,
        currentStep,
        loading,
        setCurrentStep,
        updateConfig,
        updateNormConfig,
        updateLayoutConfig,
        saveConfig,
        exportConfig,
        getSelectedIndicators,
        getNormConfig,
        stepCompleted
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
