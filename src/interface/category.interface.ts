export interface CategoryApiInterface {
    name: string;
    image: string;
    description: string;
  }

  export interface Category {
    id: number;
    name: string;
    image: string;
    description: string;
    status: boolean;
    created_at: string;
  }
  
