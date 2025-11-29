import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";

export default function TopicCard({ topic }) {
  const difficulty = topic.difficulty || "Medium";

  const difficultyClasses = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    Hard: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const difficultyClassName =
    difficultyClasses[difficulty] || difficultyClasses["Medium"];

  const createdAt = topic.createdAt
    ? new Date(topic.createdAt).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const stats = topic.stats || {};
  const modules = stats.modules ?? 0;
  const flashcards = stats.flashcards ?? 0;
  const mcqs = stats.mcqs ?? 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-emerald-100 transition">
      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {topic.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${difficultyClassName}`}
            >
              {difficulty} level
            </span>
          </div>
        </div>
        {createdAt && (
          <span className="text-[11px] text-gray-500 whitespace-nowrap">
            {createdAt}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="mt-1">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-gray-600 font-medium">Progress</span>
          <span className="text-gray-500">
            {Math.round(topic.completion ?? 0)}%
          </span>
        </div>
        <ProgressBar value={topic.completion} />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
        <span>{modules} modules</span>
        <span>{flashcards} flashcards</span>
        <span>{mcqs} MCQs</span>
      </div>

      {/* CTA */}
      <div className="mt-2 flex justify-end">
        <Link
          to={`/topics/${topic._id || topic.id}`}
          className="inline-flex items-center px-3 py-1.5 text-xs rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-sm hover:shadow-md transition"
        >
          Open study pack
        </Link>
      </div>
    </div>
  );
}
