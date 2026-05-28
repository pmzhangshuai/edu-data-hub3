export interface Indicator {
  id: string;
  name: string;
  category: string;
  dataType: 'number' | 'string' | 'percent' | 'boolean';
  unit: string;
  source: string;
}

export interface Hospital {
  id: string;
  name: string;
}

export interface NormConfig {
  indicatorId: string;
  normType: 'threshold' | 'range' | 'enum';
  operator?: '≥' | '≤' | '=';
  thresholdValue?: number;
  min?: number;
  max?: number;
  allowedValues?: string[];
  passLabel: string;
  weight: number;
}

export interface TemplateLayoutConfig {
  rowDimensions: string[];
  columnDimensions: string[];
  valueFields: string[];
  showPassMark: boolean;
  showNormReference: boolean;
  tableStyle: {
    border: boolean;
    zebraStripe: boolean;
    fixedHeader: boolean;
  };
}

export interface AppConfig {
  selectedIndicators: string[];
  normConfigs: NormConfig[];
  layoutConfig: TemplateLayoutConfig;
}

export interface RawData {
  [indicatorId: string]: {
    [hospitalId: string]: {
      [year: number]: string | number;
    };
  };
}
