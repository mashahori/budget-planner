import { Fragment } from "react";

const MANIFESTO =
  "Бюджет — это не про запреты. Это про ясность: видеть, сколько у тебя есть, решать, на что это пойдёт, и спокойно тратить на то, что делает жизнь лучше.";

export function Idea() {
  return (
    <section className="sec" id="idea">
      <div className="wrap">
        <span className="eyebrow">01 / Идея</span>
        {/* Each word is its own span so it can fade in as the page scrolls. */}
        <p className="mani-text">
          {MANIFESTO.split(" ").map((word, i) => (
            <Fragment key={i}>
              <span className="mw">{word}</span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
