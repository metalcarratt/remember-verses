import { Verse } from "../../types";

export type Part = {
  type: "text" | "keyword";
  value: string;
};

export type KeywordsStep = {
  verse: Verse;
  parts: Part[];
  keywords: string[];
  type: "keywords";
};

export const buildKeywords = (verse: Verse): KeywordsStep => {
  const words = verse.keywords.split(" ");
  const parts: Part[] = [];
  const keywords: string[] = [];
  let currentPart = "";
  words.forEach((word) => {
    if (word.includes("[")) {
      currentPart += " " + word.split("[")[0];
      parts.push({
        type: "text",
        value: currentPart,
      });
      currentPart = word.split("]")[1];
      const keyword = word.split("[")[1].split("]")[0];
      parts.push({
        type: "keyword",
        value: keyword,
      });
      keywords.push(keyword);
    } else {
      currentPart += " " + word;
    }
  });

  if (currentPart !== "") {
    parts.push({
      type: "text",
      value: currentPart,
    });
  }

  return {
    verse,
    parts,
    keywords,
    type: "keywords" as const,
  };
};
