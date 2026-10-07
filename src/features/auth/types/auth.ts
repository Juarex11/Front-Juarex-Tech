export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  role: {
    name: string;
  };
}
