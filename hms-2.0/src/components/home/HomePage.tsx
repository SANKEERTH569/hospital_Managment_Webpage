import React from "react";
import { AboutHospital } from "./AboutHospital";
import { HospitalFeatures } from "./HospitalFeatures";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Doctors } from "./Doctors";
import { Testimonials } from "./Testimonials";

// Additional rich sections
function Awards() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-200 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
        Awards & Accreditations
      </h2>
      <p className="text-lg text-blue-800 mb-10 max-w-2xl mx-auto">
        Recognized for excellence in patient care, safety, and innovation. Our
        hospital is NABH, JCI, and ISO certified, and has received multiple
        national and international awards for quality and service.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">NABH Accreditation</h3>
          <p className="text-blue-600 text-sm">
            Highest standards in patient safety and hospital management.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">JCI Gold Seal</h3>
          <p className="text-blue-600 text-sm">
            International recognition for quality and patient care.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Best Hospital 2024</h3>
          <p className="text-blue-600 text-sm">
            Awarded by National Health Council for innovation and outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
        Community & Outreach
      </h2>
      <p className="text-lg text-blue-800 mb-10 max-w-2xl mx-auto">
        We believe in giving back. Our outreach programs touch thousands of lives
        every year.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Free Health Camps</h3>
          <p className="text-blue-600 text-sm">
            Regular camps for rural and urban communities.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">School Health Programs</h3>
          <p className="text-blue-600 text-sm">
            Wellness, nutrition, and vaccination drives for children.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Senior Citizen Care</h3>
          <p className="text-blue-600 text-sm">
            Special clinics and home visits for the elderly.
          </p>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 via-white to-blue-200 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
        Research & Education
      </h2>
      <p className="text-lg text-blue-800 mb-10 max-w-2xl mx-auto">
        Pioneering new treatments and training the next generation of healthcare
        leaders.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Clinical Trials</h3>
          <p className="text-blue-600 text-sm">
            Advancing medicine through research and innovation.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Medical Education</h3>
          <p className="text-blue-600 text-sm">
            Residency, fellowships, and CME for doctors and nurses.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-64 border-2 border-blue-200">
          <h3 className="font-bold text-blue-700 mb-2">Innovation Lab</h3>
          <p className="text-blue-600 text-sm">
            Developing new devices, apps, and care models.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      {/* Hospital Welcome & Overview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 drop-shadow-xl">
          Welcome to Our World-Class Hospital
        </h1>
        <p className="text-xl md:text-2xl text-blue-800 max-w-3xl mx-auto mb-8 font-medium">
          We are a leading multi-specialty hospital, dedicated to providing
          compassionate, advanced, and holistic healthcare for all. From emergency
          care to complex surgeries, digital health, and international patient
          services, we ensure every step of your journey is seamless, safe, and
          patient-centric.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-72 border-2 border-blue-200">
            <h3 className="font-bold text-blue-700 text-xl mb-2">
              Comprehensive Care
            </h3>
            <p className="text-blue-600 text-base">
              Over 30 specialties, 120+ expert doctors, and 500+ beds for all your
              health needs.
            </p>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-72 border-2 border-blue-200">
            <h3 className="font-bold text-blue-700 text-xl mb-2">
              Cutting-Edge Technology
            </h3>
            <p className="text-blue-600 text-base">
              Robotics, advanced imaging, digital records, and telemedicine for
              modern care.
            </p>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-72 border-2 border-blue-200">
            <h3 className="font-bold text-blue-700 text-xl mb-2">
              Patient-First Approach
            </h3>
            <p className="text-blue-600 text-base">
              Personalized treatment, transparent processes, and 24/7 support for
              every patient.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              How Our Hospital Works
            </h2>
            <ol className="list-decimal pl-6 text-blue-800 text-left max-w-xl mx-auto space-y-2 text-lg">
              <li>
                <span className="font-semibold text-blue-900">
                  Book Your Visit:
                </span>{" "}
                Schedule online, by phone, or walk-in. Choose your doctor and
                service.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Registration & Welcome:
                </span>{" "}
                Our team greets you, verifies details, and guides you to the right
                department.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Consultation & Diagnosis:
                </span>{" "}
                Meet your doctor, discuss symptoms, and undergo necessary tests or
                scans.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Personalized Treatment:
                </span>{" "}
                Receive a tailored care plan—medication, therapy, surgery, or
                wellness advice.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Continuous Support:
                </span>{" "}
                24/7 nursing, digital health monitoring, and family updates
                throughout your stay.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Discharge & Aftercare:
                </span>{" "}
                Get clear instructions, digital records, and follow-up reminders
                for a smooth recovery.
              </li>
              <li>
                <span className="font-semibold text-blue-900">
                  Feedback & Community:
                </span>{" "}
                Share your experience and join our wellness programs and support
                groups.
              </li>
            </ol>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center min-w-[300px] mt-10 md:mt-0">
            <img
              src="/hospital-journey.svg"
              alt="Hospital Journey"
              className="w-80 h-80 object-contain drop-shadow-2xl"
            />
            <div className="mt-6 text-blue-700 text-lg font-semibold">
              Your health, our mission—every step of the way.
            </div>
          </div>
        </div>
      </section>
      <AboutHospital />
      <HospitalFeatures />
      <Services />
      <Doctors />
      <Testimonials />
      <Awards />
      <Community />
      <Research />
    </div>
  );
}
