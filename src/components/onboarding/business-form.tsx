"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessFormData {
  businessName: string;
  businessNumber?: string;
  dateFounded: Date;
  country: string;
}

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData) => Promise<void>;
  onNext: () => void;  // Make this required
  isLoading: boolean;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ 
  onSubmit, 
  onNext,
  isLoading 
}) => {
  const [businessName, setBusinessName] = React.useState("");
  const [businessNumber, setBusinessNumber] = React.useState("");
  const [dateFounded, setDateFounded] = React.useState<Date | undefined>();
  const [country, setCountry] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (!businessName.trim()) {
      console.error("Business name is required");
      return;
    }
    if (!dateFounded) {
      console.error("Date founded is required");
      return;
    }
    if (!country) {
      console.error("Country is required");
      return;
    }

    try {
      await onSubmit({
        businessName: businessName.trim(),
        businessNumber: businessNumber.trim() || undefined,
        dateFounded,
        country,
      });
      
      // Call onNext after successful submission
      onNext();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          placeholder="Enter your business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      {/* Date Founded */}
      <div className="space-y-2">
        <Label htmlFor="dateFounded">Date Founded</Label>
        <DatePicker
          selected={dateFounded}
          onSelect={setDateFounded}
        />
      </div>

      {/* Business Number (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="businessNumber">Business Number (Optional)</Label>
        <Input
          id="businessNumber"
          placeholder="Enter your business number"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
        />
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USA">United States</SelectItem>
            <SelectItem value="CAN">Canada</SelectItem>
            <SelectItem value="GBR">United Kingdom</SelectItem>
            <SelectItem value="AUS">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Business"}
      </Button>
    </form>
  );
};