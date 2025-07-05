import React from "react";
import { Testimonials } from "../home/Testimonials";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100 py-16">
      <h1 className="text-5xl font-extrabold text-purple-900 text-center mb-10 drop-shadow-xl">Patient Stories</h1>
      <Testimonials />
    </div>
  );
}
