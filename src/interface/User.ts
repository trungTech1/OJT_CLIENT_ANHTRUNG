export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  roles: Role[];
  status: boolean;
  is_deleted: string;
  created_at: string;
  updated_at: string;
}
interface Role {
  roleName: string;
  // include other role properties here if necessary
}
