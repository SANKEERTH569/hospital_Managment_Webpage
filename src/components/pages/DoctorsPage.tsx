import React from "react";
import { Doctors } from "../home/Doctors";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16">
      <h1 className="text-5xl font-extrabold text-blue-900 text-center mb-10 drop-shadow-xl">Meet Our Doctors</h1>
      <Doctors />
    </div>
  );
}
