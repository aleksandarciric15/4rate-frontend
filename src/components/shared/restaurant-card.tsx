import { imageEndpoints } from "@/environments/api-endpoints";
import { Restaurant } from "@/types/restaurant";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/default-restaurant-image.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface RestaurantCardProps {
  onClick: (restaurantId: number) => void;
  restaurant: Restaurant;
  name: string;
  description: string;
  link: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  onClick,
  restaurant,
  name,
  description,
  link,
}) => {
  const handleOnClickCard = (restaurantId: number) => {
    onClick(restaurantId);
  };
  return (
    <Card
      onClick={() => handleOnClickCard(restaurant?.id)}
      className="transform transition-transform duration-300 hover:scale-105 h-[350px]"
    >
      <Link to={link} className="block rounded-lg overflow-hidden">
        <img
          src={
            restaurant && restaurant.images[0]
              ? imageEndpoints.getRestaurantImage(
                  restaurant.id,
                  restaurant.images[0].imageUrl
                )
              : defaultImage
          }
          alt={name}
          className="w-full h-48 object-cover"
        />
        <CardHeader className="pb-1">
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            {name ? name : "NN"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-gray-400 text-xs mb-2 p-0 block">
            {restaurant?.city + ", " + restaurant?.address}
          </span>
          <div className="w-full h-full">
            <p className="text-gray-700 dark:text-gray-300 overflow-hidden line-clamp-2">
              {description}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RestaurantCard;
