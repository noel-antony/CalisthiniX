import { useState } from "react";
import { useExercises } from "@/hooks/use-exercises";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExercisesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [difficulty, setDifficulty] = useState("all");

    const { data: exercises, isLoading, error } = useExercises({
        q: search,
        category,
        difficulty,
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Exercise Library
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                    placeholder="Search exercises..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="md:w-1/3"
                />

                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="pull">Pull</SelectItem>
                        <SelectItem value="legs">Legs</SelectItem>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="skill">Skill</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center text-red-500">Failed to load exercises</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exercises?.map((exercise) => (
                        <Link key={exercise.id} href={`/exercises/${exercise.slug}`}>
                            <div className="cursor-pointer block h-full transition-transform hover:scale-[1.02]">
                                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
                                    {exercise.demo_image_url && (
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={exercise.demo_image_url}
                                                alt={exercise.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="capitalize">{exercise.category}</Badge>
                                            <Badge
                                                variant={
                                                    exercise.difficulty === 'beginner' ? 'secondary' :
                                                        exercise.difficulty === 'intermediate' ? 'default' :
                                                            'destructive'
                                                }
                                                className="capitalize"
                                            >
                                                {exercise.difficulty}
                                            </Badge>
                                        </div>
                                        <CardTitle>{exercise.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
