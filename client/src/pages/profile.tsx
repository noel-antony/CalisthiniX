import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Camera, Settings, Share2 } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/20 p-1">
          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <span className="text-4xl font-bold">AR</span>
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-heading font-bold uppercase">Alex Robinson</h1>
          <p className="text-muted-foreground mb-4">Calisthenics Enthusiast • Level 2 Intermediate</p>
          <div className="flex gap-3 justify-center md:justify-start">
            <div className="text-center px-4 py-2 bg-card border border-border rounded-lg">
              <div className="text-xl font-bold text-primary font-mono">12</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</div>
            </div>
            <div className="text-center px-4 py-2 bg-card border border-border rounded-lg">
              <div className="text-xl font-bold text-foreground font-mono">48</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Workouts</div>
            </div>
            <div className="text-center px-4 py-2 bg-card border border-border rounded-lg">
              <div className="text-xl font-bold text-foreground font-mono">185</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Lbs</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Journal */}
        <div className="space-y-6">
           <h2 className="text-xl font-heading font-bold uppercase flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Daily Journal
           </h2>
           
           <Card className="bg-card border-border">
             <CardContent className="p-6 space-y-6">
               <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Energy Level</span>
                   <span className="text-primary font-bold">High</span>
                 </div>
                 <Slider defaultValue={[75]} max={100} step={1} className="[&>.relative>.absolute]:bg-primary" />
               </div>

               <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Mood</span>
                   <span className="text-primary font-bold">Focused</span>
                 </div>
                 <Slider defaultValue={[85]} max={100} step={1} className="[&>.relative>.absolute]:bg-primary" />
               </div>

               <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Notes</label>
                  <Textarea 
                    placeholder="How did you feel today?" 
                    className="bg-background border-border min-h-[100px] resize-none focus:border-primary"
                  />
               </div>

               <div className="flex gap-2">
                 <Button variant="outline" className="flex-1 border-dashed">
                   <Camera className="w-4 h-4 mr-2" /> Add Photo
                 </Button>
                 <Button className="flex-1 bg-primary text-primary-foreground font-bold uppercase">
                   Save Entry
                 </Button>
               </div>
             </CardContent>
           </Card>
        </div>

        {/* Recent History */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold uppercase">Recent History</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded bg-secondary flex items-col flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-muted-foreground uppercase">NOV</span>
                  <span className="text-lg font-bold leading-none">{28 - item}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">Upper Body Power</h4>
                  <p className="text-xs text-muted-foreground">45 min • 12,450 kg Volume</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded">
                    PR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
