import { restaurantEndpoints } from "@/environments/api-endpoints";
import { RestaurantBlockFormData } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns, Restaurant } from "./columns";
import { DataTable } from "./data-table";
import { RestaurantBlockDialog } from "./restaurant-dialogs";
import { useTranslation } from "react-i18next";

export default function RestaurantsTable() {
  const { t } = useTranslation();
  const [isBlockDialogOpen, setBlockDialogOpen] = useState<boolean>(false);
  const [restaurantToBlock, setRestaurantToBlock] = useState<Restaurant | null>(
    null
  );
  const [data, setData] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Restaurant[]>(
          restaurantEndpoints.getAll()
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

  const handleColumnsBlock = (restaurant: Restaurant) => {
    setRestaurantToBlock(restaurant);
    setBlockDialogOpen(true);
  };

  const handleRestaurantBlock = (formData: RestaurantBlockFormData) => {
    let obj = { description: formData.description, id: formData.restaurantId };
    axios
      .put(restaurantEndpoints.block(), obj)
      .then(() => {
        setData(
          (prevData) =>
            prevData?.map((restaurant) => {
              if (restaurant.id === formData.restaurantId) {
                restaurant.status = "blocked";
              }
              return restaurant;
            }) || null
        );
        setBlockDialogOpen(false);
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
        <h1 className="font-bold text-2xl">{t("Restaurants")}</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({ onBlock: handleColumnsBlock, t: t })}
          data={data}
        >
          {restaurantToBlock && (
            <RestaurantBlockDialog
              onEdit={handleRestaurantBlock}
              restaurant={restaurantToBlock}
              isOpen={isBlockDialogOpen}
              onOpenChange={setBlockDialogOpen}
            ></RestaurantBlockDialog>
          )}
        </DataTable>
      </div>
    </div>
  );
}
