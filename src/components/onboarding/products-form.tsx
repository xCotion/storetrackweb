"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProductsForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: { productName: string; price: string }) => void;
  isLoading: boolean;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productName = (document.getElementById("productName") as HTMLInputElement).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    
    if (productName && price) {
      onSubmit({ productName, price });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input 
          id="productName" 
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Price</Label>
        <Input 
          id="price" 
          type="number" 
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