import { ReferenceStep } from "./reference-builder";

type Props = {
    step: ReferenceStep,
    next: () => void
}

export const VerseReference = ({step, next}: Props) => {
  const {verse} = step;
  
    return (
    <div className="verse">
      <h2>{verse.reference}</h2>
      <span className="h2-foot">
        <span className="h2-foot-1"></span>
        <span className="h2-foot-2"></span>
      </span>
      <p>{verse.verse}</p>
      <button onClick={next}>Next ▶</button>
    </div>
    );
}