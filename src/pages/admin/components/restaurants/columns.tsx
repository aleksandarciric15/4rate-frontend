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

interface ColumnProps {
  onBlock: (resturant: Restaurant) => void;
  t: (key: string) => string;
}

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  work_time: string;
  status: string;
};

export const columns = (props: ColumnProps): ColumnDef<Restaurant>[] => [
  {
    accessorKey: "id",
    header: props.t("Id"),
  },
  {
    accessorKey: "name",
    header: props.t("Name"),
  },
  {
    accessorKey: "description",
    header: props.t("description"),
  },
  {
    accessorKey: "workTime",
    header: props.t("work_time"),
  },
  {
    accessorKey: "status",
    header: props.t("Status"),
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === "active")
        return <Badge variant="success">{props.t("active")}</Badge>;
      else return <Badge variant="destructive">{props.t("active")}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const restaurant = row.original;

      return (
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
              {row.getValue("status") === "active" && (
                <DropdownMenuItem onClick={() => props.onBlock(restaurant)}>
                  {props.t("block")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
