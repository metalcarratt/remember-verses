export const ProgressBar = ({step, maxStep}: {step: number, maxStep: number}) => {
    return (
        <div className="progress">
            {[...Array(maxStep)].map((_,i) => <span className={i<=step ? 'done' : ''} />)}
        </div>
    );
}