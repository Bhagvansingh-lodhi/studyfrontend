export default function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1 text-slate-400">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
