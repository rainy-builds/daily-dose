"use client";

interface SecondaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function SecondaryButton({
  onClick,
  disabled = false,
  children,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        rounded-card border-2 border-brown-100
        bg-yellow-20 px-h-padding py-v-padding
        font-bagel text-[26px] text-brown-200
        transition-colors hover:bg-yellow-40
        disabled:opacity-40
      "
    >
      {children}
    </button>
  );
}
