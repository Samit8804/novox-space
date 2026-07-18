"use client";

import { useState } from "react";

const steps = ["Configure", "Verify", "Payment", "Confirm"];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("Mars — Olympus Dome Estates");
  const [verified, setVerified] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleNext = () => {
    if (step === 0 && name && email) setStep(1);
    else if (step === 1 && verified) setStep(2);
    else if (step === 2 && paid) setStep(3);
  };

  return (
    <div className="page-enter min-h-screen relative">
      <div className="fixed inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/images/deep sea of space.png)" }} />
      <div className="fixed inset-0 bg-gradient-to-b from-space-black/90 via-space-darker to-space-black" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-10">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase block mb-1">Booking Portal</span>
          <h1 className="text-display-3 font-display font-bold text-white">Secure Your Place</h1>
        </div>

        <div className="flex items-center justify-between mb-12 max-w-xl mx-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-300 ${
                  i < step ? "bg-accent-cyan text-space-black" :
                  i === step ? "bg-accent-cyan/20 text-accent-cyan border-2 border-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]" :
                  "bg-white/5 text-white/30 border border-white/10"
                }`}>
                  {i < step ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`mt-2 text-[10px] font-mono tracking-wider ${i <= step ? "text-accent-cyan" : "text-white/20"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-3 mt-[-1.5rem] transition-all duration-300 ${i < step ? "bg-accent-cyan" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[400px]">
          {step === 0 && (
            <div className="glass rounded-3xl p-8">
              <h3 className="text-lg font-semibold text-white mb-6 font-display">Configure Your Voyage</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-white/30 mb-2 font-mono tracking-wider">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm outline-none focus:border-accent-cyan/40 transition-colors placeholder:text-white/15"
                    placeholder="Alistair Vance" />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-2 font-mono tracking-wider">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm outline-none focus:border-accent-cyan/40 transition-colors placeholder:text-white/15"
                    placeholder="a.vance@example.com" />
                </div>
                <div>
                  <label className="block text-xs text-white/30 mb-2 font-mono tracking-wider">Preferred Destination</label>
                  <select value={destination} onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm outline-none focus:border-accent-cyan/40 transition-colors">
                    <option className="bg-space-dark">Mars — Olympus Dome Estates</option>
                    <option className="bg-space-dark">Moon — Artemis Regolith Villas</option>
                    <option className="bg-space-dark">Saturn — Cassini Rings Resort</option>
                    <option className="bg-space-dark">Europa — Ice Habitats</option>
                  </select>
                </div>
              </div>
              <button onClick={handleNext} disabled={!name || !email}
                className="btn-gold mt-8 w-full py-4 rounded-xl font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="glass rounded-3xl p-8">
              <h3 className="text-lg font-semibold text-white mb-2 font-display">Identity Verification</h3>
              <p className="text-white/30 text-xs mb-8 font-mono">Secure your booking with multi-factor authentication</p>
              <div className="space-y-4">
                <div className={`rounded-2xl p-6 border transition-all duration-300 ${verified ? "bg-accent-cyan/5 border-accent-cyan/30" : "bg-white/5 border-white/5"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${verified ? "bg-accent-cyan/10" : "bg-white/5"}`}>
                        <svg className={`w-6 h-6 ${verified ? "text-accent-cyan" : "text-white/30"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Biometric Passkey</p>
                        <p className="text-white/30 text-xs mt-0.5">Face ID / Touch ID compatible</p>
                      </div>
                    </div>
                    <button onClick={() => setVerified(true)}
                      className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
                        verified ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20" : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
                      }`}>
                      {verified ? "Verified" : "Authenticate"}
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl p-6 border border-white/5 bg-white/5 opacity-40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm font-medium">ID Document Upload</p>
                        <p className="text-white/20 text-xs mt-0.5">Passport or government ID</p>
                      </div>
                    </div>
                    <span className="text-white/15 text-[10px] font-mono">Coming soon</span>
                  </div>
                </div>
              </div>
              <button onClick={handleNext} disabled={!verified}
                className="btn-gold mt-8 w-full py-4 rounded-xl font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="glass rounded-3xl p-8">
              <h3 className="text-lg font-semibold text-white mb-2 font-display">Payment Escrow</h3>
              <p className="text-white/30 text-xs mb-8 font-mono">Secure blockchain-escrowed payment</p>
              <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-sm">Voyage Deposit (20%)</span>
                  <span className="text-accent-cyan font-mono font-bold text-lg">480,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-sm">Booking Fee</span>
                  <span className="text-white/50 font-mono">5,000</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-white font-medium">Total Due Now</span>
                  <span className="text-accent-cyan font-mono font-bold text-xl">485,000</span>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <button onClick={() => setPaid(true)}
                  className="flex-1 py-4 rounded-xl bg-accent-cyan text-space-black font-bold text-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                  Pay Crypto
                </button>
                <button onClick={() => setPaid(true)}
                  className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                  Pay Fiat
                </button>
              </div>
              <button onClick={handleNext} disabled={!paid}
                className="btn-gold mt-4 w-full py-4 rounded-xl font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Confirm Payment
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-blue/10 flex items-center justify-center mx-auto mb-8 border border-accent-cyan/20">
                <svg className="w-12 h-12 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">Voyage Confirmed</h3>
              <p className="text-white/30 text-sm mb-6">Your place among the stars is secured</p>
              <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                <p className="text-white/20 text-[10px] font-mono tracking-wider mb-1">REFERENCE CODE</p>
                <p className="text-accent-cyan font-mono font-bold text-lg tracking-widest">NX-{Date.now().toString(36).toUpperCase()}</p>
              </div>
              <p className="text-white/15 text-xs mt-8">Check your Mission Dashboard for real-time updates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
