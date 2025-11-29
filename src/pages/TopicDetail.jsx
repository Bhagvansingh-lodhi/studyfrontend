import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { apiRequest } from "../api/client.js";
import Tabs from "../components/Tabs.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import FlashcardViewer from "../components/FlashcardViewer.jsx";
import QuizForm from "../components/QuizForm.jsx";
import ModuleAccordion from "../components/ModuleAccordion.jsx";
import RevisionPlan from "../components/RevisionPlan.jsx";

const TAB_IDS = {
  OVERVIEW: "overview",
  MODULES: "modules",
  FLASHCARDS: "flashcards",
  QUIZ: "quiz",
  REVISION: "revision",
};

export default function TopicDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_IDS.OVERVIEW);
  const [error, setError] = useState("");

  const loadTopic = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(`/api/topics/${id}`, {}, token);
      setTopic(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load topic");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateProgress = async (payload) => {
    const progress = await apiRequest(
      `/api/topics/${id}/progress`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      token
    );
    setTopic((t) => ({ ...t, progress }));
  };

  const handleToggleModule = async (index, completed) => {
    const current = topic.progress?.completedModules || [];
    let updated;
    if (completed) {
      updated = [...new Set([...current, index])];
    } else {
      updated = current.filter((i) => i !== index);
    }
    await updateProgress({ completedModules: updated });
  };

  const handleFlashcardLevel = async (cardIndex, level) => {
    await updateProgress({
      flashcardsStats: [{ cardIndex, level }],
    });
  };

  const handleToggleDay = async (dayIndex, completed) => {
    await updateProgress({
      revisionPlan: [{ dayIndex, completed }],
    });
    await loadTopic(); // refresh plan
  };

  const handleQuizSubmit = async (answers) => {
    return await apiRequest(
      `/api/topics/${id}/quiz`,
      {
        method: "POST",
        body: JSON.stringify({ answers }),
      },
      token
    );
  };

  if (loading) {
    return (
      <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-3">
        Loading topic...
      </p>
    );
  }

  if (!topic) {
    return (
      <p className="text-sm text-red-600 bg-white border border-red-100 rounded-xl px-4 py-3">
        {error || "Topic not found or failed to load."}
      </p>
    );
  }

  const modulesCount = topic.modules?.length || 0;
  const flashcardsCount = topic.flashcards?.length || 0;
  const mcqsCount = topic.mcqs?.length || 0;

  const completion =
    ((topic.progress?.completedModules?.length || 0) /
      (modulesCount || 1)) *
    100;

  const quizzes = topic.progress?.quizzes || [];
  const lastQuiz = quizzes.length ? quizzes[quizzes.length - 1] : null;

  const createdAt = topic.createdAt
    ? new Date(topic.createdAt).toLocaleString()
    : "";

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div className="space-y-1">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              {topic.title}
            </h1>
            <p className="text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="font-medium">Difficulty:</span>{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium">
                  {topic.difficulty}
                </span>
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span>Created {createdAt}</span>
            </p>
          </div>
          <div className="w-full md:w-64">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-600 font-medium">Overall progress</span>
              <span className="text-gray-500">
                {Math.round(completion) || 0}%
              </span>
            </div>
            <ProgressBar value={Math.round(completion)} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
          <span className="inline-flex items-center gap-1">
            📘 <span>{modulesCount} modules</span>
          </span>
          <span className="inline-flex items-center gap-1">
            🧠 <span>{flashcardsCount} flashcards</span>
          </span>
          <span className="inline-flex items-center gap-1">
            ✏️ <span>{mcqsCount} MCQs</span>
          </span>
          <span className="inline-flex items-center gap-1">
            🧪{" "}
            <span>
              Last quiz:{" "}
              {lastQuiz ? `${lastQuiz.score}%` : "No quiz taken yet"}
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: TAB_IDS.OVERVIEW, label: "Overview" },
          { id: TAB_IDS.MODULES, label: "Modules" },
          { id: TAB_IDS.FLASHCARDS, label: "Flashcards" },
          { id: TAB_IDS.QUIZ, label: "Quiz" },
          { id: TAB_IDS.REVISION, label: "Revision Plan" },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Panels */}
      {activeTab === TAB_IDS.OVERVIEW && (
        <section className="bg-white border border-gray-200 rounded-2xl p-5 text-sm space-y-3 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-1">Overview</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {topic.overview}
          </p>
        </section>
      )}

      {activeTab === TAB_IDS.MODULES && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <ModuleAccordion
            modules={topic.modules}
            completedModules={topic.progress?.completedModules || []}
            onToggleModule={handleToggleModule}
          />
        </div>
      )}

      {activeTab === TAB_IDS.FLASHCARDS && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <FlashcardViewer
            cards={topic.flashcards}
            onLevelSet={handleFlashcardLevel}
          />
        </div>
      )}

      {activeTab === TAB_IDS.QUIZ && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <QuizForm mcqs={topic.mcqs} onSubmitResult={handleQuizSubmit} />
        </div>
      )}

      {activeTab === TAB_IDS.REVISION && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <RevisionPlan
            plan={topic.revisionPlan}
            onToggleDay={handleToggleDay}
          />
        </div>
      )}
    </div>
  );
}
