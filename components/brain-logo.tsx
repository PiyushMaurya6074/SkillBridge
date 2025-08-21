interface BrainLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BrainLogo({ size = "md", className = "" }: BrainLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M30 35C25 30 25 20 35 15C40 10 50 10 55 15C60 10 70 10 75 15C85 20 85 30 80 35C85 40 85 50 75 55C70 60 60 60 55 55C50 60 40 60 35 55C25 50 25 40 30 35Z"
          fill="#3B82F6"
          stroke="#2563EB"
          strokeWidth="2"
        />

        <path d="M52 25L44 42H50L47 52L56 35H50L52 25Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />

        <circle cx="18" cy="30" r="2.5" fill="#3B82F6" />
        <circle cx="12" cy="50" r="2.5" fill="#3B82F6" />
        <circle cx="22" cy="70" r="2.5" fill="#3B82F6" />
        <circle cx="50" cy="78" r="2.5" fill="#3B82F6" />
        <circle cx="78" cy="70" r="2.5" fill="#3B82F6" />
        <circle cx="88" cy="50" r="2.5" fill="#3B82F6" />
        <circle cx="82" cy="30" r="2.5" fill="#3B82F6" />
        <circle cx="50" cy="8" r="2.5" fill="#3B82F6" />

        <line x1="30" y1="30" x2="18" y2="30" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="25" y1="50" x2="12" y2="50" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="35" y1="55" x2="22" y2="70" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="60" x2="50" y2="78" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="65" y1="55" x2="78" y2="70" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="75" y1="50" x2="88" y2="50" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="70" y1="30" x2="82" y2="30" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
        <line x1="50" y1="20" x2="50" y2="8" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
      </svg>
    </div>
  )
}
