export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-sm text-white/40 font-mono tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
