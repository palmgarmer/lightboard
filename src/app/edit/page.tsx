"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Type, Palette, MoveHorizontal, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial State จาก URL
  const [text, setText] = useState(searchParams.get("text") || "WELCOME");
  const [color, setColor] = useState(searchParams.get("color") || "#ff0000");
  const [animation, setAnimation] = useState(searchParams.get("animation") || "scroll");

  const goToDisplay = () => {
    const params = new URLSearchParams({ text, color, animation });
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editor</h2>
        <Button onClick={goToDisplay} className="gap-2 bg-gray-300">
          <Play className="h-4 w-4" /> Preview Fullscreen
        </Button>
      </div>

      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border-4 border-zinc-800 bg-black sm:h-72">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
        <h1
          style={{
            color,
            textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            ...(animation === "scroll" 
                ? { position: "absolute", left: "100%", animation: "marquee 8s linear infinite" } 
                : { animation: "blink 1.1s steps(2, start) infinite" })
          }}
          className="whitespace-nowrap px-6 text-[50vh] font-bold uppercase tracking-[0.2em] md:text-[50vh]"
        >
          {text}
        </h1>
      </div>

      <Card>
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium"><Type className="h-4 w-4" /> Message</label>
            <input value={text} onChange={(e) => setText(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium"><Palette className="h-4 w-4" /> LED Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background p-1" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium"><MoveHorizontal className="h-4 w-4" /> Animation</label>
            <select value={animation} onChange={(e) => setAnimation(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
              <option value="scroll">Scroll</option>
              <option value="blink">Blink</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}