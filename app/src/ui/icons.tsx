import React from 'react';

export const IconButton = ({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onClick={onClick}
    className="icon-btn"
  >
    {children}
  </button>
);

export const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MaximizeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const RestoreIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M8 8h8v8H8z" stroke="currentColor" strokeWidth="2" />
    <path d="M10 6h8v8" stroke="currentColor" strokeWidth="2" />
  </svg>
);