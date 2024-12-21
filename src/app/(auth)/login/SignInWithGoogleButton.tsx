'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { GoogleIcon } from "@/components/icons/google"

const SignInWithGoogleButton = () => {
  return (
    <Button
     type="button" 
     variant="outline" 
     className="w-full"
     onClick={() => {
        SignInWithGoogle();
     }}
     >
      <GoogleIcon className="mr-2 h-4 w-4" />
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;