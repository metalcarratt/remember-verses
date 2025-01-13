import { ProgressBar } from "./progress-bar";
import { Result } from "./use-result";

type Props = {
    result: Result,
    next: (wrong: boolean) => void,
    step: number,
    maxStep: number
}

export const Page = ({result, next, children, step, maxStep}: React.PropsWithChildren<Props>) => {
    return (
      <div className={`verse ${result}`}>
        <ProgressBar step={step} maxStep={maxStep} />
        {children}
        {result !== undefined && <div className="actions"><span className={result}>{result}</span><button onClick={() => next(result === "Incorrect")}>Next ▶</button></div>}
      </div>
    );
}