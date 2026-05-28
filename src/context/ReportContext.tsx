import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ReportConfig, DataRecord, AppState } from '../types';
import { defaultReportConfig, defaultDataRecords } from '../data/defaultData';

interface ReportContextType {
  appState: AppState;
  currentConfig: ReportConfig | null;
  currentRecords: DataRecord[];
  setCurrentConfig: (config: ReportConfig) => void;
  updateConfig: (config: ReportConfig) => void;
  createNewConfig: () => ReportConfig;
  deleteConfig: (configId: string) => void;
  saveRecord: (record: DataRecord) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(() => {
    const savedConfigs = localStorage.getItem('reportConfigs');
    if (savedConfigs) {
      try {
        const configs = JSON.parse(savedConfigs);
        return {
          reportConfigs: configs.map((c: any) => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt),
          })),
          activeConfigId: configs.length > 0 ? configs[0].id : null,
        };
      } catch {
        // fall through
      }
    }
    return {
      reportConfigs: [defaultReportConfig],
      activeConfigId: 'default',
    };
  });

  const [currentRecords, setCurrentRecords] = useState<DataRecord[]>(() => {
    const savedRecords = localStorage.getItem('reportRecords');
    if (savedRecords) {
      try {
        return JSON.parse(savedRecords);
      } catch {
        // fall through
      }
    }
    return defaultDataRecords;
  });

  useEffect(() => {
    localStorage.setItem('reportConfigs', JSON.stringify(appState.reportConfigs));
  }, [appState.reportConfigs]);

  useEffect(() => {
    localStorage.setItem('reportRecords', JSON.stringify(currentRecords));
  }, [currentRecords]);

  const currentConfig = appState.reportConfigs.find(c => c.id === appState.activeConfigId) || null;

  const setCurrentConfig = (config: ReportConfig) => {
    setAppState(prev => ({
      ...prev,
      activeConfigId: config.id,
    }));
  };

  const updateConfig = (config: ReportConfig) => {
    setAppState(prev => ({
      ...prev,
      reportConfigs: prev.reportConfigs.map(c =>
        c.id === config.id ? { ...config, updatedAt: new Date() } : c
      ),
    }));
  };

  const createNewConfig = () => {
    const newConfig: ReportConfig = {
      id: `report_${Date.now()}`,
      name: '新报表',
      description: '',
      columns: [
        { key: 'level3', title: '三级指标', width: 180, fixed: 'left' },
        { key: 'checkPoint', title: '考核点', width: 350, fixed: 'left' },
        { key: 'standard', title: '具体标准要求', width: 250 },
      ],
      sections: [
        {
          id: 'section_1',
          title: '1.第一部分',
          rows: [
            { id: 'row_1', checkPoint: '指标1', standard: '标准要求' },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAppState(prev => ({
      reportConfigs: [...prev.reportConfigs, newConfig],
      activeConfigId: newConfig.id,
    }));
    return newConfig;
  };

  const deleteConfig = (configId: string) => {
    if (appState.reportConfigs.length <= 1) {
      alert('至少需要保留一个报表配置');
      return;
    }
    setAppState(prev => {
      const newConfigs = prev.reportConfigs.filter(c => c.id !== configId);
      const newActiveId = prev.activeConfigId === configId ? newConfigs[0].id : prev.activeConfigId;
      return {
        reportConfigs: newConfigs,
        activeConfigId: newActiveId,
      };
    });
  };

  const saveRecord = (record: DataRecord) => {
    setCurrentRecords(prev => {
      const index = prev.findIndex(r => r.id === record.id);
      if (index >= 0) {
        const newRecords = [...prev];
        newRecords[index] = record;
        return newRecords;
      }
      return [...prev, record];
    });
  };

  return (
    <ReportContext.Provider
      value={{
        appState,
        currentConfig,
        currentRecords,
        setCurrentConfig,
        updateConfig,
        createNewConfig,
        deleteConfig,
        saveRecord,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};
