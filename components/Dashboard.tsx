"use client";

import React, { useEffect, useState } from "react";
import { getFullDashboardDataAction } from "../app/actions";
import type {
  FullDashboardData,
  DashboardAnalysis,
  DetailedRespondentScore,
  ChartData,
  SurveyResponse,
} from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- Helper Functions & Shared Components ---
const getScoreCategory = (score: number) => {
  if (score < 4)
    return {
      text: "Kurang",
      color: "bg-red-500 text-white",
      textColor: "text-error",
    };
  if (score < 7)
    return {
      text: "Cukup",
      color: "bg-amber-500 text-white",
      textColor: "text-warning",
    };
  return {
    text: "Baik",
    color: "bg-green-500 text-white",
    textColor: "text-success",
  };
};

const getRiskCategory = (level: "Tinggi" | "Sedang" | "Rendah") => {
  if (level === "Tinggi")
    return { text: "Tinggi", color: "bg-red-500 text-white" };
  if (level === "Sedang")
    return { text: "Sedang", color: "bg-amber-500 text-white" };
  return { text: "Rendah", color: "bg-green-500 text-white" };
};

const MetricCard = ({
  title,
  value,
  subValue,
  icon,
  tag,
}: {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactElement;
  tag?: React.ReactElement;
}) => (
  <div className="bg-base-100 p-5 rounded-xl shadow-sm flex-1">
    <div className="flex justify-between items-start">
      <span className="text-gray-400">{icon}</span>
      {tag}
    </div>
    <div className="mt-2">
      <p className="text-sm text-content">{title}</p>
      <p className="text-2xl font-bold text-content-strong">{value}</p>
      {subValue && <p className="text-xs text-content">{subValue}</p>}
    </div>
  </div>
);

const ProgressBar = ({
  value,
  colorClass,
}: {
  value: number;
  colorClass: string;
}) => (
  <div className="w-full bg-slate-300 rounded-full h-1.5">
    <div
      className={`${colorClass} h-1.5 rounded-full`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) => (
  <div className="bg-base-100 p-6 rounded-xl shadow-sm">
    <h3 className="font-bold text-content-strong mb-4">{title}</h3>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  </div>
);

const PIE_COLORS = {
  Ya: "#22c55e",
  Tidak: "#ef4444",
  "Ya lengkap": "#22c55e",
  "Sebagian ada": "#f59e0b",
  "Tidak punya sama sekali": "#ef4444",
};
const BAR_COLOR = "#0D9488";

// --- Tab Content Components ---

const SummaryTab = ({ data }: { data: DashboardAnalysis }) => {
  const scoreCategory = getScoreCategory(data.overallScore);

  const getPriorityArea = () => {
    const scores = [
      { name: "Pengetahuan Bencana", score: data.categoryScores.knowledge },
      { name: "Persiapan Keluarga", score: data.categoryScores.familyPrep },
      {
        name: "Keterlibatan Komunitas",
        score: data.categoryScores.communityInvolvement,
      },
    ];
    return scores.sort((a, b) => a.score - b.score)[0].name;
  };

  const overallInsight = `Tingkat kesiapsiagaan desa ${scoreCategory.text.toLowerCase()} dengan skor rata-rata ${data.overallScore.toFixed(
    1
  )}/10`;
  const priorityInsight = `${
    data.riskDistribution.high.count
  } warga memerlukan perhatian khusus, terutama pada area ${getPriorityArea()}.`;
  const successInsight = `${data.riskDistribution.low.percentage.toFixed(
    0
  )}% warga sudah siap siaga dengan baik.`;

  const riskDistributionData = [
    {
      label: "Risiko Rendah (7-10)",
      value: data.riskDistribution.low.count,
      color: "bg-green-500",
    },
    {
      label: "Risiko Sedang (4-6.9)",
      value: data.riskDistribution.medium.count,
      color: "bg-amber-500",
    },
    {
      label: "Risiko Tinggi (0-3.9)",
      value: data.riskDistribution.high.count,
      color: "bg-red-500",
    },
  ];

  const categoryScoreData = [
    {
      label: "Pengetahuan Bencana",
      value: data.categoryScores.knowledge,
      color: getScoreCategory(data.categoryScores.knowledge).color.split(
        " "
      )[0],
    },
    {
      label: "Persiapan Keluarga",
      value: data.categoryScores.familyPrep,
      color: getScoreCategory(data.categoryScores.familyPrep).color.split(
        " "
      )[0],
    },
    {
      label: "Keterlibatan Komunitas",
      value: data.categoryScores.communityInvolvement,
      color: getScoreCategory(
        data.categoryScores.communityInvolvement
      ).color.split(" ")[0],
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col sm:flex-row gap-4">
        <MetricCard
          title="Total Responden"
          value={data.totalRespondents.toString()}
          subValue="Warga yang disurvei"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
        <MetricCard
          title="Skor Kesiapsiagaan"
          value={`${data.overallScore.toFixed(1)}/10`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
          tag={
            <span
              className={`px-3 py-2 text-xs font-semibold rounded-full ${scoreCategory.color}`}
            >
              {scoreCategory.text}
            </span>
          }
        />
        <MetricCard
          title="Risiko Tinggi"
          value={data.riskDistribution.high.count.toString()}
          subValue={`${data.riskDistribution.high.percentage.toFixed(
            1
          )}% dari total`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
        <MetricCard
          title="Risiko Rendah"
          value={data.riskDistribution.low.count.toString()}
          subValue="Siap siaga baik"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-content-strong mb-4">
            Distribusi Tingkat Kesiapsiagaan
          </h3>
          <div className="space-y-4">
            {riskDistributionData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-content">{item.label}</span>
                  <span className="font-semibold text-content-strong">
                    {item.value} warga
                  </span>
                </div>
                <ProgressBar
                  value={(item.value / data.totalRespondents) * 100}
                  colorClass={item.color}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-content-strong mb-4">
            Skor Berdasarkan Kategori
          </h3>
          <div className="space-y-4">
            {categoryScoreData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-content">{item.label}</span>
                  <span className="font-semibold text-content-strong">
                    {item.value.toFixed(1)}/10
                  </span>
                </div>
                <ProgressBar value={item.value * 10} colorClass={item.color} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-content-strong mb-4">Insight Utama</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-blue-500"></span>
              <div>
                <h4 className="font-semibold text-content-strong">
                  Kesiapsiagaan Keseluruhan
                </h4>
                <p className="text-content text-lg">{overallInsight}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-red-500"></span>
              <div>
                <h4 className="font-semibold text-content-strong">
                  Area Prioritas
                </h4>
                <p className="text-content text-lg">{priorityInsight}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-green-500"></span>
              <div>
                <h4 className="font-semibold text-content-strong">
                  Tingkat Keberhasilan
                </h4>
                <p className="text-content text-lg">{successInsight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartsAnalysisTab = ({ data }: { data: ChartData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <ChartCard title="Distribusi Usia Responden">
      <BarChart
        data={data.ageDistribution}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip wrapperClassName="!bg-base-100 !border-slate-200 !rounded-md" />
        <Bar
          dataKey="value"
          name="Jumlah"
          fill={BAR_COLOR}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartCard>
    <ChartCard title="Sumber Informasi Utama">
      <BarChart
        data={data.infoSources}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip wrapperClassName="!bg-base-100 !border-slate-200 !rounded-md" />
        <Bar
          dataKey="value"
          name="Jumlah"
          fill={BAR_COLOR}
          radius={[0, 4, 4, 0]}
          background={{ fill: "#f1f5f9" }}
        />
      </BarChart>
    </ChartCard>
    <ChartCard title="Status Perlengkapan Darurat">
      <PieChart>
        <Pie
          data={data.emergencyKits}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.emergencyKits.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]}
            />
          ))}
        </Pie>
        <Tooltip wrapperClassName="!bg-base-100 !border-slate-200 !rounded-md" />
      </PieChart>
    </ChartCard>
    <ChartCard title="Keikutsertaan dalam Pelatihan">
      <PieChart>
        <Pie
          data={data.willingnessToParticipate}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.willingnessToParticipate.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]}
            />
          ))}
        </Pie>
        <Tooltip wrapperClassName="!bg-base-100 !border-slate-200 !rounded-md" />
      </PieChart>
    </ChartCard>
  </div>
);

const ScoreAnalysisTab = ({ data }: { data: DetailedRespondentScore[] }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow-sm">
    <h3 className="font-bold text-content-strong mb-4">
      Analisis Skor per Responden
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-content">
        <thead className="text-xs text-content-strong uppercase bg-base-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID Responden
            </th>
            <th scope="col" className="px-6 py-3">
              Skor Pengetahuan
            </th>
            <th scope="col" className="px-6 py-3">
              Skor Keluarga
            </th>
            <th scope="col" className="px-6 py-3">
              Skor Komunitas
            </th>
            <th scope="col" className="px-6 py-3">
              Skor Total
            </th>
            <th scope="col" className="px-6 py-3">
              Tingkat Risiko
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const risk = getRiskCategory(item.riskLevel);
            return (
              <tr
                key={item.id}
                className="bg-base-100 border-b border-base-200"
              >
                <td className="px-6 py-4 font-medium text-content-strong">
                  Responden #{item.id}
                </td>
                <td className="px-6 py-4">
                  {item.scores.knowledge.toFixed(1)}
                </td>
                <td className="px-6 py-4">
                  {item.scores.familyPrep.toFixed(1)}
                </td>
                <td className="px-6 py-4">
                  {item.scores.communityInvolvement.toFixed(1)}
                </td>
                <td className="px-6 py-4 font-bold">
                  {item.overallScore.toFixed(1)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${risk.color}`}
                  >
                    {risk.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const RawDataTab = ({ data }: { data: SurveyResponse[] }) => {
  if (!data || data.length === 0)
    return (
      <div className="text-center text-content">
        Tidak ada data mentah untuk ditampilkan.
      </div>
    );
  const headers = Object.keys(data[0]);
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-sm">
      <h3 className="font-bold text-content-strong mb-4">Data Mentah Survei</h3>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-content">
          <thead className="text-xs text-content-strong uppercase bg-base-200 sticky top-0">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="px-6 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="bg-base-100 border-b border-base-200">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap">
                    {Array.isArray(row[header as keyof SurveyResponse])
                      ? (
                          row[
                            header as keyof SurveyResponse
                          ] as unknown as string[]
                        ).join(", ")
                      : row[header as keyof SurveyResponse]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TabNavigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    "Ringkasan",
    "Grafik & Analisis",
    "Analisis Skor",
    "Data Mentah",
  ];
  return (
    <div className="mb-6 border-b border-slate-200">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 ${
              activeTab === tab
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-content hover:text-content-strong hover:border-slate-300"
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export const Dashboard = () => {
  const [data, setData] = useState<FullDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Ringkasan");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await getFullDashboardDataAction();
        if (result.data) {
          setData(result.data);
        } else {
          setError(result.error || "Gagal mengambil data dasbor.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan tidak diketahui."
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const renderContent = () => {
    if (loading)
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
      );
    if (error)
      return (
        <div className="text-center text-error bg-red-100 p-4 rounded-md">
          {error}
        </div>
      );
    if (!data)
      return (
        <div className="text-center text-content">
          Tidak ada data untuk ditampilkan.
        </div>
      );

    switch (activeTab) {
      case "Ringkasan":
        return <SummaryTab data={data.analysis} />;
      case "Grafik & Analisis":
        return <ChartsAnalysisTab data={data.charts} />;
      case "Analisis Skor":
        return <ScoreAnalysisTab data={data.detailedScores} />;
      case "Data Mentah":
        return <RawDataTab data={data.rawData} />;
      default:
        return <SummaryTab data={data.analysis} />;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};
