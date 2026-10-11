type IconProps = {
  size?: number;
  className?: string;
};

export function LinkedInIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.75h4V23h-4V8.75zM8.25 8.75h3.83v1.96h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.85c0-1.63-.03-3.73-2.27-3.73-2.27 0-2.62 1.77-2.62 3.61V23h-4V8.75z" />
    </svg>
  );
}

export function GitHubIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.4 0 12.06c0 5.32 3.44 9.83 8.21 11.42.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.85 2.81 1.31 3.49 1 .11-.79.42-1.32.76-1.63-2.67-.3-5.47-1.35-5.47-6C4.34 9.68 4.9 8.4 5.8 7.4c-.15-.3-.55-1.55.1-3.24 0 0 .95-.31 3.1 1.18a10.6 10.6 0 0 1 5.65 0c2.15-1.49 3.1-1.18 3.1-1.18.65 1.69.25 2.94.1 3.24.9 1 1.46 2.28 1.46 3.84 0 4.66-2.8 5.7-5.48 6 .43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.37 0 .32.22.7.83.58C20.56 21.89 24 17.38 24 12.06 24 5.4 18.63 0 12 0z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}
