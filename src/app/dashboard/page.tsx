"use client";

export default function DashboardPage() {
  const mockLaunchDate = "2026-09-15";
  const daysUntil = Math.ceil((new Date(mockLaunchDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url(/images/Space Dock  Mission Control Background.png)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-space-black via-space-darker to-space-black" />
      <div className="relative z-10 section-container mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-12">
          <span className="text-accent-cyan text-sm font-mono tracking-[0.3em] uppercase block mb-2">Mission Control</span>
          <h1 className="text-display-3 font-display font-bold text-white">Mission Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">NX-1 Aurora &middot; T-{daysUntil}d to launch</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-5 mb-8">
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-white/30 text-xs font-mono mb-1">Launch Countdown</p>
            <p className="text-display-3 font-display font-bold text-accent-cyan">T-{daysUntil}d</p>
            <p className="text-white/20 text-[10px] font-mono mt-1">NX-1 Aurora</p>
          </div>
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <p className="text-white/30 text-xs font-mono mb-1">Training Progress</p>
            <p className="text-display-3 font-display font-bold text-amber-400">2/3</p>
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-2">
              <div className="h-full w-[66%] bg-amber-400/60 rounded-full" />
            </div>
            <p className="text-white/20 text-[10px] font-mono mt-1">Modules complete</p>
          </div>
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <p className="text-white/30 text-xs font-mono mb-1">Biometric Status</p>
            <p className="text-display-3 font-display font-bold text-white/40">Pending</p>
            <p className="text-white/20 text-[10px] font-mono mt-1">Device not connected</p>
          </div>
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent-purple/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
            </div>
            <p className="text-white/30 text-xs font-mono mb-1">Payload Vault</p>
            <p className="text-display-3 font-display font-bold text-accent-purple">Secure</p>
            <p className="text-white/20 text-[10px] font-mono mt-1">All items verified</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 glass rounded-3xl p-6">
            <span className="text-accent-cyan text-xs font-mono tracking-[0.3em] uppercase block mb-6">Itinerary Timeline</span>
            <div className="space-y-3">
              {[
                { date: "T-30", event: "Physiological Evaluation", status: "Scheduled" },
                { date: "T-14", event: "Systems Training Module", status: "Scheduled" },
                { date: "T-7", event: "Emergency Protocols Drill", status: "Pending" },
                { date: mockLaunchDate, event: "NX-1 Aurora DEPARTURE", status: "Confirmed", highlight: true },
              ].map((item) => (
                <div key={item.event} className={`flex items-center gap-4 py-3 px-4 rounded-xl ${item.highlight ? "bg-accent-blue/5 border border-accent-blue/10" : ""}`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.status === "Confirmed" ? "bg-amber-400" : item.status === "Scheduled" ? "bg-accent-cyan" : "bg-white/20"}`} />
                    <div className="w-px h-8 bg-white/5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-white/30 text-[10px] font-mono">{item.date}</p>
                      <p className={`text-sm ${item.highlight ? "text-white font-semibold" : "text-white/70"}`}>{item.event}</p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono border ${item.status === "Confirmed" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" : item.status === "Scheduled" ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20" : "bg-white/5 text-white/40 border-white/10"}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 flex flex-col">
            <span className="text-accent-purple text-xs font-mono tracking-[0.3em] uppercase block mb-6">Biometric Sync</span>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent-cyan/5 border border-accent-cyan/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent-cyan/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-white/30 text-xs mb-5">No device connected</p>
              <button className="btn-secondary text-xs px-6 py-2.5 rounded-full">Authorize Device</button>
              <p className="text-white/15 text-[10px] mt-3">Connect your health device to sync biometrics</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/30 text-xs font-mono tracking-[0.3em] uppercase">Mission Readiness</span>
            <span className="text-accent-cyan text-xs font-mono">61%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[61%] bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
