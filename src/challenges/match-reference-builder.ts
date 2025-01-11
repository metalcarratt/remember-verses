import { Verse } from "../types";
import { shuffleArray } from "../util/shuffle-array";

export type MatchRefStep = {
  verse: Verse;
  type: "matchref";
  answers: string[];
};

export const buildMatchRefs = (verse: Verse, verses: Verse[]): MatchRefStep => {
  const references = verses
    .map((verse2) =>
      verse2.reference !== verse.reference ? verse2.reference : undefined
    )
    .filter((v) => v !== undefined);
  shuffleArray(references);
  const refs2 = [verse.reference, references[0], references[1], references[2]];
  shuffleArray(refs2);
  return {
    verse,
    type: "matchref" as const,
    answers: refs2,
  };
};
