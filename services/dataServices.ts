import { promises as fs } from "fs";
import path from "path";
import {
  SurveyResponse,
  FullDashboardData,
  ScoreByCategory,
  RiskDistribution,
  DetailedRespondentScore,
  ChartData,
  ChartDataPoint,
} from "../types";
import { parse } from "csv-parse/sync";

const parseSurveyData = (csv: string): SurveyResponse[] => {
  const raw = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as any[];

  return raw.map((entry) => ({
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
    informationSources:
      typeof entry.informationSources === "string"
        ? entry.informationSources
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    informationUsefulness: parseInt(entry.informationUsefulness, 10),
    evacuationSignsAvailable: entry.evacuationSignsAvailable,
    knowsResponsiblePerson: entry.knowsResponsiblePerson,
    hasCoordinatedWithNeighbours: entry.hasCoordinatedWithNeighbours,
    willingToParticipate: entry.willingToParticipate,
    hopeFirstAidTraining: parseInt(entry.hopeFirstAidTraining, 10),
    hopeEvacuationInfo: parseInt(entry.hopeEvacuationInfo, 10),
    hopeDisasterTeam: parseInt(entry.hopeDisasterTeam, 10),
    hopeEmergencyEquipment: parseInt(entry.hopeEmergencyEquipment, 10),
  })) as SurveyResponse[];
};

const processSurveyData = (data: SurveyResponse[]): FullDashboardData => {
  const totalRespondents = data.length;
  if (totalRespondents === 0) {
    return {
      analysis: {
        totalRespondents: 0,
        overallScore: 0,
        riskDistribution: {
          high: { count: 0, percentage: 0 },
          medium: { count: 0, percentage: 0 },
          low: { count: 0, percentage: 0 },
        },
        categoryScores: {
          knowledge: 0,
          familyPrep: 0,
          communityInvolvement: 0,
        },
      },
      rawData: [],
      detailedScores: [],
      charts: {
        ageDistribution: [],
        infoSources: [],
        emergencyKits: [],
        willingnessToParticipate: [],
      },
    };
  }

  // Calculate individual scores
  const individualScores = data.map((respondent) => {
    const scores = { knowledge: 0, familyPrep: 0, communityInvolvement: 0 };
    if (respondent.knowsDisasterTypes === "Ya") scores.knowledge += 1;
    if (respondent.knowsWarningSigns === "Ya") scores.knowledge += 1;
    if (respondent.knowsEmergencyNumbers === "Ya") scores.knowledge += 1;
    if (respondent.hasEvacuationPlan === "Ya") scores.familyPrep += 1;
    if (respondent.familyKnowsEvacuationPoint === "Ya") scores.familyPrep += 1;
    if (respondent.hasEmergencyKit === "Ya lengkap") scores.familyPrep += 1;
    else if (respondent.hasEmergencyKit === "Sebagian ada")
      scores.familyPrep += 0.5;
    if (respondent.hasAttendedTraining === "Ya")
      scores.communityInvolvement += 1;
    if (respondent.hasCoordinatedWithNeighbours === "Ya")
      scores.communityInvolvement += 1;
    if (respondent.knowsResponsiblePerson === "Ya")
      scores.communityInvolvement += 1;

    const totalPoints =
      scores.knowledge + scores.familyPrep + scores.communityInvolvement;
    return {
      knowledgeScore: (scores.knowledge / 3) * 10,
      familyPrepScore: (scores.familyPrep / 3) * 10,
      communityInvolvementScore: (scores.communityInvolvement / 3) * 10,
      overallScore: (totalPoints / 9) * 10,
    };
  });

  // Aggregate for summary
  const aggregate = individualScores.reduce(
    (acc, scores) => {
      acc.totalOverallScore += scores.overallScore;
      acc.totalKnowledgeScore += scores.knowledgeScore;
      acc.totalFamilyPrepScore += scores.familyPrepScore;
      acc.totalCommunityInvolvementScore += scores.communityInvolvementScore;
      if (scores.overallScore < 4) acc.riskCounts.high += 1;
      else if (scores.overallScore < 7) acc.riskCounts.medium += 1;
      else acc.riskCounts.low += 1;
      return acc;
    },
    {
      totalOverallScore: 0,
      totalKnowledgeScore: 0,
      totalFamilyPrepScore: 0,
      totalCommunityInvolvementScore: 0,
      riskCounts: { high: 0, medium: 0, low: 0 },
    }
  );

  const analysis = {
    totalRespondents,
    overallScore: aggregate.totalOverallScore / totalRespondents,
    categoryScores: {
      knowledge: aggregate.totalKnowledgeScore / totalRespondents,
      familyPrep: aggregate.totalFamilyPrepScore / totalRespondents,
      communityInvolvement:
        aggregate.totalCommunityInvolvementScore / totalRespondents,
    },
    riskDistribution: {
      high: {
        count: aggregate.riskCounts.high,
        percentage: (aggregate.riskCounts.high / totalRespondents) * 100,
      },
      medium: {
        count: aggregate.riskCounts.medium,
        percentage: (aggregate.riskCounts.medium / totalRespondents) * 100,
      },
      low: {
        count: aggregate.riskCounts.low,
        percentage: (aggregate.riskCounts.low / totalRespondents) * 100,
      },
    },
  };

  const detailedScores: DetailedRespondentScore[] = individualScores.map(
    (score, index) => {
      let riskLevel: "Tinggi" | "Sedang" | "Rendah";
      if (score.overallScore < 4) riskLevel = "Tinggi";
      else if (score.overallScore < 7) riskLevel = "Sedang";
      else riskLevel = "Rendah";
      return {
        id: index + 1,
        overallScore: score.overallScore,
        riskLevel,
        scores: {
          knowledge: score.knowledgeScore,
          familyPrep: score.familyPrepScore,
          communityInvolvement: score.communityInvolvementScore,
        },
      };
    }
  );

  // Process for charts
  const ageBuckets = {
    "<21": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51-60": 0,
    ">60": 0,
  };
  const sourceCounts = new Map<string, number>();
  const kitCounts = {
    "Ya lengkap": 0,
    "Sebagian ada": 0,
    "Tidak punya sama sekali": 0,
  };
  const willingnessCounts = { Ya: 0, Tidak: 0 };

  data.forEach((r) => {
    if (r.age < 21) ageBuckets["<21"]++;
    else if (r.age <= 30) ageBuckets["21-30"]++;
    else if (r.age <= 40) ageBuckets["31-40"]++;
    else if (r.age <= 50) ageBuckets["41-50"]++;
    else if (r.age <= 60) ageBuckets["51-60"]++;
    else ageBuckets[">60"]++;

    r.informationSources.forEach((source) =>
      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1)
    );
    kitCounts[r.hasEmergencyKit]++;
    willingnessCounts[r.willingToParticipate]++;
  });

  const charts: ChartData = {
    ageDistribution: Object.entries(ageBuckets).map(([name, value]) => ({
      name,
      value,
    })),
    infoSources: Array.from(sourceCounts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value),
    emergencyKits: Object.entries(kitCounts).map(([name, value]) => ({
      name,
      value,
    })),
    willingnessToParticipate: Object.entries(willingnessCounts).map(
      ([name, value]) => ({ name, value })
    ),
  };

  return { analysis, rawData: data, detailedScores, charts };
};

export const fetchFullDashboardData = async (): Promise<FullDashboardData> => {
  try {
    const filePath = path.join(process.cwd(), "data", "survey_data.csv");
    const csvData = await fs.readFile(filePath, "utf8");
    const parsedData = parseSurveyData(csvData);
    const fullData = processSurveyData(parsedData);
    return fullData;
  } catch (error) {
    console.error("Error reading or processing survey data:", error);
    throw new Error("Failed to load dashboard data.");
  }
};
