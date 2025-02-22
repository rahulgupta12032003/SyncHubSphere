import Link from "next/link";
import React from "react";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsNavigationProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  className = "",
}) => {
  return (
    <div
      className={`sm:border-b-2 border-gray-200 dark:border-white/10 pt-1.5  ${className}`}
    >
      <nav className="-mb-0.5 sm:flex sm:space-x-6 rtl:space-x-reverse">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            className={`
              w-full sm:w-auto hs-tab-active:font-semibold hs-tab-active:border-primary 
              hs-tab-active:text-primary py-2 px-1 inline-flex items-center gap-2 
              border-b-[3px] border-transparent text-sm whitespace-nowrap 
              text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 
              hover:text-primary
              ${
                activeTabId === tab.id
                  ? "active font-semibold border-primary text-primary"
                  : ""
              }
            `}
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab.id);
            }}
            id={`icon-item-${tab.id}`}
            data-hs-tab={`#icon-${tab.id}`}
            aria-controls={`icon-${tab.id}`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TabsNavigation;
