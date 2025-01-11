import { useEffect, useState } from "react";

export type Result = "Correct" | "Incorrect" | undefined;

export const useResult = (trigger: unknown) => {
  const [result, setResult] = useState<Result>(undefined);

  useEffect(() => {
    setResult(undefined);
  }, [trigger]);

  return { result, setResult };
};
