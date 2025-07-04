"use client";

import React, { useState } from "react";
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
  LineChart,
  Line,
} from "recharts";
import {
  AlertTriangle,
  Shield,
  Users,
  Phone,
  BookOpen,
  MapPin,
  Activity,
  TrendingUp,
} from "lucide-react";

const DisasterPreparednessDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Data dari CSV yang sudah dianalisis
  const surveyData = {
    totalResponses: 21,
    avgAge: 43,
    rtRw: "RT 01/RW 03",
  };

  // Data untuk grafik pengetahuan bencana
  const knowledgeData = [
    { name: "Mengetahui Jenis Bencana", ya: 18, tidak: 3 },
    { name: "Mengetahui Tanda Awal", ya: 16, tidak: 5 },
    { name: "Punya Rencana Evakuasi", ya: 19, tidak: 2 },
    { name: "Tahu Nomor Darurat", ya: 8, tidak: 13 },
  ];

  // Data potensi bencana
  const potentialData = [
    { name: "Sangat Rendah", value: 2, color: "#10B981" },
    { name: "Rendah", value: 4, color: "#84CC16" },
    { name: "Sedang", value: 14, color: "#F59E0B" },
    { name: "Tinggi", value: 2, color: "#EF4444" },
    { name: "Sangat Tinggi", value: 0, color: "#DC2626" },
  ];

  // Data kesiapan tas darurat
  const emergencyKitData = [
    { name: "Lengkap", value: 0, color: "#10B981" },
    { name: "Sebagian Ada", value: 15, color: "#F59E0B" },
    { name: "Tidak Punya", value: 6, color: "#EF4444" },
  ];

  // Data sumber informasi
  const infoSourceData = [
    { name: "Media Sosial", value: 16 },
    { name: "Televisi", value: 6 },
    { name: "Pemerintah", value: 2 },
    { name: "Sekolah", value: 3 },
  ];

  // Data harapan peningkatan
  const improvementHopes = [
    { name: "Pelatihan P3K", avg: 4.2 },
    { name: "Papan Evakuasi", avg: 4.4 },
    { name: "Tim Siaga RT", avg: 4.3 },
    { name: "Peralatan Darurat", avg: 4.1 },
  ];

  const tips = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      title: "Kenali Tanda Bahaya",
      description:
        "Pelajari tanda-tanda awal bencana seperti perubahan cuaca ekstrem, getaran tanah, atau peringatan dari otoritas.",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Siapkan Tas Darurat",
      description:
        "Selalu siapkan tas berisi dokumen penting, obat-obatan, senter, makanan kering, dan pakaian ganti.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Buat Rencana Keluarga",
      description:
        "Tentukan titik kumpul dan jalur evakuasi. Pastikan semua anggota keluarga mengetahui rencana ini.",
    },
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Hafalkan Nomor Darurat",
      description:
        "Simpan nomor BPBD (021-29240404), PMI (021-7992325), dan layanan darurat lainnya di ponsel.",
    },
  ];

  const emergencyContacts = [
    { name: "BPBD Kota Semarang", number: "021-29240404" },
    { name: "PMI Semarang", number: "021-7992325" },
    { name: "Pemadam Kebakaran", number: "113" },
    { name: "Polisi", number: "110" },
    { name: "Ambulans", number: "118" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Siaga Bencana RT 01/RW 03
              </h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("tips")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "tips"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Tips Keselamatan
              </button>
              <button
                onClick={() => setActiveTab("emergency")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "emergency"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Kontak Darurat
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Dashboard Kesiapsiagaan Bencana
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Hasil Survey RT 01/RW 03 - Juli 2025
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">
                    {surveyData.totalResponses}
                  </div>
                  <div className="text-blue-100">Total Responden</div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Rata-rata Usia</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {surveyData.avgAge} tahun
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Wilayah Survey</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {surveyData.rtRw}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Tingkat Kesiapan</p>
                    <p className="text-2xl font-bold text-gray-900">67%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pengetahuan Bencana Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Tingkat Pengetahuan Bencana
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={knowledgeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ya" fill="#10B981" name="Ya" />
                    <Bar dataKey="tidak" fill="#EF4444" name="Tidak" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Potensi Bencana Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Persepsi Potensi Bencana
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={potentialData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {potentialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Tas Darurat Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Kesiapan Tas Darurat
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emergencyKitData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emergencyKitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Harapan Peningkatan Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Harapan Peningkatan (Rata-rata)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={improvementHopes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="avg" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sumber Informasi */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Sumber Informasi Kesiapsiagaan Bencana
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={infoSourceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tips Keselamatan Bencana
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Persiapan yang baik adalah kunci utama dalam menghadapi bencana.
                Berikut tips penting untuk kesiapsiagaan bencana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{tip.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist Kesiapan */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Checklist Kesiapan Bencana
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Persiapan Sebelum Bencana:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Siapkan tas darurat keluarga</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Buat rencana evakuasi keluarga</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Simpan nomor darurat penting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Kenali jalur evakuasi terdekat</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Saat Terjadi Bencana:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Tetap tenang dan jangan panik</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Ikuti instruksi dari otoritas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Evakuasi ke tempat yang aman</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Hubungi keluarga untuk konfirmasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Kontak Darurat
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simpan nomor-nomor penting ini dan pastikan semua anggota
                keluarga mengetahuinya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contact.name}
                      </h3>
                      <p className="text-xl font-bold text-red-600">
                        {contact.number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Penting untuk Diingat!
                  </h3>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>
                      • Selalu hubungi nomor darurat terdekat saat terjadi
                      bencana
                    </li>
                    <li>
                      • Berikan informasi lokasi yang jelas dan kondisi yang
                      dialami
                    </li>
                    <li>
                      • Jangan tutup telepon sampai petugas memberikan instruksi
                      lengkap
                    </li>
                    <li>
                      • Simpan nomor-nomor ini di ponsel dan tulis di tempat
                      yang mudah ditemukan
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Informasi BPBD */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                Tentang BPBD (Badan Penanggulangan Bencana Daerah)
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                BPBD adalah lembaga pemerintah yang bertanggung jawab dalam
                penanggulangan bencana di tingkat daerah. Mereka menyediakan
                layanan 24 jam untuk koordinasi tanggap darurat, evakuasi, dan
                bantuan logistik saat terjadi bencana. Jangan ragu untuk
                menghubungi BPBD jika Anda membutuhkan bantuan atau informasi
                terkait kesiapsiagaan bencana di wilayah Anda.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              © 2025 Dashboard Kesiapsiagaan Bencana RT 01/RW 03. Dibuat untuk
              meningkatkan kesadaran dan kesiapan warga dalam menghadapi
              bencana.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Data berdasarkan survey kesiapsiagaan bencana Juli 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DisasterPreparednessDashboard;
