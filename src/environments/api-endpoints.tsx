import { BASE_URL } from "./env";

const USERS_API = `${BASE_URL}/userAccounts`;
export const userEndpoints = {
  changePassword: () => `${USERS_API}/passwordChange`,
  updateUserAccount: () => `${USERS_API}/updateUserAccount`,
  login: () => `${USERS_API}/login`,
  createAccount: () => `${USERS_API}/createAccount`,
};

const IMAGES_API = `${BASE_URL}/images`;
export const imageEndpoints = {
  uploadAvatar: (id: number) => `${IMAGES_API}/uploadAvatar/${id}`,
  getAvatarByAvatarUrl: (avatarUrl: string) =>
    `${IMAGES_API}/getAvatar?avatarUrl=${avatarUrl}`,
  getAvatarByUserId: (userId: number) => `${IMAGES_API}/getAvatar/${userId}`,
  getRestaurantImage: (restaurantId: number, imageUrl: string) =>
    `${IMAGES_API}/getImage/${restaurantId}/${imageUrl}`,
  uploadRestaurantImages: (id: string) =>
    `${IMAGES_API}/uploadRestaurantImages/${id}`,
};

const ADMIN_API = `${BASE_URL}/admin`;
export const adminEndpoints = {
  getUser: (userId: number) => `${ADMIN_API}/getUser/${userId}`,
  getAllAccounts: () => `${ADMIN_API}/getAllAccounts`,
  createAdminAccount: () => `${ADMIN_API}/createAdminAccount`,
};

const CATEGORIES_API = `${BASE_URL}/categories`;
export const categoryEndpoints = {
  addCategory: () => `${CATEGORIES_API}/add`,
  editCategory: () => `${CATEGORIES_API}/edit`,
  getAll: () => `${CATEGORIES_API}/getAll`,
  categoryActions: (id: number, action: string) =>
    `${CATEGORIES_API}/${action}/${id}`,
};

const ANALYTICS_API = `${BASE_URL}/analytics`;
export const analyticEndpoints = {
  getAllCounts: () => `${ANALYTICS_API}/getAllCounts`,
  getRestaurantStats: () => `${ANALYTICS_API}/restaurant-stats`,
  getUserStats: () => `${ANALYTICS_API}/user-stats`,
};

const REQUEST_FOR_RESTAURANTS_API = `${BASE_URL}/requestForRestaurants`;
export const requestForRestaurantsEndpoints = {
  getAllRequests: () => `${REQUEST_FOR_RESTAURANTS_API}/getAllRequests`,
  requestActions: (endpoint: string, id: number) =>
    `${REQUEST_FOR_RESTAURANTS_API}/${endpoint}/${id}`,
  createRequest: (id: number) =>
    `${REQUEST_FOR_RESTAURANTS_API}/createRequest/${id}`,
};

const RESTAURANTS_API = `${BASE_URL}/restaurants`;
export const restaurantEndpoints = {
  getAll: () => `${RESTAURANTS_API}/getAll`,
  block: () => `${RESTAURANTS_API}/block`,
  getRestaurantById: (id: string = "") =>
    `${RESTAURANTS_API}/getRestaurantById/${id}`,
  getRestaurantByUserId: (userId: number) =>
    `${RESTAURANTS_API}/getRestaurant/${userId}`,
  updateRestaurant: () => `${RESTAURANTS_API}/updateRestaurant`,
};

const RESERVATIONS_API = `${BASE_URL}/reservations`;
export const reservationEndpoints = {
  getAllGuestReservations: (id: number) =>
    `${RESERVATIONS_API}/getAllGuestReservations/${id}`,
  reservationActions: (path: string, reservationId: number) =>
    `${RESERVATIONS_API}/${path}/${reservationId}`,
  getAllRestaurantReservations: (restaurantId: string) =>
    `${RESERVATIONS_API}/getAllRestaurantReservations/${restaurantId}`,
  getAllRestaurantReservationsByDate: (restaurantId: string) =>
    `${RESERVATIONS_API}/getAllRestaurantReservationsByDate/${restaurantId}`,
  makeReservation: () => `${RESERVATIONS_API}/makeReservation`,
};

const REVIEWS_API = `${BASE_URL}/reviews`;
export const reviewEndpoints = {
  add: (restaurantId: string) => `${REVIEWS_API}/add/${restaurantId}`,
};

const MANAGER_API = `${BASE_URL}/manager`;
export const managerEndpoints = {
  restaurantStatus: (userId: number) =>
    `${MANAGER_API}/restaurant-status/${userId}`,
  pdf: (restaurantId: number) => `${MANAGER_API}/pdf/${restaurantId}`,
};

const NOTIFICATIONS_API = `${BASE_URL}/notifications`;
export const notificationEndpoinst = {
  unread: (userId: number) => `${NOTIFICATIONS_API}/unread/${userId}`,
  stream: (userId: number) => `${NOTIFICATIONS_API}/stream/${userId}`,
  read: (userId: number) => `${NOTIFICATIONS_API}/read/${userId}`,
};
