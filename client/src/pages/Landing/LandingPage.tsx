import { AuthCard } from "@/components/Auth/Login";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Cloud, Clock, LineChart, ShoppingBag, Sparkles, ChevronDown } from "lucide-react";

/**
 *  This is the landing page before users are signed in.
 */
export function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 overflow-hidden">
      {/* Decorative Pastel Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-12">
        <h1 className="text-7xl md:text-8xl font-serif font-bold mb-6 text-center text-primary drop-shadow-sm flex items-center gap-4">
          <Cloud className="h-16 w-16 md:h-20 md:w-20 text-primary" />
          brainhaven
        </h1>
        <p className="text-2xl md:text-3xl text-center mb-12 text-muted-foreground font-medium max-w-2xl">
          A cozy corner for balanced focus!
        </p>

        <LoginButton label="Step Inside ✨" />

        {/* Scroll Arrow (Pointy & Jumpy) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-40 hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Discover</span>
          <ChevronDown className="h-8 w-8 text-primary/60" />
        </div>
      </div>

      {/* Feature Section (Now its own "page") */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif font-bold text-center text-foreground/80 mb-16">Everything you need to focus.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[
            { 
              icon: <Clock className="h-8 w-8 text-primary" />, 
              title: "Focus Timer", 
              desc: "Pomodoro timer with rain sounds & to-dos." 
            },
            { 
              icon: <LineChart className="h-8 w-8 text-primary" />, 
              title: "Study Insights", 
              desc: "Daily goals, streaks & detailed charts." 
            },
            { 
              icon: <ShoppingBag className="h-8 w-8 text-primary" />, 
              title: "Reward Store", 
              desc: "Earn coins for focus & buy custom rewards." 
            },
            { 
              icon: <Sparkles className="h-8 w-8 text-primary" />, 
              title: "AI Reflections", 
              desc: "Journaling and personalized study tips." 
            },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[40px] bg-white/30 backdrop-blur-md border border-primary/5 shadow-sm flex flex-col items-start gap-4 transition-all hover:bg-white/50"
            >
              <div className="p-4 bg-primary/10 rounded-2xl">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Section (Now its own "page") */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-24 px-6">
        <div className="max-w-2xl w-full p-12 md:p-16 rounded-[60px] bg-white/40 backdrop-blur-xl border border-primary/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-full bg-primary/30" />
          
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 italic">A note from the creator</h2>
          
          <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-light">
            <p>
              Hello! I found studying was getting more and more stressful, so for my first 
              big personal project, I wanted to make a relaxing study app to make things 
              a bit easier. I hope you find it helpful!
            </p>
            <p className="pt-6 text-primary font-serif italic text-2xl">— Isha</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-muted-foreground mb-8 font-serif italic">I hope you enjoy!</p>
          <LoginButton label="Welcome!" />
        </div>
      </div>
    </div>
  );
}

export function LoginButton({ label = "Step Inside" }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="text-lg px-8 py-6 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>

      <AuthCard open={open} onOpenChange={setOpen} />
    </>
  );
}
