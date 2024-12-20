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
  onAction: (id: number, action: string) => void;
  onEdit: (category: Category) => void;
  t: (key: string) => string;
}

export type Category = {
  id: number;
  name: string;
  status: boolean;
};

export const columns = (props: ColumnProps): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: props.t("Id"),
  },
  {
    accessorKey: "name",
    header: props.t("Name"),
  },
  {
    accessorKey: "status",
    header: props.t("Status"),
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === true)
        return <Badge variant="success">{props.t("active")}</Badge>;
      else if (statusValue === false)
        return <Badge variant="destructive">{props.t("active")}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const id = user.id;

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
              {row.getValue("status") === false && (
                <DropdownMenuItem
                  onClick={() => props.onAction(id, "activate")}
                >
                  {props.t("activate")}
                </DropdownMenuItem>
              )}
              {row.getValue("status") === true && (
                <DropdownMenuItem onClick={() => props.onAction(id, "block")}>
                  {props.t("block")}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => props.onEdit(row.original)}>
                {props.t("edit")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
