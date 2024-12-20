import { About } from "@/components/shared/about";
import UserProfile from "@/components/shared/user-details";
import Admin from "@/pages/admin/admin";
import CategoriesTable from "@/pages/admin/components/categories/page";
import Dashboard from "@/pages/admin/components/dashboard/dashboard";
import RestaurantRequestsTable from "@/pages/admin/components/restaurant-requests/page";
import RestaurantsTable from "@/pages/admin/components/restaurants/page";
import UsersTable from "@/pages/admin/components/users/page";
import { LoginForm } from "@/pages/auth/login/login";
import { RegisterForm } from "@/pages/auth/register/register";
import { NotFoundPage } from "@/pages/errors/not-found";
import UserReservationsPage from "@/pages/guest/components/reservations/page";
import AddReview from "@/pages/guest/components/review-add";
import GuestDashboard from "@/pages/guest/guest";
import { DefaultLayout } from "@/pages/layouts/default-layout";
import { MainPage, RestaurantsGrid } from "@/pages/main-page/main";
import EditRestaurantPage from "@/pages/manager/components/edit-restaurant-form";
import RestaurantImageUpload from "@/pages/manager/components/image-upload";
import ReservationsPage from "@/pages/manager/components/reservations/page";
import RestaurantPage from "@/pages/manager/components/restaurant-page";
import ManagerDashboard from "@/pages/manager/manager";
import { RestaurantDetailsPage } from "@/pages/shared/restaurant-details";
import { NotificationPage } from "@/pages/shared/notification-practice";
import { createBrowserRouter } from "react-router-dom";
import { AdminRoute, GuestRoute, MainRoute, ManagerRoute } from "./admin-route";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: "",
            element: (
              <MainRoute>
                <RestaurantsGrid />
              </MainRoute>
            ),
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: ":id/restaurant",
            element: <RestaurantDetailsPage />,
          },
          {
            path: "notifications",
            element: <NotificationPage />,
          },
          {
            path: ":id/reservations",
            element: <ReservationsPage />,
          },
          {
            path: "manager",
            element: (
              <ManagerRoute>
                <ManagerDashboard />
              </ManagerRoute>
            ),
            children: [
              {
                path: "",
                element: <RestaurantPage />,
              },
              {
                path: ":id/edit",
                element: <EditRestaurantPage />,
              },
              {
                path: ":id/addImages",
                element: <RestaurantImageUpload />,
              },
            ],
          },
          {
            path: "guest",
            element: (
              <GuestRoute>
                <GuestDashboard />
              </GuestRoute>
            ),
            children: [
              {
                path: "reservations",
                element: <UserReservationsPage />,
              },
              {
                path: ":id/addReview",
                element: <AddReview />,
              },
            ],
          },
          { path: "profile", element: <UserProfile /> },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      { path: "users", element: <UsersTable /> },
      { path: "categories", element: <CategoriesTable /> },
      { path: "restaurants", element: <RestaurantsTable /> },
      { path: "resturant-requests", element: <RestaurantRequestsTable /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
]);

export default router;
