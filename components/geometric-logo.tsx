export function GeometricLogo() {
  return (
    <div className="relative w-full h-full">
      {/* Base cube */}
      <div className="absolute w-3/4 h-3/4 top-1/8 left-1/8 border-2 border-white transform rotate-[15deg] skew-y-[15deg]"></div>

      {/* Top face */}
      <div className="absolute w-3/4 h-3/4 top-0 left-1/8 border-2 border-white transform rotate-[15deg] skew-x-[-15deg]"></div>

      {/* Side face */}
      <div className="absolute w-3/4 h-3/4 top-1/8 left-0 border-2 border-white transform rotate-[15deg] skew-y-[-15deg]"></div>

      {/* Inner detail */}
      <div className="absolute w-1/4 h-1/4 top-3/8 left-3/8 bg-white transform rotate-[15deg]"></div>

      {/* Accent line */}
      <div className="absolute w-full h-[2px] top-1/2 left-0 bg-accent-blue transform rotate-[15deg]"></div>
    </div>
  )
}

