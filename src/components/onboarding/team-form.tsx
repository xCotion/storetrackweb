"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TeamFormData } from "@/types/onboarding";

interface TeamFormProps {
  onSubmit: (data: TeamFormData) => void;
  isLoading: boolean;
}

export const TeamForm = ({
  onSubmit,
  isLoading,
}: TeamFormProps) => {
  const [memberName, setMemberName] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      memberName,
      role
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Team Member Name</Label>
        <Input 
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          placeholder="Enter team member name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Input 
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Manager, Sales, Support"
          required
        />
      </div>
      <Button 
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Team Member"}
      </Button>
    </form>
  );
};