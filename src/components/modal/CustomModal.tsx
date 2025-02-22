// Modal.tsx
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  modalSize?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  modalSize = "md",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizeClass =
    modalSize === "sm"
      ? "sm:max-w-md"
      : modalSize === "lg"
      ? "md:max-w-lg"
      : "sm:max-w-md";

  return (
    <div
      className={`hs-overlay ${
        isOpen ? "block opacity-100" : "hidden opacity-0"
      } ti-modal`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out ${sizeClass} ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h6 className="modal-title text-[1rem] font-semibold">{title}</h6>
            <button
              type="button"
              className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="ti-modal-body">{children}</div>

          {footer && <div className="ti-modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
