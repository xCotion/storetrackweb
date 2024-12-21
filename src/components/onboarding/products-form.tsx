"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsFormData } from "@/types/onboarding";

interface ProductsFormProps {
  onSubmit: (data: ProductsFormData) => void;
  isLoading: boolean;
}

export const ProductsForm = ({
  onSubmit,
  isLoading,
}: ProductsFormProps) => {
  const [productName, setProductName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productName,
      price: parseFloat(price)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input 
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Price</Label>
        <Input 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number" 
          step="0.01"
          placeholder="0.00"
          required
        />
      </div>
      <Button 
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
};