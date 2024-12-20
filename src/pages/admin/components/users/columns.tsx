import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import { useUser } from "@/providers/user";
import { sudoAdminUsername } from "@/environments/env";
import { t } from "i18next";

interface ColumnProps {
  onAction: (userAccountId: number, path: string, action: string) => void;
  t: (key: string) => string;
}

export const columns = (props: ColumnProps): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: props.t("Id"),
  },
  {
    accessorKey: "username",
    header: props.t("Username"),
  },
  {
    accessorKey: "firstName",
    header: props.t("first_name"),
  },
  {
    accessorKey: "lastName",
    header: props.t("last_name"),
  },
  {
    accessorKey: "role",
    header: props.t("Role"),
    cell: ({ row }) => {
      const roleValue = row.getValue("role");
      if (roleValue === "guest")
        return <Badge variant="blue">{props.t("guest")}</Badge>;
      else if (roleValue === "manager")
        return <Badge variant="success">{props.t("manager")}</Badge>;
      else if (
        roleValue === "administrator" &&
        row.getValue("username") === "admin"
      )
        return <Badge variant="destructive">{props.t("administrator")}</Badge>;
      else return <Badge variant="warning">{props.t("administrator")}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === "active")
        return <Badge variant="success">active</Badge>;
      else if (statusValue === "suspended")
        return <Badge variant="warning">suspended</Badge>;
      else if (statusValue === "block")
        return <Badge variant="destructive">blcoked</Badge>;
    },
  },
  {
    accessorKey: "confirmed",
    header: props.t("Confirmed"),
    cell: ({ row }) => {
      const confirmedValue = row.getValue("confirmed");

      if (confirmedValue === true) return <Badge variant="success">true</Badge>;
      else return <Badge variant="destructive">false</Badge>;
    },
  },
  {
    accessorKey: "email",
    header: props.t("Email"),
  },
  {
    accessorKey: "createdAt",
    header: props.t("CreatedAt"),
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formattedDate = createdAt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { user } = useUser();
      const currentUser = row.original;
      const userAccountId = currentUser.id;
      return currentUser.username !== sudoAdminUsername &&
        currentUser.id !== user?.id ? (
        <div className="flex justify-cente">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{props.t("Actions")}</DropdownMenuLabel>
              {row.getValue("confirmed") !== true &&
                currentUser.role !== "administrator" && (
                  <DropdownMenuItem
                    onClick={() =>
                      props.onAction(
                        userAccountId,
                        "/admin/confirmAccount",
                        "confirm"
                      )
                    }
                  >
                    {props.t("Confrim")}
                  </DropdownMenuItem>
                )}
              {row.getValue("status") !== "block" && (
                <>
                  {row.getValue("status") !== "active" && (
                    <DropdownMenuItem
                      onClick={() =>
                        props.onAction(
                          userAccountId,
                          "/admin/unsuspend",
                          "activate"
                        )
                      }
                    >
                      {props.t("activate")}
                    </DropdownMenuItem>
                  )}

                  {row.getValue("status") !== "suspended" && (
                    <DropdownMenuItem
                      onClick={() =>
                        props.onAction(
                          userAccountId,
                          "/admin/suspend",
                          "suspend"
                        )
                      }
                    >
                      {props.t("suspend")}
                    </DropdownMenuItem>
                  )}
                  {row.getValue("status") !== "block" && (
                    <DropdownMenuItem
                      onClick={() =>
                        props.onAction(userAccountId, "/admin/block", "block")
                      }
                    >
                      {props.t("block")}
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <></>
      );
    },
  },
];
