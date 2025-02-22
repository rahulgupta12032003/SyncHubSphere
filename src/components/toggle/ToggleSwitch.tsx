import React from "react";

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  switchClassName?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id = "toggleswitch",
  checked,
  onChange,
  disabled = false,
  switchClassName = "label-primary",
}) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label htmlFor={id} className={switchClassName} />
    </>
  );
};

export default React.memo(ToggleSwitch);
