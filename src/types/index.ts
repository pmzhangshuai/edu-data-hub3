export interface HospitalData {
  [key: string]: string | number | null;
}

export interface ReportRow {
  level3: string | null;      // 三级指标
  checkPoint: string | null;  // 考核点
  standard: string | null;    // 具体标准要求（常模）
  [hospital: string]: string | number | null; // 各医院数据
}

export interface ReportSection {
  title: string;       // 分类标题
  rows: ReportRow[];   // 该分类下的行数据
}

export interface ReportData {
  hospitals: string[];   // 医院列表
  sections: ReportSection[]; // 报表各部分
}
