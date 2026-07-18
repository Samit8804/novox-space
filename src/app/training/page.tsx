"use client";

import { useState } from "react";
import { trainingModules } from "@/data/destinations";

const phaseColors = {
  PHYSIOLOGICAL: { label: "Physiological Adaptation", color: "text-accent-cyan", bg: "bg-accent-cyan/10", border: "border-accent-cyan/20" },
  SYSTEMS: { label: "Systems Operations", color: "text-accent-purple", bg: "bg-accent-purple/10", border: "border-accent-purple/20" },
  EVACUATION: { label: "Emergency Evacuation", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
};

const phaseIcons = {
  PHYSIOLOGICAL: "🧬",
  SYSTEMS: "🖥️",
  EVACUATION: "🚨",
};

export default function TrainingPage() {
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [medicalCleared, setMedicalCleared] = useState(false);

  const allPrereqsMet = (prereqs: string[]) => prereqs.every((p) => enrolled.includes(p));

  const progress = enrolled.length;
  const total = trainingModules.length;
  const isComplete = progress === total;

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url(/images/Space Dock  Mission Control Background.png)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-space-black/80 via-space-darker/40 to-space-dark" />
        <div className="relative z-10 text-center section-container pt-36">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase mb-4 block">Certification Track</span>
          <h1 className="text-display-2 font-display font-bold text-white mb-4">Astronaut Training</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Complete your physiological, systems, and emergency certification</p>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="section-container">
          <div className="flex items-center justify-between glass rounded-3xl p-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm font-mono">Medical Clearance</span>
              <span className={`text-xs font-mono ${medicalCleared ? "text-emerald-400" : "text-white/30"}`}>
                {medicalCleared ? "Approved" : "Required"}
              </span>
            </div>
            <button
              onClick={() => setMedicalCleared(!medicalCleared)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 font-mono ${
                medicalCleared
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                  : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20"
              }`}
            >
              {medicalCleared ? "Clearance Active" : "Apply Clearance"}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {trainingModules.map((module, idx) => {
                const pc = phaseColors[module.phase];
                const enrolledModule = enrolled.includes(module.id);
                const canEnroll = medicalCleared && allPrereqsMet(module.prerequisites) && !enrolledModule;

                return (
                  <div
                    key={module.id}
                    className={`glass rounded-3xl p-8 transition-all duration-500 ${
                      enrolledModule ? "ring-2 ring-accent-cyan shadow-lg shadow-accent-cyan/10" : "hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="hidden lg:flex w-16 h-16 rounded-2xl bg-white/5 items-center justify-center text-3xl shrink-0 border border-white/5">
                        {phaseIcons[module.phase]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-3 py-1 rounded-full font-mono border ${pc.color} ${pc.bg} ${pc.border}`}>
                            {pc.label}
                          </span>
                          <span className="text-white/20 text-xs font-mono">Module {idx + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white font-display mb-2">{module.name}</h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-4">{module.description}</p>
                        <div className="flex items-center gap-5 text-xs font-mono">
                          <span className="flex items-center gap-1.5 text-accent-cyan/60">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {module.duration_hours}h
                          </span>
                          {module.prerequisites.length > 0 && (
                            <span className="flex items-center gap-1.5 text-accent-purple/60">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              Requires: {module.prerequisites.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (enrolledModule) {
                            setEnrolled((prev) => prev.filter((id) => id !== module.id));
                          } else if (canEnroll) {
                            setEnrolled((prev) => [...prev, module.id]);
                          }
                        }}
                        disabled={!canEnroll && !enrolledModule}
                        className={`shrink-0 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                          enrolledModule
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : canEnroll
                            ? "btn-primary"
                            : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                        }`}
                      >
                        {enrolledModule ? "Enrolled" : canEnroll ? "Enroll Now" : "Locked"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-8">
              <div className="glass rounded-3xl p-8">
                <span className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase block mb-8">Progress Summary</span>
                <div className="mb-6">
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-white/60 text-sm">Completion</span>
                    <span className="text-5xl font-bold font-display text-gradient">{Math.round((progress / total) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(progress / total) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/30 text-xs font-mono mt-2 block">{progress} of {total} modules completed</span>
                </div>
                <div className="space-y-3">
                  <span className="text-white/40 text-xs font-mono block">Checklist</span>
                  {trainingModules.map((m) => {
                    const done = enrolled.includes(m.id);
                    return (
                      <div key={m.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                        done ? "bg-emerald-500/10" : "bg-white/5"
                      }`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                          done ? "bg-emerald-500 text-white" : "bg-white/10 text-white/30"
                        }`}>
                          {done ? "✓" : ""}
                        </span>
                        <span className={`font-mono ${done ? "text-emerald-400" : "text-white/30"}`}>{m.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass rounded-3xl p-8">
                <span className="text-accent-purple text-xs font-mono tracking-[0.3em] uppercase block mb-6">Certificate</span>
                {isComplete ? (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
                      <span className="text-4xl">🏆</span>
                    </div>
                    <h4 className="text-xl font-bold text-white font-display mb-2">Certification Complete</h4>
                    <p className="text-amber-400 text-sm font-mono mb-4">Cleared for Spaceflight</p>
                    <button className="btn-gold text-sm w-full">Download Certificate</button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <span className="text-3xl text-white/20">🏆</span>
                    </div>
                    <p className="text-white/30 text-sm leading-relaxed">Complete all training modules to unlock your astronaut certification</p>
                  </div>
                )}
              </div>

              <div className="glass rounded-3xl p-8">
                <span className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase block mb-4">Schedule</span>
                <p className="text-white/30 text-sm leading-relaxed">
                  Training sessions are conducted at our certified orbital facilities. Upon enrollment, our concierge team will coordinate your centrifuge and zero-G simulation schedules.
                </p>
              </div>
            </div>
          </div>

          {isComplete && (
            <div className="mt-16 glass rounded-3xl p-12 text-center ring-2 ring-amber-400/30 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="text-4xl font-bold font-display text-white mb-2">Certification Complete</h2>
              <p className="text-gradient-gold text-xl font-mono mb-4">You are cleared for spaceflight</p>
              <p className="text-white/40 max-w-md mx-auto mb-8">Congratulations, astronaut! You have completed all physiological, systems, and emergency evacuation training. You are now ready for your journey beyond Earth.</p>
              <button className="btn-gold text-lg px-12 py-5">Download Certificate</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
