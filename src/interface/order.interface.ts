import { User } from "@/pages/interface/User";

export interface Order {
  id: number;
  created_at: string;
  status: string;
  serialNumber: string;
  totalPrice: number;
  user: User;
  receiveName: string;
  district: string;
  province: string;
  streetAddress: string;
  ward: string;
  phone: string;
  note: string;
}
