export interface userDetails {
  full_name: string;
  email: string;
  password: string;
}

export interface getAllUserDetails {
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_Deleted: boolean;
}
