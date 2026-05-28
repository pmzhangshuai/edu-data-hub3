import { Indicator, Hospital, RawData, NormConfig, AppConfig, TemplateLayoutConfig } from '../types';

export const indicators: Indicator[] = [
  {
    id: 'ind_001',
    name: '教学管理科设置及人数',
    category: '组织管理与机构建设',
    dataType: 'string',
    unit: '人',
    source: 'Ⅰ-2.教学管理科'
  },
  {
    id: 'ind_002',
    name: '医院等级',
    category: '组织管理与机构建设',
    dataType: 'string',
    unit: '',
    source: 'Ⅰ-1.基本信息'
  },
  {
    id: 'ind_003',
    name: '面积',
    category: '组织管理与机构建设',
    dataType: 'number',
    unit: '万m²',
    source: 'Ⅰ-1.基本信息'
  },
  {
    id: 'ind_004',
    name: '编制床位数',
    category: '组织管理与机构建设',
    dataType: 'number',
    unit: '张',
    source: 'Ⅰ-1.基本信息'
  },
  {
    id: 'ind_005',
    name: '全院职工总数',
    category: '教学保障',
    dataType: 'number',
    unit: '人',
    source: 'Ⅱ-1.人力资源'
  },
  {
    id: 'ind_006',
    name: '教学副院长组织教学工作会议次数',
    category: '教学运行与质量评价',
    dataType: 'number',
    unit: '次',
    source: 'Ⅲ-1.教学管理'
  },
  {
    id: 'ind_007',
    name: '科研经费',
    category: '科研与学科建设',
    dataType: 'number',
    unit: '万元',
    source: 'Ⅳ-1.科研经费'
  },
  {
    id: 'ind_008',
    name: '教学病床数',
    category: '教学产出与质量',
    dataType: 'number',
    unit: '张',
    source: 'Ⅴ-1.教学条件'
  },
  {
    id: 'ind_009',
    name: '党政主要领导为本科生授课学时数',
    category: '教学运行与质量评价',
    dataType: 'number',
    unit: '学时',
    source: 'Ⅲ-1.教学管理'
  },
  {
    id: 'ind_010',
    name: '教研室设置及数量',
    category: '组织管理与机构建设',
    dataType: 'number',
    unit: '个',
    source: 'Ⅰ-3.教研室'
  }
];

export const hospitals: Hospital[] = [
  { id: 'h1', name: '二附院' },
  { id: 'h2', name: '三附院' },
  { id: 'h3', name: '附属口腔医院' }
];

export const years = [2024, 2025];

export const mockRawData: RawData = {
  'ind_001': {
    'h1': { 2024: '有(5人)', 2025: '有(5人)' },
    'h2': { 2024: '有(3人)', 2025: '有(4人)' },
    'h3': { 2024: '有(2人)', 2025: '有(2人)' }
  },
  'ind_002': {
    'h1': { 2024: '三级甲等', 2025: '三级甲等' },
    'h2': { 2024: '三级甲等', 2025: '三级甲等' },
    'h3': { 2024: '三级甲等', 2025: '三级甲等' }
  },
  'ind_003': {
    'h1': { 2024: 8.5, 2025: 8.8 },
    'h2': { 2024: 12, 2025: 12.5 },
    'h3': { 2024: 3.5, 2025: 3.5 }
  },
  'ind_004': {
    'h1': { 2024: 700, 2025: 750 },
    'h2': { 2024: 1000, 2025: 1050 },
    'h3': { 2024: 150, 2025: 150 }
  },
  'ind_005': {
    'h1': { 2024: 2200, 2025: 2350 },
    'h2': { 2024: 3500, 2025: 3600 },
    'h3': { 2024: 850, 2025: 880 }
  },
  'ind_006': {
    'h1': { 2024: 4, 2025: 5 },
    'h2': { 2024: 5, 2025: 6 },
    'h3': { 2024: 3, 2025: 3 }
  },
  'ind_007': {
    'h1': { 2024: 5000, 2025: 5500 },
    'h2': { 2024: 8000, 2025: 8500 },
    'h3': { 2024: 2000, 2025: 2200 }
  },
  'ind_008': {
    'h1': { 2024: 3, 2025: 3 },
    'h2': { 2024: 4, 2025: 4 },
    'h3': { 2024: 2, 2025: 2 }
  },
  'ind_009': {
    'h1': { 2024: 6, 2025: 6 },
    'h2': { 2024: 8, 2025: 8 },
    'h3': { 2024: 5, 2025: 5 }
  },
  'ind_010': {
    'h1': { 2024: 48, 2025: 50 },
    'h2': { 2024: 62, 2025: 65 },
    'h3': { 2024: 22, 2025: 22 }
  }
};

export const defaultNormConfigs: NormConfig[] = [
  {
    indicatorId: 'ind_001',
    normType: 'enum',
    allowedValues: ['有(5人)', '有(3人)', '有(2人)'],
    passLabel: '有(≥1人)',
    weight: 5
  },
  {
    indicatorId: 'ind_003',
    normType: 'threshold',
    operator: '≥',
    thresholdValue: 3,
    passLabel: '≥3万m²',
    weight: 5
  },
  {
    indicatorId: 'ind_006',
    normType: 'threshold',
    operator: '≥',
    thresholdValue: 2,
    passLabel: '≥2次/学期',
    weight: 10
  }
];

export const defaultLayoutConfig: TemplateLayoutConfig = {
  rowDimensions: ['indicator'],
  columnDimensions: ['hospital', 'year'],
  valueFields: ['value', 'passStatus'],
  showPassMark: true,
  showNormReference: true,
  tableStyle: {
    border: true,
    zebraStripe: true,
    fixedHeader: true
  }
};

export const defaultAppConfig: AppConfig = {
  selectedIndicators: ['ind_001', 'ind_003', 'ind_006'],
  normConfigs: defaultNormConfigs,
  layoutConfig: defaultLayoutConfig
};
