import { Fragment } from "react";
import { cssVars } from "@/lib/css-vars";

/** Section heading whose words slide up from a mask when scrolled into view. */
export function SplitHeading({ lines }: { lines: string[] }) {
  let index = 0;

  return (
    <h2 className="h2" data-words>
      {lines.map((line, lineIndex) => (
        <Fragment key={line}>
          {lineIndex > 0 && <br />}
          {line.split(/\s+/).map((word, wordIndex) => (
            <Fragment key={wordIndex}>
              {wordIndex > 0 && " "}
              <span className="ww">
                <span style={cssVars({ "--i": index++ })}>{word}</span>
              </span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </h2>
  );
}
