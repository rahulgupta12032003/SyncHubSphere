import React from "react";

interface SocialLoginProps {
  orText?: boolean;
  platforms: string[];
  onLogin: (platform: string) => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  platforms,
  onLogin,
  orText = false,
}) => {
  return (
    <div>
      {orText && (
        <div className="text-center my-4 authentication-barrier">
          <span>OR</span>
        </div>
      )}
      <div className="btn-list text-center">
        {platforms.map((platform) => (
          <button
            key={platform}
            type="button"
            className="ti-btn ti-btn-icon ti-btn-light me-[0.365rem]"
            onClick={() => onLogin(platform)}
          >
            <i
              className={`ri-${platform}-line font-bold text-dark opacity-[0.7]`}
            ></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;
