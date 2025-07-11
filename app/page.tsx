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
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="m11,12c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm-1-6c-.552,0-1,.448-1,1v2c0,.552.448,1,1,1s1-.448,1-1v-2c0-.552-.448-1-1-1Zm13.707,17.707c-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.969-5.969c-1.725,1.412-3.927,2.262-6.324,2.262C4.486,20,0,15.514,0,10S4.486,0,10,0s10,4.486,10,10c0,2.398-.85,4.6-2.262,6.324l5.969,5.969c.391.391.391,1.023,0,1.414Zm-8.303-11.837l-4.181-7.167c-.547-.937-1.9-.937-2.447,0l-4.181,7.167c-.551.944.13,2.13,1.224,2.13h8.361c1.093,0,1.774-1.186,1.224-2.13Z" />
          </svg>
          <span className="ml-3 text-xl font-bold text-content-strong">
            INGDESWA
          </span>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-base-100/80 backdrop-blur-sm py-4 mt-8">
    <div className="container mx-auto text-center text-sm text-content">
      <p>&copy; {new Date().getFullYear()} Ingdeswa By KKNT IDBU TIM 73.</p>
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
