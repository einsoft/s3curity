"use client";

import { useEffect, useState } from "react";

import { Progress } from "../ui/progress";

export default function Processando() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    }, 2000);

    return () => clearTimeout(startDelay);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="h-screen">
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-black/90 text-center">
        <Progress value={progress} />
        <span className="ml-3 font-light text-zinc-500">Processando...</span>
      </div>
    </div>
  );
}
