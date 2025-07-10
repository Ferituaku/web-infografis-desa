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
            InfografiDesa
          </span>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-base-100/80 backdrop-blur-sm py-4 mt-8">
    <div className="container mx-auto text-center text-sm text-content">
      <p>
        &copy; {new Date().getFullYear()} InfografiDesa By KKNT IDBU TIM 73.
      </p>
    </div>
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <main>
        <div id="dashboard" className="py-8 sm:py-12">
          <Dashboard />
        </div>
        <Footer />
      </main>
    </div>
  );
}
