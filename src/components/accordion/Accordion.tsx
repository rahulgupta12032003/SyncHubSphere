// types.ts
type AccordionItemType = {
  id: string;
  title: string;
  content: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  defaultOpen?: boolean; // Added for individual item control
};

// AccordionItem.tsx
import { useEffect, useState } from "react";

interface AccordionItemProps extends AccordionItemType {
  isOpen: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

const AccordionItem = ({
  id,
  title,
  content,
  isOpen,
  onToggle,
  variant,
  className = "",
}: AccordionItemProps) => {
  return (
    <div
      className={`hs-accordion accordion-item custom-accordion-${variant} ${className}`}
      id={`hs-basic-heading-${id}`}
    >
      <button
        className="hs-accordion-toggle accordion-button hs-accordion-active:pb-3 group py-0 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start transition"
        aria-controls={`hs-basic-collapse-${id}`}
        onClick={() => onToggle(id)}
        type="button"
      >
        {title}
        <svg
          className={`${
            isOpen ? "hidden" : "block"
          } hs-accordion-active:hidden hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className={`${
            isOpen ? "block" : "hidden"
          } hs-accordion-active:block hs-accordion-active:text-gray-600 hs-accordion-active:group-hover:text-gray-600 w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-[#8c9097] dark:text-white/50`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        id={`hs-basic-collapse-${id}`}
        className={`hs-accordion-content accordion-collapse w-full transition-[height] duration-300 ${
          isOpen ? "" : "hidden"
        }`}
        aria-labelledby={`hs-basic-heading-${id}`}
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};

// Accordion.tsx

interface AccordionProps {
  items: AccordionItemType[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  defaultOpenAll?: boolean;
}

const Accordion = ({
  items,
  className = "",
  allowMultiple = false,
  defaultOpenItems = [],
  defaultOpenAll = false,
}: AccordionProps) => {
  // Initialize state with a function to avoid unnecessary recalculations
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultOpenAll) {
      return items.map((item) => item.id);
    }

    if (defaultOpenItems.length > 0) {
      return allowMultiple ? defaultOpenItems : [defaultOpenItems[0]];
    }

    const defaultOpen = items
      .filter((item) => item.defaultOpen)
      .map((item) => item.id);

    return allowMultiple ? defaultOpen : defaultOpen.slice(0, 1);
  });

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={`accordion customized-accordion accordions-items-seperate ${className}`}
    >
      <div className="hs-accordion-group">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            {...item}
            isOpen={openItems.includes(item.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
export type { AccordionItemType };

// use example

// const ExamplePage = () => {
//   const accordionItems: AccordionItemType[] = [
//     {
//       id: '1',
//       title: 'Accordion Item #1',
//       variant: 'primary',
//       defaultOpen: true, // This item will be open by default
//       content: (
//         <>
//           <strong>This is the first item's accordion body.</strong> It is shown by
//           default, until the collapse plugin adds the appropriate classes that we
//           use to style each element.
//         </>
//       )
//     },
//     {
//       id: '2',
//       title: 'Accordion Item #2',
//       variant: 'secondary',
//       content: (
//         <>
//           <strong>This is the second item's accordion body.</strong> You can modify
//           any of this with custom CSS or overriding our default variables.
//         </>
//       )
//     },
//     {
//       id: '3',
//       title: 'Accordion Item #3',
//       variant: 'danger',
//       defaultOpen: true, // This item will be open by default
//       content: (
//         <>
//           <strong>This is the third item's accordion body.</strong> It's also worth
//           noting that just about any HTML can go within the accordion body.
//         </>
//       )
//     }
//   ];

//   return (
//     <div className="p-4">
//       {/* Example 1: Using defaultOpenItems */}
//       <Accordion
//         items={accordionItems}
//         defaultOpenItems={['1']} // Open specific items by ID
//         allowMultiple={false}
//       />

//       {/* Example 2: Open all items by default */}
//       <Accordion
//         items={accordionItems}
//         defaultOpenAll={true}
//         allowMultiple={true}
//         className="mt-4"
//       />

//       {/* Example 3: Using individual item defaultOpen props */}
//       <Accordion
//         items={accordionItems}
//         allowMultiple={true}
//         className="mt-4"
//       />
//     </div>
//   );
// };

// export default ExamplePage;
