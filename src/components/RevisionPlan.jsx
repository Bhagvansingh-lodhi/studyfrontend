export default function RevisionPlan({ plan, onToggleDay }) {
  if (!plan || plan.length === 0) {
    return (
      <p className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
        No revision plan has been generated for this topic yet.
      </p>
    );
  }

  const sortedPlan = plan.slice().sort((a, b) => a.dayIndex - b.dayIndex);

  return (
    <div className="space-y-3">
      {sortedPlan.map((day) => (
        <div
          key={day.dayIndex}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            {/* Left side: checkbox + label */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={day.completed}
                onChange={() => onToggleDay(day.dayIndex, !day.completed)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
              />
              <span className="font-medium text-gray-800">
                Day {day.dayIndex}
              </span>
            </div>

            {/* Status pill */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border
                ${
                  day.completed
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-100"
                }`}
            >
              {day.completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Tasks */}
          <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 mt-1">
            {day.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
