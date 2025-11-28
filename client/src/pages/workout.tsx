import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, Info, Plus, Save, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Workout() {
  const [timer, setTimer] = useState(0);
  
  const exercises = [
    { name: "Pull-ups", sets: [{ reps: 8, rpe: 7 }, { reps: 8, rpe: 8 }, { reps: 7, rpe: 9 }] },
    { name: "Dips", sets: [{ reps: 12, rpe: 7 }, { reps: 12, rpe: 8 }, { reps: 10, rpe: 9 }] },
    { name: "Pistol Squats", sets: [{ reps: 5, rpe: 8 }, { reps: 5, rpe: 8 }] },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md p-4 -mx-4 z-40 border-b border-border md:static md:bg-transparent md:border-none md:p-0 md:mx-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-heading font-bold uppercase">Pull & Skills B</h1>
            <div className="flex items-center gap-2 text-xs font-mono text-primary">
              <Clock className="w-3 h-3" />
              <span>00:42:15</span>
            </div>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground font-bold font-heading uppercase">
          Finish
        </Button>
      </div>

      {/* Workout List */}
      <div className="space-y-6">
        {exercises.map((ex, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-secondary/30 px-4 py-3 flex justify-between items-center border-b border-border">
              <h3 className="font-heading font-bold text-lg uppercase">{ex.name}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-10 gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider text-center mb-2">
                <div className="col-span-1">Set</div>
                <div className="col-span-3">Previous</div>
                <div className="col-span-2">Reps</div>
                <div className="col-span-2">RPE</div>
                <div className="col-span-2">Check</div>
              </div>

              {ex.sets.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-10 gap-2 items-center">
                  <div className="col-span-1 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {setIndex + 1}
                    </div>
                  </div>
                  <div className="col-span-3 text-center text-sm text-muted-foreground font-mono">
                    {set.reps} x 10kg
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      defaultValue={set.reps} 
                      className="h-8 text-center font-mono bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      defaultValue={set.rpe} 
                      className="h-8 text-center font-mono bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <div className="w-8 h-8 rounded bg-primary/20 border border-primary/50 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors group">
                      <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full mt-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 border border-dashed border-border hover:border-primary/50">
                <Plus className="w-3 h-3 mr-2" /> Add Set
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exercise */}
      <Button variant="outline" size="lg" className="w-full h-14 border-dashed border-2 font-heading font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5">
        + Add Exercise
      </Button>
    </div>
  );
}
