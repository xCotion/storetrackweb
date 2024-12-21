"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TeamForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: { memberName: string; role: string }) => void;
  isLoading: boolean;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = {
          memberName: (document.getElementById("memberName") as HTMLInputElement).value,
          role: (document.getElementById("role") as HTMLInputElement).value,
        };
        onSubmit(data);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Team Member Name</Label>
        <Input id="memberName" placeholder="Enter team member name" />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Input id="role" placeholder="e.g. Manager, Sales, Support" />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Team Member"}
      </Button>
    </form>
  );
};
