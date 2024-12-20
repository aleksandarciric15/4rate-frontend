import { imageEndpoints } from "@/environments/api-endpoints";
import { useUser } from "@/providers/user";
import { logout } from "@/services/user-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/default_avatar.png";
import logo from "../../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DropdownMenuItemLink from "./dropdown-menu-item-link";
import LanguageSwitcher from "./language-switch";
import { ThemeToggler } from "./theme-toggler";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, setUser, setIsLogged } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />

      <div className="flex items-center">
        <div className="mr-5">
          <LanguageSwitcher />
        </div>
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage
                src={
                  user
                    ? imageEndpoints.getAvatarByAvatarUrl(user.avatarUrl)
                    : defaultAvatar
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
      </div>
    </div>
  );
};

export default Navbar;
