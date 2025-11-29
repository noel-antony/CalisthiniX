import { useWorkoutTemplate } from "@/hooks/use-workout-templates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Play, Clock, Dumbbell, Loader2 } from "lucide-react";

interface TemplatePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string | null;
  onStart: () => void;
  isStarting: boolean;
}

export function TemplatePreviewDialog({
  open,
  onOpenChange,
  templateId,
  onStart,
  isStarting,
}: TemplatePreviewDialogProps) {
  const { data: template, isLoading } = useWorkoutTemplate(templateId || "");

  const getDifficultyVariant = (difficulty: string | null) => {
    switch (difficulty) {
      case "beginner":
        return "secondary";
      case "intermediate":
        return "default";
      case "advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  const totalSets = template?.exercises.reduce(
    (acc, ex) => acc + (ex.defaultSets || 3),
    0
  ) || 0;

  const estimatedTime = Math.round(
    template?.exercises.reduce((acc, ex) => {
      const sets = ex.defaultSets || 3;
      const restSeconds = ex.defaultRestSeconds || 60;
      // Estimate 30 seconds per set + rest time
      return acc + sets * 30 + (sets - 1) * restSeconds;
    }, 0) / 60 || 0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        {isLoading || !template ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Separator />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <>
            <DialogHeader className="flex-shrink-0">
              <div className="flex gap-2 mb-2">
                {template.difficulty && (
                  <Badge
                    variant={getDifficultyVariant(template.difficulty)}
                    className="capitalize"
                  >
                    {template.difficulty}
                  </Badge>
                )}
                {template.category && (
                  <Badge variant="outline" className="capitalize">
                    {template.category.replace("_", " ")}
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl">{template.name}</DialogTitle>
              {template.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {template.description}
                </p>
              )}
            </DialogHeader>

            <div className="flex gap-4 py-4 text-sm text-muted-foreground border-y">
              <div className="flex items-center gap-1">
                <Dumbbell className="w-4 h-4" />
                <span>{template.exercises.length} exercises</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{totalSets} total sets</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>~{estimatedTime} min</span>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto -mx-6 px-6 py-2">
              <h4 className="font-medium mb-3">Exercises</h4>
              <div className="space-y-3">
                {template.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{exercise.exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.defaultSets || 3} sets × {exercise.defaultReps || 10} reps
                        {exercise.defaultRestSeconds && (
                          <span className="ml-2">
                            • {exercise.defaultRestSeconds}s rest
                          </span>
                        )}
                      </div>
                      {exercise.notes && (
                        <p className="text-xs text-muted-foreground/80 mt-1 italic">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs capitalize flex-shrink-0"
                    >
                      {exercise.exercise.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 flex-shrink-0 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={onStart} disabled={isStarting} className="gap-2">
                {isStarting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Workout
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
