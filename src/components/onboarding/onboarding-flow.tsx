"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const steps = [
  {
    text: "Create your business profile",
    required: true,
  },
  {
    text: "Add business locations",
    required: true,
  },
  {
    text: "Add products",
    required: false,
  },
  {
    text: "Add team members",
    required: false,
  },
];

export interface OnboardingProgress {
  hasBusiness: boolean;
  hasLocations: boolean;
  hasProducts: boolean;
  hasTeamMembers: boolean;
}

export const OnboardingFlow = ({
  isVisible = false,
  onComplete,
  currentProgress,
  onCreateBusiness,
  onAddLocations,
  onAddProducts,
  onAddTeamMembers,
}: {
  isVisible: boolean;
  onComplete: () => void;
  currentProgress: OnboardingProgress;
  onCreateBusiness: () => Promise<void>;
  onAddLocations: () => Promise<void>;
  onAddProducts: () => Promise<void>;
  onAddTeamMembers: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const getCurrentStep = () => {
    if (!currentProgress.hasBusiness) return 0;
    if (!currentProgress.hasLocations) return 1;
    if (!currentProgress.hasProducts) return 2;
    if (!currentProgress.hasTeamMembers) return 3;
    return 4;
  };

  useEffect(() => {
    setCurrentStepIndex(getCurrentStep());
  }, [currentProgress]);

  const handleStepAction = async (step: number, data?: any) => {
    setIsLoading(true);
    try {
      switch (step) {
        case 0:
          await onCreateBusiness();
          break;
        case 1:
          await onAddLocations();
          break;
        case 2:
          await onAddProducts();
          break;
        case 3:
          await onAddTeamMembers();
          break;
      }
      // Automatically move to next step after successful completion
      setCurrentStepIndex(prev => prev + 1);
    } catch (error) {
      console.error("Error in step action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MultiStepLoader
      steps={steps}
      visible={isVisible}
      currentStep={currentStepIndex}
      progress={currentProgress}
      isLoading={isLoading}
      onStepAction={handleStepAction}
      canClose={currentProgress.hasBusiness}
      onClose={onComplete}
    />
  );
};