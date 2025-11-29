import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import TopicCard from "../components/TopicCard.jsx";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    topicName: "",
    difficulty: "Medium",
  });
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/api/topics", {}, token);
      setTopics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onGenerate = async (e) => {
    e.preventDefault();
    if (!form.topicName.trim()) return;
    setError("");

    try {
      setGenerating(true);
      const topic = await apiRequest(
        "/api/topics/generate",
        {
          method: "POST",
          body: JSON.stringify(form),
        },
        token
      );
      navigate(`/topics/${topic._id}`);
    } catch (err) {
      setError(err.message || "Failed to generate study pack");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Generate Study Pack */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Generate a new Study Pack
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Type any topic (e.g. &quot;Binary Search Tree&quot;, &quot;Maurya
              Empire&quot;) and StudyArchitect will design a complete structured
              study pack using AI.
            </p>
          </div>
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-100">
            AI powered
          </span>
        </div>

        <form
          onSubmit={onGenerate}
          className="flex flex-col md:flex-row gap-3 text-sm mt-4"
        >
          <input
            name="topicName"
            placeholder="What do you want to learn today?"
            value={form.topicName}
            onChange={onChange}
            className="flex-1 rounded-lg bg-white border border-gray-300 px-3 py-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={onChange}
            className="rounded-lg bg-white border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button
            type="submit"
            disabled={generating}
            className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition"
          >
            {generating ? "Generating..." : "Generate Study Pack"}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
            <span>⚠️</span> {error}
          </p>
        )}
      </section>

      {/* Topics List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Your topics
          </h2>
          {loading && (
            <span className="text-xs text-gray-500">Loading topics...</span>
          )}
        </div>

        {topics.length === 0 && !loading ? (
          <p className="text-xs text-gray-500 bg-white border border-dashed border-gray-200 rounded-xl px-4 py-3">
            You don&apos;t have any study packs yet. Generate your first one
            above and we&apos;ll keep it saved here.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {topics.map((t) => (
              <TopicCard key={t._id || t.id} topic={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
