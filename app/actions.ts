"use server";

import { promises as fs } from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import type { DashboardData, SurveyResponse, ChartDataPoint } from "../types";

// --- Logic from services/dataService.ts is now here ---

const parseSurveyData = (csv: string): SurveyResponse[] => {
  const lines = csv.trim().split("\n");
  const header = lines.shift()?.split(",") || [];

  return lines
    .map((line) => {
      const values = line.split(",");
      const entry: any = {};
      header.forEach((key, index) => {
        // Handle quoted strings with semicolons
        if (values[index] && values[index].startsWith('"')) {
          entry[key.trim()] = values[index].replace(/"/g, "");
        } else {
          entry[key.trim()] = values[index] ? values[index].trim() : "";
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
        informationSources: entry.informationSources
          .split(";")
          .map((s: string) => s.trim())
          .filter(Boolean),
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
    })
    .filter((r) => r.name && !isNaN(r.age)); // Filter out any bad/empty rows
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
    return toChartData(dist).sort(
      (a, b) => parseInt(a.name) - parseInt(b.name)
    );
  };

  const disasterPotencyOrder = [
    "Sangat rendah",
    "Rendah",
    "Sedang",
    "Tinggi",
    "Sangat tinggi",
  ];
  const emergencyKitOrder = [
    "Tidak punya sama sekali",
    "Sebagian ada",
    "Ya lengkap",
  ];

  return {
    totalRespondents,
    averageAge: parseFloat(
      (data.reduce((sum, r) => sum + r.age, 0) / totalRespondents).toFixed(1)
    ),
    knowledge: {
      disasterTypes: toChartData(countOccurrences("knowsDisasterTypes")),
      warningSigns: toChartData(countOccurrences("knowsWarningSigns")),
      emergencyNumbers: toChartData(countOccurrences("knowsEmergencyNumbers")),
      hasAttendedTraining: toChartData(countOccurrences("hasAttendedTraining")),
    },
    planning: {
      evacuationPlan: toChartData(countOccurrences("hasEvacuationPlan")),
      emergencyKit: toChartData(countOccurrences("hasEmergencyKit")).sort(
        (a, b) =>
          emergencyKitOrder.indexOf(a.name) - emergencyKitOrder.indexOf(b.name)
      ),
      familyKnowsEvacuationPoint: toChartData(
        countOccurrences("familyKnowsEvacuationPoint")
      ),
    },
    community: {
      disasterPotency: toChartData(countOccurrences("disasterPotency")).sort(
        (a, b) =>
          disasterPotencyOrder.indexOf(a.name) -
          disasterPotencyOrder.indexOf(b.name)
      ),
      informationSources: toChartData(
        data
          .flatMap((r) => r.informationSources)
          .reduce((acc, source) => {
            acc[source] = (acc[source] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
      ).sort((a, b) => b.value - a.value),
      evacuationSigns: toChartData(
        countOccurrences("evacuationSignsAvailable")
      ),
      knowsResponsiblePerson: toChartData(
        countOccurrences("knowsResponsiblePerson")
      ),
      coordinatedWithNeighbours: toChartData(
        countOccurrences("hasCoordinatedWithNeighbours")
      ),
      willingToParticipate: toChartData(
        countOccurrences("willingToParticipate")
      ),
    },
    feedback: {
      informationUsefulness: {
        distribution: getRatingDistribution("informationUsefulness"),
        average: parseFloat(
          calculateAverage("informationUsefulness").toFixed(1)
        ),
      },
      hopesForImprovements: [
        {
          name: "Pelatihan P3K",
          average: parseFloat(
            calculateAverage("hopeFirstAidTraining").toFixed(1)
          ),
        },
        {
          name: "Info/Rambu Evakuasi",
          average: parseFloat(
            calculateAverage("hopeEvacuationInfo").toFixed(1)
          ),
        },
        {
          name: "Tim Khusus Bencana",
          average: parseFloat(calculateAverage("hopeDisasterTeam").toFixed(1)),
        },
        {
          name: "Peralatan Darurat",
          average: parseFloat(
            calculateAverage("hopeEmergencyEquipment").toFixed(1)
          ),
        },
      ].sort((a, b) => b.average - a.average),
    },
  };
};

const fetchDashboardData = async (): Promise<DashboardData> => {
  const filePath = path.join(process.cwd(), "data", "survey_data.csv");
  const csvData = await fs.readFile(filePath, "utf8");
  const parsedData = parseSurveyData(csvData);
  const dashboardData = processDataForDashboard(parsedData);
  return dashboardData;
};

// --- Action to be called from the client ---

export async function getDashboardDataAction(): Promise<{
  data: DashboardData | null;
  error: string | null;
}> {
  try {
    const dashboardData = await fetchDashboardData();
    return { data: dashboardData, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred";
    console.error("Error in getDashboardDataAction:", e);
    return { data: null, error: "Gagal memuat data dasbor." };
  }
}

export async function generateRecommendationAction(
  dashboardData: DashboardData | null
): Promise<{ data: string | null; error: string | null }> {
  if (!dashboardData) {
    return { data: null, error: "Data dasbor tidak tersedia." };
  }

  // API Key is securely accessed from server environment variables
  if (!process.env.API_KEY) {
    console.error("API key is not configured.");
    return {
      data: null,
      error: "Konfigurasi server tidak lengkap. Kunci API tidak ditemukan.",
    };
  }

  const prompt = `
    Anda adalah seorang konsultan ahli kesiapsiagaan bencana untuk komunitas di Indonesia.
    Berdasarkan ringkasan data survei berikut, berikan 3-5 rekomendasi yang bisa langsung ditindaklanjuti, singkat, dan terprioritaskan untuk seluruh warga target dari kuesioner.
    Rekomendasi harus mudah dipahami dan diimplementasikan bagi warga yang masih awam mengenai kesiapan dalam menghadapi bencana.
    Format output sebagai daftar poin menggunakan tanda bintang (*). Jangan gunakan format lain.

    Berikut ringkasan datanya:
    - Total Responden: ${dashboardData.totalRespondents}
    - Rata-rata Usia: ${dashboardData.averageAge} tahun
    - Celah Pengetahuan:
      - Mengetahui Jenis Bencana: Hanya ${
        dashboardData.knowledge.disasterTypes.find((d) => d.name === "Ya")
          ?.value || 0
      } dari ${dashboardData.totalRespondents} responden yang tahu.
      - Mengetahui Tanda Peringatan: Hanya ${
        dashboardData.knowledge.warningSigns.find((d) => d.name === "Ya")
          ?.value || 0
      } dari ${dashboardData.totalRespondents} responden yang tahu.
    - Perencanaan & Kesiapan:
      - Memiliki Rencana Evakuasi: Hanya ${
        dashboardData.planning.evacuationPlan.find((d) => d.name === "Ya")
          ?.value || 0
      } dari ${dashboardData.totalRespondents} responden yang punya.
      - Status Tas Siaga (Lengkap): Hanya ${
        dashboardData.planning.emergencyKit.find((d) => d.name === "Ya lengkap")
          ?.value || 0
      } responden.
    - Komunitas & Koordinasi:
      - Berkoordinasi dengan Tetangga: Hanya ${
        dashboardData.community.coordinatedWithNeighbours.find(
          (d) => d.name === "Ya"
        )?.value || 0
      } responden.
    - Harapan Utama Komunitas: ${
      dashboardData.feedback.hopesForImprovements[0]?.name || "Tidak ada"
    } (Skor: ${
    dashboardData.feedback.hopesForImprovements[0]?.average.toFixed(1) || "N/A"
  }/5).
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return { data: response.text ?? null, error: null };
  } catch (e) {
    console.error("Error generating recommendation:", e);
    return {
      data: null,
      error:
        "Maaf, terjadi kesalahan saat menghasilkan rekomendasi. Silakan coba lagi nanti.",
    };
  }
}
