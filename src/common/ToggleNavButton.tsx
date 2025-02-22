import React from "react";
interface ToggleNavProps {
  tabs: Array<"parent" | "other">;
  activeTab: any;
  setActiveTab: (tab: "parent" | "other") => void;
  onClick?: (tab: "parent" | "other") => void;
}

const ToggleNavButton: React.FC<ToggleNavProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  onClick,
}) => {
  const handleClick = (type: "parent" | "other") => {
    setActiveTab(type);
    if (onClick) {
      onClick(type);
    }
  };

  return (
    <nav className="mb-6">
      <div className="flex justify-between bg-light p-2 rounded-md w-full">
        {tabs.map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className={`py-2 px-6 rounded-sm flex-1 mx-1 font-medium dark:text-white/70 ${
              activeTab === type
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-primary dark:hover:text-white"
            }`}
          >
            <h6>{type === "parent" ? "Parent/Student" : "Staff/Other"}</h6>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ToggleNavButton;
