// import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { imageEndpoints } from "@/environments/api-endpoints";
// import { NotificationBell } from "@/pages/shared/notification-practice";
// import { useUser } from "@/providers/user";
// import { logout } from "@/services/user-service";
// import { AlignJustify, MoonIcon, SunIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import defaultAvatar from "../../assets/default_avatar.png";
// import logo from "../../assets/logo.png";

// export const Header = () => {
//   const navigate = useNavigate();
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const { isLogged, user, setUser, setIsLogged } = useUser();
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const closeSheet = () => {
//     setIsSheetOpen(false);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setIsLogged(false);
//     logout();
//     navigate("/login");
//   };

//   const handleReservationsClick = () => {
//     if (user?.role === "manager") {
//       navigate(`${user.manager.restaurantId}/reservations`);
//     } else {
//       navigate("guest/reservations");
//     }
//     closeSheet();
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
//       <div className="flex items-center w-full justify-between">
//         <Link to="/">
//           <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />
//         </Link>

//         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//           <SheetTrigger asChild>
//             <Button className="lg:hidden" variant="outline">
//               <AlignJustify />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-[250px] p-4">
//             <SheetHeader>
//               <SheetTitle>Navigation</SheetTitle>
//             </SheetHeader>
//             <div className="mt-4 flex flex-col space-y-4">
//               {isLogged && (
//                 <>
//                   <div className=" flex justify-between">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger className="focus:outline-none">
//                         <Avatar>
//                           <AvatarImage
//                             src={
//                               !user || !user.id
//                                 ? defaultAvatar
//                                 : imageEndpoints.getAvatarByAvatarUrl(
//                                     user.avatarUrl
//                                   )
//                             }
//                           />
//                           <AvatarFallback>4Rate</AvatarFallback>
//                         </Avatar>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent>
//                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItemLink
//                           location="profile"
//                           name="Profile"
//                         />
//                         <DropdownMenuItemLink
//                           onAction={handleLogout}
//                           location="/login"
//                           name="Logout"
//                         />
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                     <button onClick={toggleTheme} className="p-2">
//                       {isDarkMode ? (
//                         <SunIcon className="h-6 w-6 text-yellow-400" />
//                       ) : (
//                         <MoonIcon className="h-6 w-6 text-gray-600" />
//                       )}
//                     </button>
//                     {isLogged && <NotificationBell />}
//                   </div>
//                   <Button
//                     className="bg-slate-600 hover:bg-slate-900 text-white"
//                     onClick={handleReservationsClick}
//                   >
//                     Reservations
//                   </Button>
//                   {user?.role === "manager" && (
//                     <Button
//                       className="bg-slate-600 hover:bg-slate-900 text-white"
//                       onClick={() => navigate("manager")}
//                     >
//                       Restaurant
//                     </Button>
//                   )}
//                   <Button
//                     className="bg-slate-600 hover:bg-slate-900 text-white"
//                     onClick={() => navigate("/profile")}
//                   >
//                     Profile
//                   </Button>
//                   <Button
//                     className="bg-slate-600 hover:bg-slate-900 text-white"
//                     onClick={() => navigate("")}
//                   >
//                     Main page
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={handleLogout}
//                     className="mt-4"
//                   >
//                     Logout
//                   </Button>
//                 </>
//               )}
//               {!isLogged && (
//                 <Button
//                   className="bg-slate-600 hover:bg-slate-900 text-white"
//                   onClick={() => navigate("/login")}
//                 >
//                   Get started
//                 </Button>
//               )}
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       <div className="hidden lg:flex items-center space-x-4">
//         {!isLogged && (
//           <Button
//             className="bg-slate-600 hover:bg-slate-900 text-white"
//             onClick={() => navigate("/login")}
//           >
//             Get started
//           </Button>
//         )}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-full border border-gray-300 dark:border-gray-700"
//         >
//           {isDarkMode ? (
//             <SunIcon className="h-6 w-6 text-yellow-400" />
//           ) : (
//             <MoonIcon className="h-6 w-6 text-gray-600" />
//           )}
//         </button>
//         {isLogged && (
//           <>
//             <Button
//               className="bg-slate-600 hover:bg-slate-900 text-white px-4 py-2 rounded-md"
//               onClick={handleReservationsClick}
//             >
//               Reservations
//             </Button>
//             {user?.role === "manager" && (
//               <Link
//                 className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md"
//                 to="manager"
//               >
//                 Restaurant
//               </Link>
//             )}

//             {isLogged && <NotificationBell />}
//             <DropdownMenu>
//               <DropdownMenuTrigger className="focus:outline-none">
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       !user || !user.id
//                         ? defaultAvatar
//                         : imageEndpoints.getAvatarByAvatarUrl(user.avatarUrl)
//                     }
//                   />
//                   <AvatarFallback>4Rate</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItemLink location="profile" name="Profile" />
//                 <DropdownMenuItemLink
//                   onAction={handleLogout}
//                   location="/login"
//                   name="Logout"
//                 />
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };
import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { imageEndpoints } from "@/environments/api-endpoints";
import { NotificationBell } from "@/pages/shared/notification-practice";
import { useUser } from "@/providers/user";
import { logout } from "@/services/user-service";
import { AlignJustify, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/default_avatar.png";
import logo from "../../assets/logo.png";
import LanguageSwitcher from "@/components/shared/language-switch";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isLogged, user, setUser, setIsLogged } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
    logout();
    navigate("/login");
  };

  const handleReservationsClick = () => {
    if (user?.role === "manager") {
      navigate(`${user.manager.restaurantId}/reservations`);
    } else {
      navigate("guest/reservations");
    }
    closeSheet();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center w-full justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />
        </Link>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="lg:hidden" variant="outline">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-4">
            <SheetHeader>
              <SheetTitle>{t("Navigation")}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4">
              {isLogged && (
                <>
                  <div className="flex justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar>
                          <AvatarImage
                            src={
                              !user || !user.id
                                ? defaultAvatar
                                : imageEndpoints.getAvatarByAvatarUrl(
                                    user.avatarUrl
                                  )
                            }
                          />
                          <AvatarFallback>4Rate</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{t("My_Account")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItemLink
                          location="profile"
                          name={t("Profile")}
                        />
                        <DropdownMenuItemLink
                          onAction={handleLogout}
                          location="/login"
                          name={t("Logout")}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <LanguageSwitcher />
                    <button onClick={toggleTheme} className="p-2">
                      {isDarkMode ? (
                        <SunIcon className="h-6 w-6 text-yellow-400" />
                      ) : (
                        <MoonIcon className="h-6 w-6 text-gray-600" />
                      )}
                    </button>
                    {isLogged && <NotificationBell />}
                  </div>
                  <Button
                    className="bg-slate-600 hover:bg-slate-900 text-white"
                    onClick={handleReservationsClick}
                  >
                    {t("Reservations")}
                  </Button>
                  {user?.role === "manager" && (
                    <Button
                      className="bg-slate-600 hover:bg-slate-900 text-white"
                      onClick={() => navigate("manager")}
                    >
                      {t("Resturant")}
                    </Button>
                  )}
                  <Button
                    className="bg-slate-600 hover:bg-slate-900 text-white"
                    onClick={() => navigate("/profile")}
                  >
                    {t("Profile")}
                  </Button>
                  <Button
                    className="bg-slate-600 hover:bg-slate-900 text-white"
                    onClick={() => navigate("")}
                  >
                    {t("Main_Page")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="mt-4"
                  >
                    {t("Logout")}
                  </Button>
                </>
              )}
              {!isLogged && (
                <Button
                  className="bg-slate-600 hover:bg-slate-900 text-white"
                  onClick={() => navigate("/login")}
                >
                  {t("Get_started")}
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        {!isLogged && (
          <Button
            className="bg-slate-600 hover:bg-slate-900 text-white"
            onClick={() => navigate("/login")}
          >
            {t("Get_started")}
          </Button>
        )}

        {isLogged && (
          <>
            <Button
              className="bg-slate-600 hover:bg-slate-900 text-white px-4 py-2 rounded-md"
              onClick={handleReservationsClick}
            >
              {t("Reservations")}
            </Button>
            {user?.role === "manager" && (
              <Link
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md"
                to="manager"
              >
                {t("Restaurant")}
              </Link>
            )}
            <NotificationBell />
          </>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-700"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
        <LanguageSwitcher />
        {isLogged && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage
                  src={
                    !user || !user.id
                      ? defaultAvatar
                      : imageEndpoints.getAvatarByAvatarUrl(user.avatarUrl)
                  }
                />
                <AvatarFallback>4Rate</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{t("My_Account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItemLink location="profile" name={t("Profile")} />
              <DropdownMenuItemLink
                onAction={handleLogout}
                location="/login"
                name={t("Logout")}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
