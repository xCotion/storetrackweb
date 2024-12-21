import * as React from "react";
import { useState, useEffect } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { OnboardingProgress } from "@/types/onboarding";

const steps = [
  { text: "Create your business profile", required: true },
  { text: "Add business locations", required: true },
  { text: "Add products", required: false },
  { text: "Add team members", required: false },
];

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
  onCreateBusiness: (data: any) => Promise<void>;
  onAddLocations: (data: any) => Promise<void>;
  onAddProducts: (data: any) => Promise<void>;
  onAddTeamMembers: (data: any) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const getCurrentStep = () => {
    if (!currentProgress.hasBusiness) return 0;
    if (!currentProgress.hasLocations) return 1;
    if (!currentProgress.hasProducts && steps[2].required) return 2;
    if (!currentProgress.hasTeamMembers && steps[3].required) return 3;
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
          if (!data?.businessName) {
            throw new Error("Invalid business data");
          }
          await onCreateBusiness(data);
          setCurrentStepIndex(1);
          break;
        case 1:
          if (!data?.locationName) {
            throw new Error("Invalid location data");
          }
          await onAddLocations(data);
          setCurrentStepIndex(2);
          break;
        case 2:
          if (!data?.productName) {
            throw new Error("Invalid product data");
          }
          await onAddProducts(data);
          setCurrentStepIndex(3);
          break;
        case 3:
          if (!data?.memberName) {
            throw new Error("Invalid team member data");
          }
          await onAddTeamMembers(data);
          setCurrentStepIndex(4);
          break;
      }
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