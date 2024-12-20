import { NotFoundPage } from "@/pages/errors/not-found";
import { useUser } from "@/providers/user";
import React, { Children } from "react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isLogged, user } = useUser();

  return isLogged && user?.role === "administrator" ? (
    children
  ) : (
    <NotFoundPage />
  );
};

interface ManagerRouteProps {
  children: React.ReactNode;
}

const ManagerRoute = ({ children }: ManagerRouteProps) => {
  const { isLogged, user } = useUser();

  return isLogged && user?.role === "manager" ? children : <NotFoundPage />;
};

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isLogged, user } = useUser();

  return isLogged && user?.role === "guest" ? children : <NotFoundPage />;
};

interface MainRouteProps {
  children: React.ReactNode;
}

const MainRoute = ({ children }: MainRouteProps) => {
  const { isLogged, user } = useUser();

  return !isLogged || user?.role !== "administrator" ? (
    children
  ) : (
    <NotFoundPage />
  );
};

export { AdminRoute, ManagerRoute, GuestRoute, MainRoute };
