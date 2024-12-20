import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import { NotificationProvider } from "./providers/notification.tsx";
import { UserProvider } from "./providers/user.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </NotificationProvider>
);
