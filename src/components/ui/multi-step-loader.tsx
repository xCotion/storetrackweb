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

  const handleBusinessSubmit = async (data: BusinessFormData) => {
    await onStepAction(0, data);
  };

  const handleLocationSubmit = async (data: LocationsFormData) => {
    await onStepAction(1, data);
  };

  const handleProductSubmit = async (data: ProductsFormData) => {
    await onStepAction(2, data);
  };

  const handleTeamSubmit = async (data: TeamFormData) => {
    await onStepAction(3, data);
  };

  const isComplete = progress.hasBusiness && progress.hasLocations && 
                    progress.hasProducts && progress.hasTeamMembers;

  const renderStepForm = (step: number) => {
    if (isComplete) {
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
            onSubmit={handleBusinessSubmit}
            onNext={() => {}}
            isLoading={isLoading}
          />
        );
      case 1:
        return (
          <LocationsForm
            onSubmit={handleLocationSubmit}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <ProductsForm
            onSubmit={handleProductSubmit}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <TeamForm
            onSubmit={handleTeamSubmit}
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
      <div className="relative flex flex-col max-w-7xl w-full mx-auto px-12 min-h-[600px]">
        <div className="absolute top-4 right-4">
          {canClose && (
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Skip remaining steps
            </Button>
          )}
        </div>
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

          <div className="w-3/5 self-center space-y-4">
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
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-orange-500"
                onClick={onClose}
              >
                Close (Dev)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};