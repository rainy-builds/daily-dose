"use client";

interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function PrimaryButton({
  onClick,
  disabled = false,
  children,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-xs rounded-card px-h-padding py-v-padding
        font-bagel text-[26px] transition-colors border-4
        active:scale-[0.97] transition-transform
        ${disabled
          ? "border-transparent bg-grey-40 text-grey-70 active:scale-100"
          : "border-yellow-70 bg-brown-100 text-yellow-10 hover:border-transparent"
        }
      `}
    >
      {children}
      <svg
        width="40"
        height="40"
        viewBox="0 0 27.4142 21.4142"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        className="-scale-x-100"
      >
        <path
          d="M1.41421 10.7071L0.707107 10L0 10.7071L0.707107 11.4142L1.41421 10.7071ZM26.4142 11.7071C26.9665 11.7071 27.4142 11.2594 27.4142 10.7071C27.4142 10.1548 26.9665 9.70711 26.4142 9.70711V10.7071V11.7071ZM11.4142 0.707107L10.7071 0L0.707107 10L1.41421 10.7071L2.12132 11.4142L12.1213 1.41421L11.4142 0.707107ZM1.41421 10.7071L0.707107 11.4142L10.7071 21.4142L11.4142 20.7071L12.1213 20L2.12132 10L1.41421 10.7071ZM1.41421 10.7071V11.7071H26.4142V10.7071V9.70711H1.41421V10.7071Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
