export default function MoonLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-sm text-white/40 font-mono tracking-widest uppercase">Locating moon</p>
      </div>
    </div>
  );
}
