export interface BusinessFormData {
    businessName: string;
    businessNumber?: string;
    dateFounded: Date;
    country: string;
  }
  
  export interface ProductsFormData {
    productName: string;
    price: number;
  }
  
  export interface TeamFormData {
    memberName: string;
    role: string;
  }

  export interface LocationsFormData {
    locationName: string;
    address: string;
  }
  
  export interface OnboardingProgress {
    hasBusiness: boolean;
    hasProducts: boolean;
    hasTeamMembers: boolean;
    hasLocations: boolean;
  }