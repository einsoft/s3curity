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
      <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full gap-2 bg-black/90 text-center">
        <Progress value={progress} />
        <span className="font-light text-zinc-500 ml-3">Processando...</span>
      </div>
    </div>
  );
}
