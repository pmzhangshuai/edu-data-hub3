import { HospitalData, SummaryData, ChartData } from '../types';
import { groupBy, sumBy, meanBy } from 'lodash';

export const processData = (data: HospitalData[]): SummaryData => {
  const totalHospitals = data.length;
  const totalEmployees = sumBy(data, 'totalEmployees');
  const totalBeds = sumBy(data, 'openBeds');
  const totalStudents = sumBy(data, 'totalStudents');
  
  const avgSeniorTitleRatio = meanBy(data, (h) => (h.seniorTitle / h.totalEmployees) * 100);
  
  const hospitalsByLevelGroup = groupBy(data, 'level');
  const hospitalsByLevel: ChartData[] = Object.entries(hospitalsByLevelGroup).map(([name, items]) => ({
    name,
    value: items.length,
  }));
  
  const hospitalsByAffiliationGroup = groupBy(data, 'affiliationType');
  const hospitalsByAffiliation: ChartData[] = Object.entries(hospitalsByAffiliationGroup).map(([name, items]) => ({
    name,
    value: items.length,
  }));
  
  return {
    totalHospitals,
    totalEmployees,
    totalBeds,
    totalStudents,
    avgSeniorTitleRatio: Math.round(avgSeniorTitleRatio * 100) / 100,
    hospitalsByLevel,
    hospitalsByAffiliation,
  };
};

export const getComparisonChartData = (data: HospitalData[]) => {
  return {
    names: data.map(h => h.name),
    employees: data.map(h => h.totalEmployees),
    beds: data.map(h => h.openBeds),
    students: data.map(h => h.totalStudents),
  };
};

export const getResourceDistributionData = (data: HospitalData[]) => {
  return [
    { name: '高级职称', value: sumBy(data, 'seniorTitle') },
    { name: '博士', value: sumBy(data, 'doctors') },
    { name: '硕士', value: sumBy(data, 'masters') },
    { name: '重点专科', value: sumBy(data, 'keySpecialties') },
  ];
};
