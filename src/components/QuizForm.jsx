import { useState } from "react";

export default function QuizForm({ mcqs, onSubmitResult }) {
  const [answers, setAnswers] = useState(() => mcqs?.map(() => null) || []);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!mcqs || mcqs.length === 0) {
    return (
      <p className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
        No MCQs available for this topic yet.
      </p>
    );
  }

  const handleChange = (qi, oi) => {
    const arr = [...answers];
    arr[qi] = oi;
    setAnswers(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (answers.some((a) => a === null)) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setLoading(true);
      const res = await onSubmitResult(answers);
      setResult(res);
    } catch (err) {
      setError(err.message || "Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        {mcqs.map((q, qi) => (
          <div
            key={qi}
            className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 space-y-3 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-900">
              Q{qi + 1}. {q.question}
            </p>
            <div className="space-y-2 text-sm">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    checked={answers[qi] === oi}
                    onChange={() => handleChange(qi, oi)}
                    className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition"
        >
          {loading ? "Submitting..." : "Submit Quiz"}
        </button>
      </form>

      {result && (
        <div className="mt-4 space-y-3">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm">
            <p className="font-semibold text-emerald-800">
              Score: {result.score}% ({result.correct}/{result.total} correct)
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Review each question below to understand your mistakes.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {result.details.map((d, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow-sm"
              >
                <p className="font-medium text-gray-900">
                  Q{i + 1}. {d.question}
                </p>

                <p className="mt-1 text-gray-700">
                  Your answer:{" "}
                  <span className="font-medium">
                    {d.userAnswer != null
                      ? d.options[d.userAnswer]
                      : "Not answered"}
                  </span>{" "}
                  {d.isCorrect ? "✅" : "❌"}
                </p>

                <p className="mt-1 text-gray-700">
                  Correct answer:{" "}
                  <span className="font-medium">
                    {d.options[d.correctIndex]}
                  </span>
                </p>

                <p className="mt-2 text-gray-500">
                  Explanation: {d.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
