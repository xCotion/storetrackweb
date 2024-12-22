"use client";
import React, { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
  const [showOnboarding, setShowOnboarding] = useState(true);
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
          await handleAddLocations(data);
          setProgress((prev) => ({ ...prev, hasLocations: true }));
          setCurrentStep(2);
          break;
        case 2:
          await handleAddProducts(data);
          setProgress((prev) => ({ ...prev, hasProducts: true }));
          setCurrentStep(3);
          break;
        case 3:
          await handleAddTeamMembers(data);
          setProgress((prev) => ({ ...prev, hasTeamMembers: true }));
          break;
      }
    } catch (error) {
      console.error("Error handling step:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { text: "Create a business", required: true },
    { text: "Add locations", required: false },
    { text: "Add products", required: false },
    { text: "Add team members", required: false }
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background flex`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-6">
              <SidebarTrigger className="h-9 w-9 mt-8" />
            </div>
            <main className="flex-1 overflow-y-auto px-6">
              <MultiStepLoader
                steps={steps}
                visible={showOnboarding}
                currentStep={currentStep}
                progress={progress}
                isLoading={isLoading}
                onStepAction={handleStepAction}
                canClose={progress.hasBusiness}
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

// Handlers for each step
const handleCreateBusiness = async (data: any) => {
  console.log("Creating business with data:", data);
  await new Promise((resolve) => setTimeout(resolve, 500));
};

const handleAddLocations = async (data: any) => {
  console.log("Adding location with data:", data);
  await new Promise((resolve) => setTimeout(resolve, 500));
};

const handleAddProducts = async (data: any) => {
  console.log("Adding product with data:", data);
  await new Promise((resolve) => setTimeout(resolve, 500));
};

const handleAddTeamMembers = async (data: any) => {
  console.log("Adding team member with data:", data);
  await new Promise((resolve) => setTimeout(resolve, 500));
};