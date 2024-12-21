"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LocationsForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Location Name</Label>
        <Input 
          id="locationName" 
          placeholder="Enter location name"
        />
      </div>
      <div className="space-y-2">
        <Label>Address</Label>
        <Input 
          id="address" 
          placeholder="Enter address"
        />
      </div>
      <Button 
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Location"}
      </Button>
    </form>
  );
};