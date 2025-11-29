import { useQuery } from "@tanstack/react-query";

export interface Exercise {
    id: string;
    name: string;
    slug: string;
    category: 'push' | 'pull' | 'legs' | 'core' | 'skill';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    demo_image_url: string | null;
}

export interface UseExercisesParams {
    q?: string;
    category?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
}

export function useExercises(params: UseExercisesParams = {}) {
    return useQuery<Exercise[]>({
        queryKey: ["exercises", params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (params.q) searchParams.append("q", params.q);
            if (params.category && params.category !== "all") searchParams.append("category", params.category);
            if (params.difficulty && params.difficulty !== "all") searchParams.append("difficulty", params.difficulty);
            if (params.limit) searchParams.append("limit", params.limit.toString());
            if (params.offset) searchParams.append("offset", params.offset.toString());

            const res = await fetch(`/api/exercises?${searchParams.toString()}`);
            if (!res.ok) {
                throw new Error("Failed to fetch exercises");
            }
            return res.json();
        },
    });
}
