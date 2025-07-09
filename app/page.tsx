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
    <div className="relative bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-base-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
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
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={scrollToDashboard}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary-focus md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                  >
                    Lihat Dasbor
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://picsum.photos/1000/800?image=835"
          alt="Emergency supplies"
        />
      </div>
    </div>
  );
};

const PreparednessSteps = () => {
  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-brand-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-1.125 0-2.062.938-2.062 2.063v7.5c0 1.125.937 2.063 2.063 2.063h9.25c1.125 0 2.063-.938 2.063-2.063v-7.5c0-1.125-.937-2.063-2.063-2.063H8.25z"
          />
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-brand-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.008v.008h-.008v-.008zm-3 0h-6m9 0H19.5a1.125 1.125 0 001.125-1.125V14.25m-17.25 4.5L12 12.75M3.375 14.25L12 12.75m0 0L20.625 14.25M12 12.75V3.75m0 9l-8.625 4.5M12 3.75L20.625 8.25M12 3.75v9M20.625 8.25L12 12.75"
          />
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
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-brand-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4.5 4.5 0 01-6.364 0M9 10.5H9.008v.008H9v-.008zm5.25 0H14.258v.008H14.25v-.008zM12 21a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      ),
      title: "Tetap Terinformasi",
      description:
        "Daftarkan diri untuk menerima peringatan lokal. Pantau laporan cuaca dan dengarkan arahan dari pihak berwenang.",
    },
  ];

  return (
    <div className="py-12 bg-base-100">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Bersiaplah untuk segala situasi.</h2>
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
    </div>
  );
};

const Footer = () => (
  <footer className="bg-base-100">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-base text-gray-400">
          &copy; 2024 PrepWise. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <main>
        <Hero />
        <PreparednessSteps />
        <div id="dashboard" className="py-10 sm:py-16">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
