import { promises as fs } from 'fs';
import path from 'path';
import { SurveyResponse, DashboardData, ChartDataPoint } from '../types';

const parseSurveyData = (csv: string): SurveyResponse[] => {
  const lines = csv.trim().split('\n');
  const header = lines.shift()?.split(',') || [];
  
  return lines.map(line => {
    const values = line.split(',');
    const entry: any = {};
    header.forEach((key, index) => {
      // Handle quoted strings with semicolons
      if (values[index] && values[index].startsWith('"')) {
        entry[key.trim()] = values[index].replace(/"/g, '');
      } else {
        entry[key.trim()] = values[index] ? values[index].trim() : '';
      }
    });

    return {
      timestamp: entry.timestamp,
      name: entry.name,
      age: parseInt(entry.age, 10),
      rt_rw: entry.rt_rw,
      knowsDisasterTypes: entry.knowsDisasterTypes,
      knowsWarningSigns: entry.knowsWarningSigns,
      disasterPotency: entry.disasterPotency,
      hasEvacuationPlan: entry.hasEvacuationPlan,
      hasEmergencyKit: entry.hasEmergencyKit,
      familyKnowsEvacuationPoint: entry.familyKnowsEvacuationPoint,
      knowsEmergencyNumbers: entry.knowsEmergencyNumbers,
      hasAttendedTraining: entry.hasAttendedTraining,
      informationSources: entry.informationSources.split(';').map((s: string) => s.trim()).filter(Boolean),
      informationUsefulness: parseInt(entry.informationUsefulness, 10),
      evacuationSignsAvailable: entry.evacuationSignsAvailable,
      knowsResponsiblePerson: entry.knowsResponsiblePerson,
      hasCoordinatedWithNeighbours: entry.hasCoordinatedWithNeighbours,
      willingToParticipate: entry.willingToParticipate,
      hopeFirstAidTraining: parseInt(entry.hopeFirstAidTraining, 10),
      hopeEvacuationInfo: parseInt(entry.hopeEvacuationInfo, 10),
      hopeDisasterTeam: parseInt(entry.hopeDisasterTeam, 10),
      hopeEmergencyEquipment: parseInt(entry.hopeEmergencyEquipment, 10),
    } as SurveyResponse;
  });
};

const processDataForDashboard = (data: SurveyResponse[]): DashboardData => {
  const totalRespondents = data.length;

  const countOccurrences = (key: keyof SurveyResponse) =>
    data.reduce((acc, r) => {
      const value = r[key] as string;
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const toChartData = (obj: Record<string, number>): ChartDataPoint[] =>
    Object.entries(obj).map(([name, value]) => ({ name, value }));

  const calculateAverage = (key: keyof SurveyResponse) =>
    data.reduce((sum, r) => sum + (r[key] as number), 0) / totalRespondents;
    
  const getRatingDistribution = (key: keyof SurveyResponse) => {
     const dist = data.reduce((acc, r) => {
        const rating = (r[key] as number).toString();
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
     }, {} as Record<string, number>);
     return toChartData(dist).sort((a,b) => parseInt(a.name) - parseInt(b.name));
  }

  const disasterPotencyOrder = ['Sangat rendah', 'Rendah', 'Sedang', 'Tinggi', 'Sangat tinggi'];
  const emergencyKitOrder = ['Tidak punya sama sekali', 'Sebagian ada', 'Ya lengkap'];

  return {
    totalRespondents,
    averageAge: parseFloat((data.reduce((sum, r) => sum + r.age, 0) / totalRespondents).toFixed(1)),
    knowledge: {
      disasterTypes: toChartData(countOccurrences('knowsDisasterTypes')),
      warningSigns: toChartData(countOccurrences('knowsWarningSigns')),
      emergencyNumbers: toChartData(countOccurrences('knowsEmergencyNumbers')),
      hasAttendedTraining: toChartData(countOccurrences('hasAttendedTraining')),
    },
    planning: {
      evacuationPlan: toChartData(countOccurrences('hasEvacuationPlan')),
      emergencyKit: toChartData(countOccurrences('hasEmergencyKit')).sort((a,b) => emergencyKitOrder.indexOf(a.name) - emergencyKitOrder.indexOf(b.name)),
      familyKnowsEvacuationPoint: toChartData(countOccurrences('familyKnowsEvacuationPoint')),
    },
    community: {
      disasterPotency: toChartData(countOccurrences('disasterPotency')).sort((a,b) => disasterPotencyOrder.indexOf(a.name) - disasterPotencyOrder.indexOf(b.name)),
      informationSources: toChartData(data.flatMap(r => r.informationSources).reduce((acc, source) => {
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)).sort((a,b) => b.value - a.value),
      evacuationSigns: toChartData(countOccurrences('evacuationSignsAvailable')),
      knowsResponsiblePerson: toChartData(countOccurrences('knowsResponsiblePerson')),
      coordinatedWithNeighbours: toChartData(countOccurrences('hasCoordinatedWithNeighbours')),
      willingToParticipate: toChartData(countOccurrences('willingToParticipate')),
    },
    feedback: {
      informationUsefulness: {
        distribution: getRatingDistribution('informationUsefulness'),
        average: parseFloat(calculateAverage('informationUsefulness').toFixed(1)),
      },
      hopesForImprovements: [
        { name: 'Pelatihan P3K', average: parseFloat(calculateAverage('hopeFirstAidTraining').toFixed(1)) },
        { name: 'Info/Rambu Evakuasi', average: parseFloat(calculateAverage('hopeEvacuationInfo').toFixed(1)) },
        { name: 'Tim Khusus Bencana', average: parseFloat(calculateAverage('hopeDisasterTeam').toFixed(1)) },
        { name: 'Peralatan Darurat', average: parseFloat(calculateAverage('hopeEmergencyEquipment').toFixed(1)) },
      ].sort((a,b) => b.average - a.average),
    },
  };
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    // Construct path to the CSV file in the `data` directory
    const filePath = path.join(process.cwd(), 'data', 'survey_data.csv');
    // Read the file content
    const csvData = await fs.readFile(filePath, 'utf8');
    // Parse and process the data
    const parsedData = parseSurveyData(csvData);
    const dashboardData = processDataForDashboard(parsedData);
    return dashboardData;
  } catch (error) {
    console.error("Error reading or processing survey data:", error);
    // In a real app, you might want to throw a more specific error
    // or return a default/empty state.
    throw new Error('Failed to load dashboard data.');
  }
};
