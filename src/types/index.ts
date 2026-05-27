export interface HospitalData {
  id: string;
  name: string;
  level: string;
  affiliationType: string;
  signDate: string;
  validYears: number;
  area: number;
  clinicalDepartments: number;
  wards: number;
  medicalTechDepartments: number;
  professionalBases: number;
  standardizedTrainingBases: number;
  specialistTrainingBases: number;
  approvedBeds: number;
  openBeds: number;
  internalMedicineBeds: number;
  surgeryBeds: number;
  obstetricsGynecologyBeds: number;
  pediatricsBeds: number;
  teachingBeds: number;
  keySpecialties: number;
  nationalKeySpecialties: number;
  nationalFeatureSpecialties: number;
  provincialKeySpecialties: number;
  provincialFeatureSpecialties: number;
  municipalKeySpecialties: number;
  keyDisciplines: number;
  nationalKeyDisciplines: number;
  provincialKeyDisciplines: number;
  municipalKeyDisciplines: number;
  totalEmployees: number;
  medicalTechnicians: number;
  seniorTitle: number;
  seniorTitlePositive: number;
  seniorTitleAssociate: number;
  doctors: number;
  doctorsInTraining: number;
  masters: number;
  mastersInTraining: number;
  doctoralSupervisors: number;
  masterSupervisors: number;
  totalStudents: number;
  guangyiStudents: number;
  guangyiTheoreticalStudents: number;
  zhuanshengbenStudents: number;
  undergraduateStudents: number;
  totalInterns: number;
  guangyiInterns: number;
  otherSchoolInterns: number;
  totalGraduates: number;
  totalResidents: number;
  nationalExamLevel: string;
  provincialExamLevel: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface SummaryData {
  totalHospitals: number;
  totalEmployees: number;
  totalBeds: number;
  totalStudents: number;
  avgSeniorTitleRatio: number;
  hospitalsByLevel: ChartData[];
  hospitalsByAffiliation: ChartData[];
}
