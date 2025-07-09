// Represents a single row from the parsed CSV data
export interface SurveyResponse {
  timestamp: string;
  name: string;
  age: number;
  rt_rw: string;
  knowsDisasterTypes: 'Ya' | 'Tidak'; // Q1
  knowsWarningSigns: 'Ya' | 'Tidak'; // Q2
  disasterPotency: 'Sangat rendah' | 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat tinggi'; // Q3
  hasEvacuationPlan: 'Ya' | 'Tidak'; // Q4
  hasEmergencyKit: 'Ya lengkap' | 'Sebagian ada' | 'Tidak punya sama sekali'; // Q5
  familyKnowsEvacuationPoint: 'Ya' | 'Tidak'; // Q6
  knowsEmergencyNumbers: 'Ya' | 'Tidak'; // Q7
  hasAttendedTraining: 'Ya' | 'Tidak'; // Q8
  informationSources: string[]; // Q9
  informationUsefulness: 1 | 2 | 3 | 4 | 5; // Q10
  evacuationSignsAvailable: 'Ya' | 'Tidak' | 'Tidak tahu'; // Q11
  knowsResponsiblePerson: 'Ya' | 'Tidak' | 'Tidak yakin'; // Q12
  hasCoordinatedWithNeighbours: 'Ya' | 'Tidak'; // Q13
  willingToParticipate: 'Ya' | 'Tidak'; // Q14
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

// Structure for the processed data to be displayed on the dashboard
export interface DashboardData {
  totalRespondents: number;
  averageAge: number;
  
  // Q1, Q2, Q7
  knowledge: {
    disasterTypes: ChartDataPoint[];
    warningSigns: ChartDataPoint[];
    emergencyNumbers: ChartDataPoint[];
    hasAttendedTraining: ChartDataPoint[];
  };
  
  // Q4, Q5, Q6
  planning: {
    evacuationPlan: ChartDataPoint[];
    emergencyKit: ChartDataPoint[];
    familyKnowsEvacuationPoint: ChartDataPoint[];
  };
  
  // Q3, Q9, Q11, Q12, Q13, Q14
  community: {
    disasterPotency: ChartDataPoint[];
    informationSources: ChartDataPoint[];
    evacuationSigns: ChartDataPoint[];
    knowsResponsiblePerson: ChartDataPoint[];
    coordinatedWithNeighbours: ChartDataPoint[];
    willingToParticipate: ChartDataPoint[];
  };
  
  // Q10, Q15
  feedback: {
    informationUsefulness: {
      distribution: ChartDataPoint[];
      average: number;
    };
    hopesForImprovements: {
        name: string;
        average: number;
    }[];
  };
}
