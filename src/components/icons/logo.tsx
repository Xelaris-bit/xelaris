import React from 'react';

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
      </linearGradient>
    </defs>
    <path
      d="M2 2L9.5 12L2 22H4.5L12 14.5L19.5 22H22L14.5 12L22 2H19.5L12 9.5L4.5 2H2Z"
      fill="url(#logoGradient)"
    />
  </svg>
);

export default Logo;