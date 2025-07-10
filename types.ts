// Represents a single row from the parsed CSV data
export interface SurveyResponse {
  timestamp: string;
  name: string;
  age: number;
  rt_rw: string;
  knowsDisasterTypes: "Ya" | "Tidak"; // Q1
  knowsWarningSigns: "Ya" | "Tidak"; // Q2
  disasterPotency:
    | "Sangat rendah"
    | "Rendah"
    | "Sedang"
    | "Tinggi"
    | "Sangat tinggi"; // Q3
  hasEvacuationPlan: "Ya" | "Tidak"; // Q4
  hasEmergencyKit: "Ya lengkap" | "Sebagian ada" | "Tidak punya sama sekali"; // Q5
  familyKnowsEvacuationPoint: "Ya" | "Tidak"; // Q6
  knowsEmergencyNumbers: "Ya" | "Tidak"; // Q7
  hasAttendedTraining: "Ya" | "Tidak"; // Q8
  informationSources: string[]; // Q9
  informationUsefulness: 1 | 2 | 3 | 4 | 5; // Q10
  evacuationSignsAvailable: "Ya" | "Tidak" | "Tidak tahu"; // Q11
  knowsResponsiblePerson: "Ya" | "Tidak" | "Tidak yakin"; // Q12
  hasCoordinatedWithNeighbours: "Ya" | "Tidak"; // Q13
  willingToParticipate: "Ya" | "Tidak"; // Q14
  hopeFirstAidTraining: 1 | 2 | 3 | 4 | 5; // Q15.1
  hopeEvacuationInfo: 1 | 2 | 3 | 4 | 5; // Q15.2
  hopeDisasterTeam: 1 | 2 | 3 | 4 | 5; // Q15.3
  hopeEmergencyEquipment: 1 | 2 | 3 | 4 | 5; // Q15.4
}

// Data point for charts (e.g., { name: 'Yes', value: 25 })
export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ScoreByCategory {
  knowledge: number;
  familyPrep: number;
  communityInvolvement: number;
}

export interface RiskDistribution {
  high: { count: number; percentage: number };
  medium: { count: number; percentage: number };
  low: { count: number; percentage: number };
}

export interface DashboardAnalysis {
  totalRespondents: number;
  overallScore: number;
  riskDistribution: RiskDistribution;
  categoryScores: ScoreByCategory;
}

export interface DetailedRespondentScore {
  id: number;
  overallScore: number;
  riskLevel: "Tinggi" | "Sedang" | "Rendah";
  scores: {
    knowledge: number;
    familyPrep: number;
    communityInvolvement: number;
  };
}

export interface ChartData {
  ageDistribution: ChartDataPoint[];
  infoSources: ChartDataPoint[];
  emergencyKits: ChartDataPoint[];
  willingnessToParticipate: ChartDataPoint[];
}

export interface FullDashboardData {
  analysis: DashboardAnalysis;
  rawData: SurveyResponse[];
  detailedScores: DetailedRespondentScore[];
  charts: ChartData;
}
