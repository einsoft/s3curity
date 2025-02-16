"use client";

import React, { createContext, useContext } from "react";

import { useToast } from "../hooks/useToast";

type ToastVariant = "default" | "destructive";

interface ToastContextType {
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showWarning: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const showToast = (
    title: string,
    description?: string,
    variant: ToastVariant = "default",
  ) => {
    toast({
      title,
      description,
      variant,
    });
  };

  const showSuccess = (title: string, description?: string) => {
    showToast(title, description, "default");
  };

  const showError = (title: string, description?: string) => {
    showToast(title, description, "destructive");
  };

  const showWarning = (title: string, description?: string) => {
    showToast(`⚠️ ${title}`, description, "default");
  };

  const showInfo = (title: string, description?: string) => {
    showToast(`ℹ️ ${title}`, description, "default");
  };

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showWarning, showInfo }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
