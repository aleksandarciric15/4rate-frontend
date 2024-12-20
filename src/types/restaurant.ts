export type RestaurantBlockFormData = {
  restaurantId: number;
  description: string;
};

export type RestaurantRequest = {
  id: number;
  name: string;
  description: string;
  workTime: string;
  // manager_id: number; this should be object, cause we need name of manager and other data possible
};

export type UserAccount = {
  id: number;
  username: string;
  role: string;
  status: string;
  confirmed: boolean;
  email: string;
  createdAt: Date | null;
  avatarUrl: string | null;
  dateOfBirth: Date | null;
  firstName: string;
  lastName: string;
};

export type Guest = {
  id: number;
  userAccount: UserAccount;
};

export type Comment = {
  id: number;
  comment: string;
  guest: Guest;
};

export type Image = {
  id: number;
  imageUrl: string;
};

export type Reservation = {
  id: number;
  date: Date;
  time: string;
  description: string;
  status: string;
  guest: Guest;
  restaurant: RestaurantInfoDTO;
};

export type RestaurantInfoDTO = {
  id: number;
  name: string;
  description: string;
  workTime: string;
  status: string;
  address: string;
  city: string;
  country: string;
};

export type Category = {
  id: number;
  name: string;
  status: boolean;
};

export type RestaurantCategory = {
  id: number;
  category: Category;
};

export type Grade = {
  id: number;
  value: number;
  restaurantId: number;
  guestId: number;
};

export type Phone = {
  id: number;
  phone: string;
};

export type Review = {
  id: number;
  comment: string;
  grade: number;
  guest: Guest;
  restaurantId: number;
  createdAt: Date;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  workTime: string;
  status: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  manager: ManagerDTO;
  restaurantPhones: Phone[];
  images: Image[];
  comments: Comment[];
  reviews: Review[];
  reservations: Reservation[];
  restaurantCategories: RestaurantCategory[];
  grades: Grade[];
};

export type ManagerDTO = {
  id: number;
  userAccount: UserAccount;
};

export type RestaurantsPerMonth = {
  year: number;
  month: number;
  restaurantCount: number;
};

export type RestaurantChartData = {
  month: string;
  restaurantCount: number;
};
