import { ReferenceStep } from "./reference-builder";

type Props = {
    step: ReferenceStep,
    next: () => void,
    back: () => void
}

export const VerseReference = ({step, next, back}: Props) => {
  const {verse} = step;
  
    return (
    <div className="verse">
      <h2>
        <a href="#" onClick={back} className="backBtn">◀</a>
        {verse.reference}
      </h2>
      <span className="h2-foot">
        <span className="h2-foot-1"></span>
        <span className="h2-foot-2"></span>
      </span>
      <p>{verse.verse}</p>
      <button onClick={next}>Next ▶</button>
    </div>
    );
}