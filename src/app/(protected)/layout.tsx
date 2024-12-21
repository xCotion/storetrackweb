"use client";
import React, { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { ModeToggle } from "@/components/mode-toggle";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOnboarding, setShowOnboarding] = useState(true); // For dev: show by default
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState({
    hasBusiness: false,
    hasProducts: false,
    hasTeamMembers: false,
    hasLocations: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleStepAction = async (step: number, data?: any) => {
    setIsLoading(true);
    try {
      switch (step) {
        case 0:
          await handleCreateBusiness(data);
          setProgress((prev) => ({ ...prev, hasBusiness: true }));
          setCurrentStep(1);
          break;
        case 1:
          await handleAddProducts(data);
          setProgress((prev) => ({ ...prev, hasProducts: true }));
          setCurrentStep(2);
          break;
        case 2:
          await handleAddTeamMembers(data);
          setProgress((prev) => ({ ...prev, hasTeamMembers: true }));
          // All steps done, will trigger completion state in MultiStepLoader
          break;
      }
    } catch (error) {
      console.error("Error handling step:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    { text: "Create a business", required: true },
    { text: "Add locations", required: false },
    { text: "Add products", required: false },
    { text: "Add team members", required: false }
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1">
              <MultiStepLoader
                steps={steps}
                visible={showOnboarding}
                currentStep={currentStep}
                progress={progress}
                isLoading={isLoading}
                onStepAction={handleStepAction}
                canClose={progress.hasBusiness} // allow closing after business is added
                onClose={() => setShowOnboarding(false)}
              />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}

// Dummy handlers - replace with actual implementations
const handleCreateBusiness = async (data: any) => {
  console.log("Creating business with data:", data);
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 500));
};

const handleAddProducts = async (data: any) => {
  console.log("Adding products with data:", data);
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 500));
};

const handleAddTeamMembers = async (data: any) => {
  console.log("Adding team members with data:", data);
  // Simulate API call
  return new Promise((resolve) => setTimeout(resolve, 500));
};