'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";
import { AppleIcon } from "@/components/icons/apple";
import { sign } from "crypto";

const SignInWithAppleButton = () => {
  return (
    <Button 
    type="button" 
    variant="outline"
    className="w-full"
    onClick={() => {
        SignInWithApple();
      }}
    >
      <AppleIcon className="mr-2 h-4 w-4" />
      Login with Apple
    </Button>
  );
};

export default SignInWithAppleButton;
