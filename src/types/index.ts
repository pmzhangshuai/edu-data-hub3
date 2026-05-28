export interface ColumnConfig {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface ReportRowConfig {
  id: string;
  level3?: string;
  checkPoint: string;
  standard?: string;
  calculationRule?: string;
}

export interface ReportSectionConfig {
  id: string;
  title: string;
  rows: ReportRowConfig[];
}

export interface ReportConfig {
  id: string;
  name: string;
  description?: string;
  columns: ColumnConfig[];
  sections: ReportSectionConfig[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DataRecord {
  id: string;
  [key: string]: string | number | null;
}

export interface ReportData {
  config: ReportConfig;
  records: DataRecord[];
}

export interface AppState {
  reportConfigs: ReportConfig[];
  activeConfigId: string | null;
}
