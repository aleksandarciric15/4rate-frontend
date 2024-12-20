import axios from "axios";
import { Folder, MessageCircle, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCard from "./dashboard-card";
import { RestaurantChartComponent } from "./restaurant-chart";
import { UserChartComponent } from "./user-chart";
import { AnalyticCounts } from "@/types/analytics";
import { analyticEndpoints } from "@/environments/api-endpoints";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [numOfRestaurants, setNumOfRestaurants] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  useEffect(() => {
    axios
      .get<AnalyticCounts>(analyticEndpoints.getAllCounts())
      .then((response) => {
        setNumOfRestaurants(response.data.restaurants);
        setNumOfReviews(response.data.reviews);
        setNumOfUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="flex gap-3">
        <DashboardCard
          title={t("Restaurants")}
          count={numOfRestaurants}
          icon={<Folder className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title={t("Users")}
          count={numOfUsers}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title={t("Reviews")}
          count={numOfReviews}
          icon={<MessageCircle className="text-slate-500" size={72} />}
        />
      </div>
      <div className=" flex gap-2 w-full mt-6">
        <UserChartComponent />
        <RestaurantChartComponent />
      </div>
    </>
  );
};

export default Dashboard;
