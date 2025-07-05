import React from "react";
import { AboutHospital } from "../home/AboutHospital";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 py-16">
      <h1 className="text-5xl font-extrabold text-yellow-900 text-center mb-10 drop-shadow-xl">About the Hospital</h1>
      <AboutHospital />
    </div>
  );
}
