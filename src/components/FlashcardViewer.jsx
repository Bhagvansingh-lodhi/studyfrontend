import { useState } from "react";

export default function FlashcardViewer({ cards, onLevelSet }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <p className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
        No flashcards available.
      </p>
    );
  }

  const card = cards[index];
  const total = cards.length;
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const goNext = () => {
    setShowBack(false);
    setIndex((prev) => (prev + 1 < total ? prev + 1 : prev)); // last pe wrap NA karo
  };

  const goPrev = () => {
    setShowBack(false);
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleLevel = (level) => {
    // index + level backend ko
    onLevelSet?.(index, level);
    // agar last card nahi hai tabhi aage badho
    if (!isLast) {
      goNext();
    }
  };

  return (
    <div className="space-y-4">
      {/* Card */}
      <div
        onClick={() => setShowBack((s) => !s)}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md min-h-[150px] transition"
      >
        <p className="text-xs text-gray-500 mb-2">
          Card {index + 1} of {total} • Click to flip
        </p>
        <p className="text-base whitespace-pre-line text-gray-800 font-medium">
          {showBack ? card.answer : card.question}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center text-xs text-gray-600">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ← Previous
        </button>
        <span>
          {index + 1} / {total}
        </span>
        <button
          onClick={goNext}
          disabled={isLast}
          className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next →
        </button>
      </div>

      {/* Difficulty Buttons */}
      <div className="flex gap-3 justify-center text-sm">
        <button
          onClick={() => handleLevel("easy")}
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-sm hover:shadow transition"
        >
          Easy
        </button>

        <button
          onClick={() => handleLevel("medium")}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm hover:shadow transition"
        >
          Medium
        </button>

        <button
          onClick={() => handleLevel("hard")}
          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-sm hover:shadow transition"
        >
          Hard
        </button>
      </div>
    </div>
  );
}
