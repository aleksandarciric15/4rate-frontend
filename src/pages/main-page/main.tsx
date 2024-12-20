import RestaurantCard from "@/components/shared/restaurant-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  categoryEndpoints,
  restaurantEndpoints,
} from "@/environments/api-endpoints";
import { Category, Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { MainPageLayout } from "../layouts/main-page-layout";
import DataLoader from "@/components/shared/data-loader";

const MainPage = () => {
  return (
    <MainPageLayout>
      <Outlet />
    </MainPageLayout>
  );
};

const PAGE_SIZE = 6;

const RestaurantsGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(restaurantEndpoints.getAll())
      .then((response) => {
        setRestaurants(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(categoryEndpoints.getAll())
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.some((selected) => selected.id === category.id)) {
        return prevSelected.filter((selected) => selected.id !== category.id);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((restaurant) =>
        selectedCategories.length > 0
          ? selectedCategories.every((selectedCategory) =>
              restaurant.restaurantCategories.some(
                (rc) => rc.category.id === selectedCategory.id
              )
            )
          : true
      );
  }, [searchQuery, selectedCategories, restaurants]);

  const totalPages = Math.ceil(filteredRestaurants.length / PAGE_SIZE);
  const currentRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredRestaurants.slice(startIndex, endIndex);
  }, [currentPage, filteredRestaurants]);

  const handleOnCardClick = (restaurantId: number) => {
    navigate(`${restaurantId}/restaurant`);
  };

  return (
    <main className="mt-1 dark:mt-0 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t("Best_restaurants")}
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder={t("Search restaurants by name...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                selectedCategories.some(
                  (selectedCategory) => selectedCategory.id === category.id
                )
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mx-8">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <DataLoader size={50} color="#ff4500" />
            </div>
          ) : currentRestaurants.length === 0 ? (
            <div className="text-center min-h-[200px]">
              <p>{t("No results")}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              {currentRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  onClick={handleOnCardClick}
                  key={index}
                  restaurant={restaurant}
                  name={restaurant.name}
                  description={restaurant.description}
                  link=""
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
};

export { MainPage, RestaurantsGrid };
