import { reservationEndpoints } from "@/environments/api-endpoints";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user";
import { Reservation } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTranslation } from "react-i18next";

export default function UserReservationsPage() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [data, setData] = useState<Reservation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get<Reservation[]>(
          reservationEndpoints.getAllGuestReservations(user?.id)
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActions = (
    reservationId: number,
    path: string,
    action: string
  ) => {
    let apiPath = reservationEndpoints.reservationActions(path, reservationId);
    axios
      .put(apiPath)
      .then((response) => {
        console.log(response);
        if (action === "cancel") {
          const message = t("Successfuly canceled reservation!");
          toast({
            variant: "success",
            title: t("Reservation"),
            description: message,
          });
          setData(
            (prevData) =>
              prevData?.filter((elem) => elem.id !== reservationId) || []
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: t("Reservation"),
          description: error.response.data,
        });
      });
  };

  if (loading) return <p>Loading...</p>;
  //   if (error || !data) return <p>{error}</p>;

  return (
    <div className="m-1 md:m-3 lg:m-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">{t("Reservations")}</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({
            onAction: handleActions,
            t: t,
          })}
          data={data || []}
        >
          <></>
        </DataTable>
      </div>
    </div>
  );
}
