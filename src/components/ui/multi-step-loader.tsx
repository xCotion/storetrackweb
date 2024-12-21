"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BusinessForm } from "@/components/onboarding/business-form";
import { ProductsForm } from "@/components/onboarding/products-form";
import { TeamForm } from "@/components/onboarding/team-form";
import { useEffect, useState } from "react";
import { BusinessFormData, ProductsFormData, TeamFormData, OnboardingProgress, LocationsFormData } from "@/types/onboarding";
import { LocationsForm } from "../onboarding/locations-form";

interface MultiStepLoaderProps {
  steps: Array<{ text: string; required: boolean }>;
  visible: boolean;
  currentStep: number;
  progress: OnboardingProgress;
  isLoading: boolean;
  onStepAction: (step: number, data?: any) => Promise<void>;
  canClose: boolean;
  onClose: () => void;
}

export const MultiStepLoader = ({
  steps,
  visible,
  currentStep,
  progress,
  isLoading,
  onStepAction,
  canClose,
  onClose,
}: MultiStepLoaderProps) => {
  const [countdown, setCountdown] = useState(5);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (progress.hasBusiness && progress.hasLocations && progress.hasProducts && progress.hasTeamMembers) {
      const startTime = Date.now();
      const duration = 5000;

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        setCountdown(Math.ceil(remaining / 1000));
        setProgressValue(Math.min(100, (elapsed / duration) * 100));

        if (remaining <= 0) {
          clearInterval(timer);
          onClose();
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [progress, onClose]);

  useEffect(() => {
    const requiredStepsCompleted =
      progress.hasBusiness &&
      progress.hasLocations &&
      (!steps[2].required || progress.hasProducts) &&
      (!steps[3].required || progress.hasTeamMembers);
  
    if (requiredStepsCompleted) {
      const startTime = Date.now();
      const duration = 5000;
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        setCountdown(Math.ceil(remaining / 1000));
        setProgressValue(Math.min(100, (elapsed / duration) * 100));
        if (remaining <= 0) {
          clearInterval(timer);
          onClose();
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [progress, onClose]);
  

  const renderStepForm = (step: number) => {
    if (progress.hasBusiness  && progress.hasLocations && progress.hasProducts && progress.hasTeamMembers) {
      // Show the "All Set!" message
      return (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">All Set!</h3>
          <p className="text-muted-foreground">
            You've completed all the steps. Your business is ready to go.
          </p>
          <Button onClick={onClose}>Get Started</Button>
          <div className="mt-8 space-y-2">
            <Progress value={progressValue} className="h-1" />
            <p className="text-xs text-muted-foreground">
              Closing in {countdown}...
            </p>
          </div>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <BusinessForm
            onSubmit={async (data: BusinessFormData) => {
              await onStepAction(0, data);
            }}
            onNext={() => {
              onStepAction(0);
            }}
            isLoading={isLoading}
          />
        );
        case 1:
          return (
            <LocationsForm
              onSubmit={async () => {
                const data: LocationsFormData = {
                  locationName: "",
                  address: ""
                };
                await onStepAction(1, data);
              }}
              isLoading={isLoading}
            />
          );
          case 2:
            return (
              <ProductsForm
                onSubmit={async (data) => {
                  await onStepAction(2, data);
                  // Reset the form data after submission
                  data.productName = "";
                  data.price = "";
                }}
                isLoading={isLoading}
              />
            );          
            case 3:
              return (
                <TeamForm
                  onSubmit={async () => {
                    const data: TeamFormData = {
                      memberName: "",
                      role: ""
                    };
                    await onStepAction(3, data);
                  }}
                  isLoading={isLoading}
                />
              );            
            
      default:
        return null;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95">
      <div className="relative flex max-w-7xl w-full mx-auto px-12 min-h-[600px]">
        {canClose && (
          <Button
            variant="ghost"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            Skip remaining steps
          </Button>
        )}

        <div className="flex w-full gap-16 items-center">
          <div className="w-2/5 space-y-8 self-center">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "flex items-center space-x-6 py-3",
                  currentStep === idx ? "text-primary" : "text-muted-foreground"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2",
                    currentStep === idx
                      ? "border-primary"
                      : "border-muted-foreground"
                  )}
                />
                <span>
                  {step.text} {step.required && " (Required)"}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="w-3/5 self-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-8 rounded-lg border shadow-lg"
              >
                {renderStepForm(currentStep)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};