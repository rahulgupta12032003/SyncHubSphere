import React from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastConfig {
  className: string;
  iconClassName: string;
  icon: string;
}

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  isVisible?: boolean;
  onClose?: () => void;
  autoCloseDuration?: number;
  title?: string;
}

interface ToastState {
  isVisible: boolean;
  message: string;
  variant: ToastVariant;
  title?: string;
}

const VARIANTS: Record<ToastVariant, ToastConfig> = {
  success: {
    className: "bg-[#ecfdf5] border-[#34d399] text-[#065f46]",
    iconClassName: "text-[#059669] bg-[#d1fae5]",
    icon: "✓",
  },
  error: {
    className: "bg-[#fef2f2] border-[#f87171] text-[#991b1b]",
    iconClassName: "text-[#dc2626] bg-[#fee2e2]",
    icon: "✕",
  },
  warning: {
    className: "bg-[#fffbeb] border-[#fcd34d] text-[#92400e]",
    iconClassName: "text-[#d97706] bg-[#fef3c7]",
    icon: "!",
  },
  info: {
    className: "bg-[#eff6ff] border-[#60a5fa] text-[#1e40af]",
    iconClassName: "text-[#2563eb] bg-[#dbeafe]",
    icon: "i",
  },
};

const Toaster: React.FC<ToastProps> = ({
  message,
  variant = "info",
  isVisible = false,
  onClose,
  autoCloseDuration = 3000,
  title,
}) => {
  const variantConfig = VARIANTS[variant];

  React.useEffect(() => {
    if (isVisible && autoCloseDuration) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out transform">
      <div
        className={`max-w-lg w-full shadow-lg rounded-lg pointer-events-auto border ${variantConfig.className}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span
                className={`w-8 h-8 inline-flex items-center justify-center rounded-full ${variantConfig.iconClassName} text-lg font-bold`}
              >
                {variantConfig.icon}
              </span>
            </div>
            <div className="ml-3 w-full">
              {title && (
                <h6 className=" h6 text-sm font-semibold dark:text-white/50">
                  {title}
                </h6>
              )}
              <p className="text-sm dark:text-white/50 opacity-[0.7] font-normal">
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="rounded-md inline-flex text-[#6b7280] hover:text-[#374151] focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <span className="text-xl font-medium">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toaster;
