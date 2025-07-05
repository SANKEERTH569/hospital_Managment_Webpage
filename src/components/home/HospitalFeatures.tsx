import React from "react";
import { Section } from "../ui/Section";

export function HospitalFeatures() {
  return (
    <Section
      title="Why Choose Us?"
      description="Discover the advanced features and holistic care that set our hospital apart."
      className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-blue-900">
        <FeatureCard
          title="24/7 Emergency & Trauma Care"
          desc="Rapid response teams, advanced ambulances, and a dedicated trauma center ensure immediate care for critical cases."
        />
        <FeatureCard
          title="Robotic & Minimally Invasive Surgery"
          desc="State-of-the-art operation theaters equipped for precision, safety, and faster recovery."
        />
        <FeatureCard
          title="Comprehensive Diagnostics"
          desc="MRI, CT, PET, digital X-ray, and advanced pathology labs for accurate, timely results."
        />
        <FeatureCard
          title="Mother & Child Care"
          desc="Modern maternity suites, NICU, pediatric ICU, and lactation support for every stage of family care."
        />
        <FeatureCard
          title="Cardiac & Neuro Sciences"
          desc="World-class heart and brain care, from preventive checkups to complex interventions."
        />
        <FeatureCard
          title="Cancer Center"
          desc="Comprehensive oncology: chemotherapy, radiation, surgery, and personalized support."
        />
        <FeatureCard
          title="Rehabilitation & Physiotherapy"
          desc="Holistic recovery with expert therapists, modern equipment, and personalized plans."
        />
        <FeatureCard
          title="International Patient Services"
          desc="Visa, travel, translation, and personalized care for patients from abroad."
        />
        <FeatureCard
          title="Digital Health & Telemedicine"
          desc="Book appointments, access reports, and consult doctors from anywhere."
        />
      </div>
    </Section>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-8 border-2 border-blue-100 hover:border-blue-400 transition-all duration-300 animate-fade-in-up">
      <h4 className="text-xl font-bold text-blue-800 mb-3">{title}</h4>
      <p className="text-blue-700 text-base leading-relaxed">{desc}</p>
    </div>
  );
}
