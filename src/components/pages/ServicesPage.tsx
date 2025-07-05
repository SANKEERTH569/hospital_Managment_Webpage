import React from "react";
import { Services } from "../home/Services";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-100 py-16">
      <h1 className="text-5xl font-extrabold text-green-900 text-center mb-10 drop-shadow-xl">Our Services</h1>
      <Services />
    </div>
  );
}
