export type User = {
  id: number;
  username: string;
  role: string;
  status: string;
  confirmed: boolean;
  email: string;
  createdAt: string;
  avatarUrl: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  manager: ManagerLogin;
  administrator: AdminLogin;
  guest: GuestLogin;
};

export type ManagerLogin = {
  id: number;
  restaurantId: number;
};

export type GuestLogin = {
  id: number;
};

export type AdminLogin = {
  id: number;
};

export type UserAccountCreation = {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  email: string;
};

export type UserProfileData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBrith: Date;
};

export type UsersPerMonth = {
  year: number;
  month: number;
  userCount: number;
};

export type UsersChartData = {
  month: string;
  userCount: number;
};
