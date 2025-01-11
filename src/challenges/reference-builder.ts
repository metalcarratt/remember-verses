import { Verse } from "../types";

export type ReferenceStep = { verse: Verse; type: "reference" };

export const buildReferences = (verse: Verse): ReferenceStep => {
  return { verse, type: "reference" as const };
};
