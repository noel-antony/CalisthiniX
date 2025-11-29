import { useRoute } from "wouter";
import { useExercise } from "@/hooks/use-exercise";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, Dumbbell, Activity, ListChecks } from "lucide-react";

export default function ExerciseDetailPage() {
    const [, params] = useRoute("/exercises/:slug");
    const slug = params?.slug || "";

    const { data: exercise, isLoading, error } = useExercise(slug);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4 space-y-8">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[200px] w-full" />
                </div>
            </div>
        );
    }

    if (error || !exercise) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <h1 className="text-2xl font-bold text-red-500">Exercise not found</h1>
                <p className="text-muted-foreground mt-2">The exercise you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <div className="flex flex-col items-center mb-8 text-center">
                <div className="flex gap-2 mb-4">
                    <Badge variant="outline" className="text-lg py-1 px-4 capitalize">{exercise.category}</Badge>
                    <Badge
                        variant={
                            exercise.difficulty === 'beginner' ? 'secondary' :
                                exercise.difficulty === 'intermediate' ? 'default' :
                                    'destructive'
                        }
                        className="text-lg py-1 px-4 capitalize"
                    >
                        {exercise.difficulty}
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{exercise.name}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">{exercise.short_description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden border-2 shadow-lg">
                        {exercise.demo_image_url ? (
                            <div className="aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
                                <img
                                    src={exercise.demo_image_url}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video w-full bg-muted flex items-center justify-center">
                                <p className="text-muted-foreground">No demonstration available</p>
                            </div>
                        )}
                    </Card>

                    <div className="mt-8 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Info className="w-6 h-6 text-primary" />
                                Instructions
                            </h2>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">{exercise.long_description}</p>
                            </div>
                        </section>

                        {exercise.tips && exercise.tips.length > 0 && (
                            <Alert className="bg-primary/5 border-primary/20">
                                <AlertTriangle className="h-5 w-5 text-primary" />
                                <AlertTitle className="text-lg font-semibold ml-2">Coaching Tips</AlertTitle>
                                <AlertDescription className="mt-2">
                                    <ul className="list-disc pl-6 space-y-2">
                                        {exercise.tips.map((tip, i) => (
                                            <li key={i} className="text-base">{tip}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-primary" />
                                Muscles Worked
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Primary</h4>
                                <div className="flex flex-wrap gap-2">
                                    {exercise.muscles_primary?.map((muscle) => (
                                        <Badge key={muscle} variant="secondary">{muscle}</Badge>
                                    ))}
                                </div>
                            </div>
                            {exercise.muscles_secondary && exercise.muscles_secondary.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Secondary</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {exercise.muscles_secondary.map((muscle) => (
                                                <Badge key={muscle} variant="outline">{muscle}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Progression Path
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {exercise.regressions && exercise.regressions.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Easier Variations (Regressions)</h4>
                                    <ul className="space-y-2">
                                        {exercise.regressions.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {exercise.progressions && exercise.progressions.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Harder Variations (Progressions)</h4>
                                        <ul className="space-y-2">
                                            {exercise.progressions.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {exercise.equipment && exercise.equipment.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ListChecks className="w-5 h-5 text-primary" />
                                    Equipment Needed
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {exercise.equipment.map((item) => (
                                        <Badge key={item} variant="outline" className="border-dashed">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
