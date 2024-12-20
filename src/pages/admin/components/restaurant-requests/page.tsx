import { requestForRestaurantsEndpoints } from "@/environments/api-endpoints";
import { useToast } from "@/hooks/use-toast";
import { RestaurantRequest } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTranslation } from "react-i18next";

export default function RestaurantRequestsTable() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [data, setData] = useState<RestaurantRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RestaurantRequest[]>(
          requestForRestaurantsEndpoints.getAllRequests()
        );
        setData(response.data);
      } catch (err: any) {
        if (err.response) setError(err.response.data);
        else setError("Faild to load data...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActions = (action: string, requestId: number) => {
    const endpoint = action === "approve" ? "approveRequest" : "denyRequest";
    const toastMessage =
      action === "approve"
        ? {
            title: t("Request successfully approved!"),
            description: t("Restaurant can be used now."),
          }
        : {
            title: t("Request successfully denied!"),
            description: t("Restaurant can't be used now."),
          };

    axios
      .put(requestForRestaurantsEndpoints.requestActions(endpoint, requestId))
      .then(() => {
        toast({
          variant: "default",
          title: toastMessage.title,
          description: toastMessage.description,
        });

        setData((prevData) => {
          return (
            prevData?.filter((request) => request.id !== requestId) || null
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">{t("RequestsForRestaurant")}</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({ onAction: handleActions, t: t })}
          data={data}
        >
          <></>
        </DataTable>
      </div>
    </div>
  );
}
