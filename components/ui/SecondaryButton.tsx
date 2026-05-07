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
        rounded-card border-[3px] sm:border-2 border-brown-100
        bg-yellow-20 px-[14px] sm:px-h-padding py-[10px] sm:py-v-padding
        font-bagel text-[14px] sm:text-[26px] text-brown-200
        transition-colors hover:bg-yellow-40
        active:scale-[0.97] transition-transform
        disabled:opacity-40 disabled:active:scale-100
      "
    >
      {children}
    </button>
  );
}
