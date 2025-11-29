import { useQuery } from "@tanstack/react-query";
import type { Exercise } from "./use-exercises";

export interface ExerciseDetail extends Exercise {
    short_description: string;
    long_description: string;
    progressions: string[];
    regressions: string[];
    muscles_primary: string[];
    muscles_secondary: string[];
    equipment: string[];
    demo_gif_url: string | null;
    tips: string[];
}

export function useExercise(slug: string) {
    return useQuery<ExerciseDetail | null>({
        queryKey: ["exercise", slug],
        queryFn: async () => {
            const res = await fetch(`/api/exercises/${slug}`);
            if (!res.ok) {
                if (res.status === 404) return null;
                throw new Error("Failed to fetch exercise");
            }
            return res.json();
        },
        enabled: !!slug,
    });
}
