"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationsFormData } from "@/types/onboarding";

interface LocationsFormProps {
  onSubmit: (data: LocationsFormData) => void;
  isLoading: boolean;
}

export const LocationsForm = ({
  onSubmit,
  isLoading,
}: LocationsFormProps) => {
  const [locationName, setLocationName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      locationName,
      address
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Location Name</Label>
        <Input 
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Enter location name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Address</Label>
        <Input 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
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