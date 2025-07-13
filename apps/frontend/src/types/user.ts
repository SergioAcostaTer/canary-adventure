export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  role: "user" | "admin";
  plan: "free" | "pro";
  locale: string;
  isActive: boolean;
}
