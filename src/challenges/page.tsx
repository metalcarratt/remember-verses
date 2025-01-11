import { Result } from "./use-result";

type Props = {
    result: Result,
    next: () => void
}

export const Page = ({result, next, children}: React.PropsWithChildren<Props>) => {
    return (
      <div className={`verse ${result}`}>
        {children}
        {result !== undefined && <div className="actions"><span className={result}>{result}</span><button onClick={next}>Next ▶</button></div>}
      </div>
    );
}