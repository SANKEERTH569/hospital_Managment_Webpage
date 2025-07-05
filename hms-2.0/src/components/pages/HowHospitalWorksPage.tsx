import React from "react";

export default function HowHospitalWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
      <h1 className="text-5xl font-extrabold text-blue-900 text-center mb-10 drop-shadow-xl">How Our Hospital Works</h1>
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-10 text-blue-900 text-lg leading-relaxed">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">A Complete Journey: From Entry to Aftercare</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <span className="font-semibold text-blue-900">Booking & Registration:</span> Patients can book appointments online, by phone, or walk-in. Our digital system ensures quick registration and personalized guidance from the moment you arrive.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Initial Assessment:</span> Nurses and doctors review your medical history, symptoms, and vital signs. Advanced triage ensures urgent cases are prioritized.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Consultation & Diagnosis:</span> Meet with your chosen specialist. We use state-of-the-art diagnostics—MRI, CT, X-ray, labs, and more—to ensure accurate, timely results.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Personalized Treatment:</span> Receive a tailored care plan, which may include medication, therapy, surgery, or wellness programs. Multidisciplinary teams collaborate for complex cases.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Inpatient & Outpatient Care:</span> Whether you stay with us or return home, our team provides continuous support, digital health monitoring, and family updates.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Surgery & Critical Care:</span> Our operating rooms and ICUs are equipped with the latest technology and staffed by expert teams for safe, successful outcomes.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Rehabilitation & Wellness:</span> Physical therapy, nutrition, mental health, and wellness programs help you recover and thrive beyond treatment.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Discharge & Aftercare:</span> Get digital records, clear instructions, and follow-up reminders. Our care coordinators ensure a smooth transition home.
          </li>
          <li>
            <span className="font-semibold text-blue-900">Feedback & Community:</span> Share your experience, join support groups, and access ongoing health education and community events.
          </li>
        </ol>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-800">What Services Do We Offer?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-semibold">Emergency & Trauma Care:</span> 24/7 emergency room, ambulance, and trauma teams.</li>
          <li><span className="font-semibold">Outpatient Clinics:</span> General medicine, pediatrics, gynecology, dermatology, and more.</li>
          <li><span className="font-semibold">Surgical Services:</span> Cardiac, neuro, orthopedic, minimally invasive, and robotic surgeries.</li>
          <li><span className="font-semibold">Diagnostics:</span> MRI, CT, X-ray, ultrasound, pathology, and advanced labs.</li>
          <li><span className="font-semibold">Maternity & Child Care:</span> Labor, delivery, NICU, and pediatric intensive care.</li>
          <li><span className="font-semibold">Critical Care:</span> ICU, CCU, and step-down units for complex cases.</li>
          <li><span className="font-semibold">Rehabilitation:</span> Physical, occupational, and speech therapy.</li>
          <li><span className="font-semibold">Preventive Health:</span> Vaccinations, health checks, and wellness programs.</li>
          <li><span className="font-semibold">Telemedicine:</span> Virtual consultations and remote monitoring.</li>
          <li><span className="font-semibold">International Patient Services:</span> Visa, travel, and personalized care for global patients.</li>
          <li><span className="font-semibold">Research & Education:</span> Clinical trials, medical education, and innovation labs.</li>
        </ul>
        <div className="mt-10 text-center">
          <img src="/hospital-process.svg" alt="Hospital Process" className="w-80 h-80 mx-auto drop-shadow-2xl" />
        </div>
        <div className="mt-8 text-blue-700 text-lg font-semibold text-center">Our mission: To deliver world-class, compassionate healthcare at every step.</div>
      </div>
    </div>
  );
}
