"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DashboardData, ChartDataPoint } from "../types";
import {
  getDashboardDataAction,
  generateRecommendationAction,
} from "../app/actions";

const CHART_COLORS = [
  "#0D9488",
  "#F97316",
  "#0891B2",
  "#F59E0B",
  "#155E75",
  "#EA580C",
];
const PIE_COLORS: { [key: string]: string } = {
  Ya: "#0D9488",
  Tidak: "#F97316",
  "Ya lengkap": "#0D9488",
  "Sebagian ada": "#F59E0B",
  "Tidak punya sama sekali": "#EF4444",
  "Tidak tahu": "#A1A1AA",
  "Tidak yakin": "#A1A1AA",
};

const CustomTooltipComponent: React.FC<{
  active?: boolean;
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value =
      data.payload.average !== undefined
        ? data.payload.average.toFixed(1)
        : data.value;
    const name = data.name || data.payload.name;
    const unit = data.payload.average !== undefined ? " / 5" : "";
    return (
      <div className="p-2 bg-base-100/90 backdrop-blur-sm border border-base-300 rounded-lg shadow-lg text-sm transition-all">
        <p className="font-bold text-content-strong mb-1">{label || name}</p>
        <p className="text-content">{`${payload[0].name}: ${value}${unit}`}</p>
      </div>
    );
  }
  return null;
};

const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <div
    className={`bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 flex flex-col h-full ${className}`}
  >
    <h3 className="text-base sm:text-lg font-semibold text-content-strong mb-4">
      {title}
    </h3>
    <div className="flex-grow w-full h-64 sm:h-72">{children}</div>
  </div>
);

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}> = ({ title, value, icon, className }) => (
  <div
    className={`bg-base-100 rounded-xl shadow-md p-5 flex items-center space-x-4 ${className}`}
  >
    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
      {icon}
    </div>
    <div>
      <p className="text-sm text-content">{title}</p>
      <p className="text-2xl font-bold text-content-strong">{value}</p>
    </div>
  </div>
);

const SimplePieChart: React.FC<{ data: ChartDataPoint[]; title: string }> = ({
  data,
  title,
}) => (
  <ChartCard title={title}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          outerRadius="85%"
          innerRadius="50%"
          fill="#8884d8"
          dataKey="value"
          paddingAngle={3}
        >
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={PIE_COLORS[entry.name] || "#cccccc"}
              className="focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltipComponent />} />
        <Legend
          iconSize={10}
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  </ChartCard>
);

const AiRecommendation: React.FC<{
  data: DashboardData;
  onGenerate: (data: DashboardData) => void;
  recommendation: string;
  isLoading: boolean;
  error: string;
}> = ({ data, onGenerate, recommendation, isLoading, error }) => {
  const formattedRecommendation = recommendation
    ? recommendation
        .split("\n")
        .filter((line) => line.trim().length > 0 && line.startsWith("* "))
        .map((line) => line.replace("* ", "").trim())
    : [];

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-brand-secondary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
        <h3 className="text-2xl font-bold text-content-strong">
          Rekomendasi Cerdas (AI)
        </h3>
      </div>
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        {!recommendation && !isLoading && !error && (
          <div className="text-center">
            <p className="mb-4 text-content">
              Dapatkan rekomendasi yang dipersonalisasi berdasarkan data survei
              untuk meningkatkan kesiapsiagaan komunitas Anda.
            </p>
            <button
              onClick={() => onGenerate(data)}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-900 bg-brand-secondary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-all disabled:bg-gray-400"
            >
              {isLoading ? "Menganalisis..." : "Dapatkan Rekomendasi AI"}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-secondary"></div>
          </div>
        )}

        {error && <p className="text-center text-error">{error}</p>}

        {recommendation && !isLoading && (
          <div>
            <h4 className="font-semibold text-content-strong mb-3">
              Berikut adalah beberapa langkah yang disarankan:
            </h4>
            <ul className="list-disc list-outside space-y-2 pl-5 text-content">
              {formattedRecommendation.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await getDashboardDataAction();
        if (result.data) {
          setData(result.data);
        } else {
          console.error("Gagal mengambil data dasbor:", result.error);
        }
      } catch (error) {
        console.error("Gagal mengambil data dasbor:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleGenerateRecommendation = async (
    dashboardData: DashboardData | null
  ) => {
    if (!dashboardData) return;

    setIsAiLoading(true);
    setAiError("");
    setAiRecommendation("");

    const result = await generateRecommendationAction(dashboardData);

    if (result.error) {
      console.error("Error generating recommendation:", result.error);
      setAiError(result.error);
    } else if (result.data) {
      setAiRecommendation(result.data);
    }

    setIsAiLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-error">Gagal memuat data dasbor.</div>
    );
  }

  const participationInfo = data.community.willingToParticipate.find(
    (i) => i.name === "Ya"
  );
  const participationValue = participationInfo ? participationInfo.value : 0;
  const participationPercentage =
    data.totalRespondents > 0
      ? Math.round((participationValue / data.totalRespondents) * 100)
      : 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-content-strong sm:text-4xl tracking-tight">
          Dashboard Kesiapsiagaan
        </h2>
        <p className="mt-3 text-lg text-content max-w-2xl mx-auto">
          Wawasan dari hasil survei {data.totalRespondents} responden di
          komunitas.
        </p>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Responden"
          value={`${data.totalRespondents}`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.375 3.375 0 019 12.25c0-1.03.39-1.983 1.057-2.748M15 10.5a3.375 3.375 0 01-3.375 3.375c-1.03 0-1.983-.39-2.748-1.057M9 12.25a3.375 3.375 0 01-3.375-3.375c0-1.03.39-1.983 1.057-2.748M15 10.5a3.375 3.375 0 013.375-3.375c1.03 0 1.983.39 2.748 1.057M9 12.25L4.5 8.25m0 0l4.5 4.5m-4.5-4.5L1.5 12l3-3.75m15 0l-4.5 4.5m4.5-4.5l3 3.75-3 3.75M4.5 8.25l4.5-4.5"
              />
            </svg>
          }
        />
        <StatCard
          title="Rata-rata Usia"
          value={`${data.averageAge} thn`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Kesediaan Partisipasi"
          value={`${participationPercentage}%`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 11.75c0 4.556 4.03 8.25 9 8.25z"
              />
            </svg>
          }
        />
        <StatCard
          title="Harapan Utama"
          value={data.feedback.hopesForImprovements[0].name}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          }
        />
      </section>

      {/* Section: Pengetahuan & Perencanaan */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-content-strong mb-6">
          Pengetahuan & Perencanaan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SimplePieChart
            data={data.knowledge.disasterTypes}
            title="Tahu Jenis Bencana"
          />
          <SimplePieChart
            data={data.knowledge.warningSigns}
            title="Tahu Tanda Peringatan"
          />
          <SimplePieChart
            data={data.planning.evacuationPlan}
            title="Punya Rencana Evakuasi"
          />
          <SimplePieChart
            data={data.planning.familyKnowsEvacuationPoint}
            title="Keluarga Tahu Titik Kumpul"
          />
          <SimplePieChart
            data={data.knowledge.hasAttendedTraining}
            title="Pernah Ikut Pelatihan"
          />
          <SimplePieChart
            data={data.community.coordinatedWithNeighbours}
            title="Koordinasi Dengan Tetangga"
          />
        </div>
      </section>

      {/* Section: Analisis Mendalam */}
      <section>
        <h3 className="text-2xl font-bold text-content-strong mb-6">
          Analisis Mendalam
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Status Tas Siaga Darurat" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.planning.emergencyKit}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={<CustomTooltipComponent />}
                  cursor={{ fill: "rgba(215, 235, 233, 0.4)" }}
                />
                <Bar dataKey="value" name="Responden">
                  {data.planning.emergencyKit.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Object.values(PIE_COLORS).reverse()[index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Persepsi Potensi Bencana">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.community.disasterPotency}
                margin={{ top: 5, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip
                  content={<CustomTooltipComponent />}
                  cursor={{ fill: "rgba(215, 235, 233, 0.4)" }}
                />
                <Bar dataKey="value" name="Responden" fill={CHART_COLORS[2]}>
                  {data.community.disasterPotency.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Harapan Peningkatan Komunitas (Skor Rata-rata)"
            className="lg:col-span-3"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.feedback.hopesForImprovements}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  content={<CustomTooltipComponent />}
                  cursor={{ fill: "rgba(215, 235, 233, 0.4)" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar
                  dataKey="average"
                  name="Skor Rata-rata"
                  barSize={50}
                  fill={CHART_COLORS[1]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* AI Recommendation Section */}
      <AiRecommendation
        data={data}
        onGenerate={handleGenerateRecommendation}
        recommendation={aiRecommendation}
        isLoading={isAiLoading}
        error={aiError}
      />
    </div>
  );
};
