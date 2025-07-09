"use client";

import React from "react";
import { Dashboard } from "../components/Dashboard";

const Header = () => (
  <header className="bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <svg
            className="h-8 w-8 text-brand-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span className="ml-3 text-xl font-bold text-content-strong">
            InfografisDesaSiaga
          </span>
        </div>
      </div>
    </div>
  </header>
);

const Hero = () => {
  const scrollToDashboard = () => {
    document
      .getElementById("dashboard")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 z-10 pb-8 bg-base-100 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-content-strong sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Tetap Siaga,</span>{" "}
                <span className="block text-brand-primary xl:inline">
                  Tetap Aman
                </span>
              </h1>
              <p className="mt-3 text-base text-content sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Pahami kesiapan lingkungan Anda dan ambil tindakan hari ini.
              </p>
              <div className="mt-5 sm:mt-8 flex sm:justify-center lg:justify-start">
                <button
                  onClick={scrollToDashboard}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-currentColor bg-brand-primary hover:bg-brand-primary-focus md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                >
                  Lihat Dasbor
                </button>
              </div>
            </div>
          </main>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-lg shadow-lg"
            src="/tembcy.jpg"
            alt="Kelurahan Tembalang"
          />
        </div>
      </div>
    </section>
  );
};

const PreparednessSteps = () => {
  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-square-chart-gantt-icon lucide-square-chart-gantt"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 8h7" />
          <path d="M8 12h6" />
          <path d="M11 16h5" />
        </svg>
      ),
      title: "Buat Rencana",
      description:
        "Buat rencana darurat keluarga. Ketahui rute evakuasi dan tentukan titik pertemuan yang aman.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-briefcase-icon lucide-briefcase"
        >
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      ),
      title: "Siapkan Tas Siaga",
      description:
        "Siapkan tas siaga bencana dengan barang-barang penting seperti air, makanan, P3K, dan obat-obatan.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-smile-icon lucide-smile"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      ),
      title: "Tetap Terinformasi",
      description:
        "Daftarkan diri untuk menerima peringatan lokal. Pantau laporan cuaca dan dengarkan arahan dari pihak berwenang.",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-content-strong text-center mb-10">
          Bersiaplah untuk segala situasi
        </h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <dt>
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100">
                  {step.icon}
                </div>
                <p className="mt-5 text-lg leading-6 font-medium text-content-strong">
                  {step.title}
                </p>
              </dt>
              <dd className="mt-2 text-base text-content max-w-xs">
                {step.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-base-100">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-base text-gray-400">
          &copy; 2025 INFOGRAFIS DESA KKNT IDBU TIM 73.
        </p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PreparednessSteps />
        <section id="dashboard" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Dashboard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
