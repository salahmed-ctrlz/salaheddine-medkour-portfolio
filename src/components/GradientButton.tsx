import React from 'react';

interface GradientButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  dataHover?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  onClick, 
  className = '', 
  children,
  dataHover = true
}) => {
  return (
    <button
      className={`relative min-h-10 px-6 rounded-lg overflow-hidden transition-all duration-500 group ${className}`}
      onClick={onClick}
      data-hover={dataHover ? "true" : undefined}
    >
      <div
        className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-b from-indigo-500/80 via-indigo-900/70 to-purple-700/80"
      >
        <div className="absolute inset-0 bg-black rounded-lg opacity-90"></div>
      </div>
      <div className="absolute inset-[2px] bg-black rounded-lg opacity-95"></div>
      <div
        className="absolute inset-[2px] bg-gradient-to-r from-gray-900 via-indigo-900/20 to-gray-900 rounded-lg opacity-90"
      ></div>
      <div
        className="absolute inset-[2px] bg-gradient-to-b from-indigo-500/40 via-gray-900 to-purple-700/30 rounded-lg opacity-80"
      ></div>
      <div
        className="absolute inset-[2px] bg-gradient-to-br from-indigo-400/10 via-gray-900 to-indigo-900/50 rounded-lg"
      ></div>
      <div
        className="absolute inset-[2px] shadow-[inset_0_0_15px_rgba(138,135,246,0.15)] rounded-lg"
      ></div>
      <div className="relative flex items-center justify-center gap-2 py-2">
        <span
          className="text-base font-normal bg-gradient-to-b from-white to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(138,135,246,0.4)] tracking-tighter"
        >
          {children}
        </span>
      </div>
      <div
        className="absolute inset-[2px] opacity-0 transition-opacity duration-300 bg-gradient-to-r from-indigo-900/20 via-indigo-400/10 to-indigo-900/20 group-hover:opacity-100 rounded-lg"
      ></div>
    </button>
  );
};

export default GradientButton;