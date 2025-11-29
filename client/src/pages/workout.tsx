import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Info, Plus, CheckCircle2, Play, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ExercisePicker } from "@/components/exercise-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WorkoutSet {
  reps: number;
  weight?: number;
  rpe: number;
  completed: boolean;
}

interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
}

export default function Workout() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Timer State
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Workout State
  const [workoutName, setWorkoutName] = useState("New Workout");
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Exercise Logic
  const addExercise = (exercise: any) => {
    setExercises([
      ...exercises,
      {
        name: exercise.name,
        sets: [{ reps: 0, weight: 0, rpe: 0, completed: false }],
      },
    ]);
  };

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...exercises];
    const previousSet = newExercises[exerciseIndex].sets[newExercises[exerciseIndex].sets.length - 1];
    newExercises[exerciseIndex].sets.push({ 
      reps: previousSet ? previousSet.reps : 0, 
      weight: previousSet ? previousSet.weight : 0, 
      rpe: previousSet ? previousSet.rpe : 0, 
      completed: false 
    });
    setExercises(newExercises);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof WorkoutSet, value: any) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex] = {
      ...newExercises[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setExercises(newExercises);
  };

  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].completed = !newExercises[exerciseIndex].sets[setIndex].completed;
    setExercises(newExercises);
  };

  // API Integration
  const createWorkoutMutation = useMutation({
    mutationFn: async (workoutData: any) => {
      const res = await apiRequest("POST", "/api/workouts", workoutData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workouts"] });
      toast({ title: "Workout Saved", description: "Great job! Your workout has been logged." });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleFinish = async () => {
    setIsRunning(false);
    
    // Filter out incomplete sets or empty exercises if needed, 
    // but for now we save everything that has at least one completed set or just save all.
    // Let's save all.

    const workoutData = {
      name: workoutName,
      duration: timer,
      totalVolume: exercises.reduce((acc, ex) => 
        acc + ex.sets.reduce((sAcc, set) => sAcc + (set.completed ? (set.reps * (set.weight || 0)) : 0), 0)
      , 0),
      exercises: exercises.map((ex, i) => ({
        name: ex.name,
        order: i,
        sets: ex.sets
      }))
    };

    createWorkoutMutation.mutate(workoutData);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md p-4 -mx-4 z-40 border-b border-border md:static md:bg-transparent md:border-none md:p-0 md:mx-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <Input 
              value={workoutName} 
              onChange={(e) => setWorkoutName(e.target.value)}
              className="text-2xl font-heading font-bold uppercase bg-transparent border-none h-auto p-0 focus-visible:ring-0"
            />
            <div className={cn("flex items-center gap-2 text-xs font-mono transition-colors", isRunning ? "text-green-500" : "text-muted-foreground")}>
              <Clock className="w-3 h-3" />
              <span>{formatTime(timer)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant={isRunning ? "destructive" : "default"} 
            onClick={toggleTimer}
            className="rounded-full"
          >
            {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </Button>
          <Button 
            onClick={handleFinish}
            disabled={createWorkoutMutation.isPending}
            className="bg-primary text-primary-foreground font-bold font-heading uppercase"
          >
            Finish
          </Button>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-6">
        {exercises.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No exercises added yet</p>
            <Button onClick={() => setIsPickerOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Exercise
            </Button>
          </div>
        )}

        {exercises.map((ex, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-secondary/30 px-4 py-3 flex justify-between items-center border-b border-border">
              <h3 className="font-heading font-bold text-lg uppercase">{ex.name}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider text-center mb-2">
                <div className="col-span-1">Set</div>
                <div className="col-span-3">Weight</div>
                <div className="col-span-3">Reps</div>
                <div className="col-span-3">RPE</div>
                <div className="col-span-2">Check</div>
              </div>

              {ex.sets.map((set, setIndex) => (
                <div key={setIndex} className={cn("grid grid-cols-12 gap-2 items-center transition-opacity", set.completed && "opacity-50")}>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {setIndex + 1}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <Input 
                      type="number" 
                      value={set.weight || 0}
                      onChange={(e) => updateSet(i, setIndex, "weight", parseFloat(e.target.value))}
                      className="h-8 text-center font-mono bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input 
                      type="number" 
                      value={set.reps}
                      onChange={(e) => updateSet(i, setIndex, "reps", parseFloat(e.target.value))}
                      className="h-8 text-center font-mono bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input 
                      type="number" 
                      value={set.rpe}
                      onChange={(e) => updateSet(i, setIndex, "rpe", parseFloat(e.target.value))}
                      className="h-8 text-center font-mono bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <div 
                      onClick={() => toggleSetComplete(i, setIndex)}
                      className={cn(
                        "w-8 h-8 rounded border flex items-center justify-center cursor-pointer transition-all duration-200",
                        set.completed 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "bg-transparent border-primary/50 hover:bg-primary/10"
                      )}
                    >
                      <CheckCircle2 className={cn("w-5 h-5", set.completed ? "fill-current" : "text-primary")} />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                onClick={() => addSet(i)}
                className="w-full mt-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 border border-dashed border-border hover:border-primary/50"
              >
                <Plus className="w-3 h-3 mr-2" /> Add Set
              </Button>
            </div>
          </div>
        ))}

        {exercises.length > 0 && (
          <Button variant="outline" className="w-full py-8 border-dashed" onClick={() => setIsPickerOpen(true)}>
            <Plus className="w-5 h-5 mr-2" /> Add Another Exercise
          </Button>
        )}
      </div>

      <ExercisePicker 
        open={isPickerOpen} 
        onOpenChange={setIsPickerOpen}
        onSelect={addExercise}
      />
    </div>
  );
}
