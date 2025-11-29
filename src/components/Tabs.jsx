export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all
            ${
              isActive
                ? "text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50"
                : "text-gray-500 border-b-2 border-transparent hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
