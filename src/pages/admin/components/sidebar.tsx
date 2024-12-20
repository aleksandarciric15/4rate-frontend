import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Folders,
  LayoutDashboard,
  Newspaper,
  StickyNote,
  User,
  Utensils,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Sidebar() {
  const { t } = useTranslation();
  return (
    <Command className="bg-slate-200 rounded-none dark:bg-slate-700 border dark:border-y-white">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList>
        <CommandEmpty>{t("No results")}</CommandEmpty>
        <CommandGroup heading={t("General")}>
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link to="">{t("Dashboard")}</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link to="users">{t("Users")}</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h-4 w-4" />
            <Link to="categories">{t("Categories")}</Link>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading={t("Restaurant")}>
          <CommandItem>
            <Utensils className="mr-2 h-4 w-4" />
            <Link to="restaurants">{t("Restaurants")}</Link>
          </CommandItem>
          <CommandItem>
            <StickyNote className="mr-2 h-4 w-4" />
            <Link to="resturant-requests">{t("RequestsForRestaurant")}</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("Settings")}>
          <CommandItem>
            <User className="mr-2 w-4 h-4" />
            <Link to="profile">{t("Profile")}</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Sidebar;
