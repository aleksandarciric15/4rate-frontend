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
import { ReservationStatus } from "@/types/reservation";
import { Reservation } from "@/types/restaurant";

interface ColumnProps {
  onAction: (reservationId: number, path: string, action: string) => void;
  t: (key: string) => string;
}

export const columns = (props: ColumnProps): ColumnDef<Reservation>[] => [
  {
    accessorKey: "id",
    header: props.t("Id"),
  },
  {
    accessorKey: "description",
    header: props.t("description"),
  },
  {
    accessorKey: "guest.userAccount.firstName",
    header: props.t("first_name"),
  },
  {
    accessorKey: "guest.userAccount.lastName",
    header: props.t("last_name"),
  },
  {
    accessorKey: "date",
    header: props.t("Date"),
  },
  {
    accessorKey: "time",
    header: props.t("Time"),
  },
  {
    accessorKey: "status",
    header: props.t("Status"),
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === ReservationStatus.APPROVED)
        return <Badge variant="success">{props.t("approved")}</Badge>;
      else if (statusValue === ReservationStatus.PENDING)
        return <Badge variant="default">{props.t("pending")}</Badge>;
      else if (statusValue === ReservationStatus.CANCELED)
        return <Badge variant="warning">{props.t("canceled")}</Badge>;
      else if (statusValue === ReservationStatus.DENIED)
        return <Badge variant="destructive">{props.t("denied")}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reservation: Reservation = row.original;

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
              {reservation.status === "pending" && (
                <div>
                  <DropdownMenuItem
                    onClick={() =>
                      props.onAction(
                        reservation.id,
                        "approveReservation",
                        "approve"
                      )
                    }
                  >
                    {props.t("approve")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      props.onAction(reservation.id, "denyReservation", "deny")
                    }
                  >
                    {props.t("deny")}
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
