import { PROGRAMS, type Level } from "./data";

export const RHYTHM_GOALS = [
  { id: "energy", label: "Energy & fitness", note: "Move, sweat, enjoy the music." },
  { id: "expression", label: "Creative expression", note: "Tell a story through movement." },
  { id: "performance", label: "Performance & technique", note: "Build control and stage confidence." },
  { id: "discovery", label: "Try something new", note: "Find a comfortable first step." },
] as const;

type Goal = (typeof RHYTHM_GOALS)[number]["id"];
type Program = (typeof PROGRAMS)[number];
type ProgramId = Program["id"];
export type RhythmAnswers = { age: number; goal: Goal; level: Level };
export type RhythmResult = { program: Program; reason: string };
export const RHYTHM_EVENT = "prefect-rhythm";
export type RhythmPreference = { style: string; level: Level; age: number };

// Match the sample age/level requirements in PROGRAMS. These are not live admissions rules.
const allLevels: Level[] = ["Beginner", "Intermediate", "Advanced"];
const eligibility: Record<ProgramId, { min: number; max?: number; levels: Level[] }> = {
  "hip-hop": { min: 13, levels: allLevels },
  contemporary: { min: 14, levels: allLevels },
  bollywood: { min: 13, levels: ["Beginner", "Intermediate"] },
  freestyle: { min: 16, levels: ["Intermediate", "Advanced"] },
  kids: { min: 7, max: 11, levels: ["Beginner"] },
  beginner: { min: 16, levels: ["Beginner"] },
};

const preferences: Record<Goal, ProgramId[]> = {
  energy: ["kids", "bollywood", "hip-hop", "freestyle", "beginner", "contemporary"],
  expression: ["kids", "contemporary", "bollywood", "freestyle", "hip-hop", "beginner"],
  performance: ["kids", "hip-hop", "freestyle", "contemporary", "bollywood", "beginner"],
  discovery: ["kids", "beginner", "bollywood", "hip-hop", "contemporary", "freestyle"],
};

export function recommendRhythm({ age, goal, level }: RhythmAnswers): RhythmResult | null {
  if (!Number.isInteger(age) || age < 4 || age > 80) return null;
  const ranked: ProgramId[] = goal === "performance" && level === "Advanced"
    ? ["freestyle", ...preferences[goal].filter((id) => id !== "freestyle")]
    : preferences[goal];
  for (const id of ranked) {
    const rule = eligibility[id];
    if (age < rule.min || (rule.max !== undefined && age > rule.max) || !rule.levels.includes(level)) continue;
    const program = PROGRAMS.find((item) => item.id === id);
    if (program) {
      return { program, reason: `This sample program matches your age and experience. ${program.description}` };
    }
  }
  return null;
}
