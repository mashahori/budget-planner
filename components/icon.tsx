export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="arr" viewBox="0 0 24 24">
        <path
          d="M7 17 17 7M9 7h8v8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
      <symbol id="down" viewBox="0 0 24 24">
        <path
          d="M12 5v14M6 13l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
    </svg>
  );
}

export function Icon({ name }: { name: "arr" | "down" }) {
  return (
    <svg className="i">
      <use href={`#${name}`} />
    </svg>
  );
}
