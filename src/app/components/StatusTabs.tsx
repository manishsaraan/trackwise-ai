type StatusTabsProps = {
  statusTabs: {
    id: string;
    label: string;
    count: number;
    icon: React.ElementType;
    description: string;
  }[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export default function StatusTabs({
  statusTabs,
  selectedTab,
  setSelectedTab,
}: StatusTabsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {statusTabs.map(({ id, label, count, icon: Icon, description }) => (
        <button
          key={id}
          onClick={() => setSelectedTab(id)}
          className={`
            relative p-4 rounded-lg border-2 transition-all
            ${
              selectedTab === id
                ? "bg-base-200 border-primary"
                : "bg-base-100 border-base-200 hover:bg-base-200/50"
            }
            flex items-center gap-4
          `}
        >
          <div
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center
              ${selectedTab === id ? "bg-primary/10" : "bg-base-200"}
            `}
          >
            <Icon
              className={`w-6 h-6 ${
                selectedTab === id ? "text-primary" : "text-base-content/70"
              }`}
            />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-medium">{label}</span>
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${
                    selectedTab === id
                      ? "bg-primary/10 text-primary"
                      : "bg-base-200 text-base-content/70"
                  }
                `}
              >
                {count}
              </span>
            </div>
            <p className="text-sm text-base-content/60 mt-0.5">{description}</p>
          </div>

          {selectedTab === id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
