import { MultiSelect } from "@/components/shared/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryEndpoints,
  restaurantEndpoints,
} from "@/environments/api-endpoints";
import { Category, Restaurant } from "@/types/restaurant";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const EditRestaurantPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(restaurantEndpoints.getRestaurantById(id));
        const data = await response.json();
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setLoading(false);
      }
    };

    fetchRestaurant();

    axios
      .get(categoryEndpoints.getAll())
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [formState, setFormState] = useState({
    description: restaurant?.description || "",
    workTime: restaurant?.workTime || "",
    address: restaurant?.address || "",
    city: restaurant?.city || "",
    country: restaurant?.country || "",
    phones:
      restaurant?.restaurantPhones.map((elem) => {
        return elem.phone;
      }) || [],
    selectedCategories: restaurant?.restaurantCategories.map((elem) => {
      return elem.category.id.toString();
    }) || [""],
  });

  useEffect(() => {
    if (restaurant) {
      setFormState({
        description: restaurant.description,
        workTime: restaurant.workTime,
        address: restaurant.address,
        city: restaurant.city,
        country: restaurant.country,
        phones:
          restaurant.restaurantPhones.map((elem) => {
            return elem.phone;
          }) || [],
        selectedCategories: restaurant?.restaurantCategories.map((elem) => {
          return elem.category.id.toString();
        }) || [""],
      });
    }
  }, [restaurant]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const workTimeRegex =
    /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s*-\s*([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  const validateForm = (formState: any) => {
    const errors: { [key: string]: string } = {};

    if (!formState.description.trim()) {
      errors.description = t("Description is required.");
    }

    if (!formState.workTime.trim()) {
      errors.workTime = t("Work time is required.");
    } else if (!workTimeRegex.test(formState.workTime)) {
      errors.workTime = t("Work time must be in the format HH:MM - HH:MM.");
    }

    if (!formState.city || !formState.address.trim()) {
      errors.address = t("Address is required.");
    }

    if (!formState.address || !formState.city.trim()) {
      errors.city = t("City is required.");
    }

    if (formState.selectedCategories.length === 0) {
      errors.selectedCategories = t("At least one category must be selected.");
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPhoneField = () => {
    setFormState((prevState) => ({
      ...prevState,
      phones: [...prevState.phones, ""],
    }));
  };

  const removePhoneField = (index: number) => {
    setFormState((prevState) => ({
      ...prevState,
      phones: prevState.phones.filter((_, i: number) => i !== index),
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...formState.phones];
    updatedPhones[index] = value;
    setFormState((prevState) => ({
      ...prevState,
      phones: updatedPhones,
    }));
  };

  const handleMultiSelect = (values: string[]) => {
    formState.selectedCategories = values;
    console.log(formState.selectedCategories);
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(formState);
    e.preventDefault();
    const validationErrors = validateForm(formState);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors(validationErrors);
    }

    let obj = {
      ...formState,
      id: id,
      categoryIds: formState.selectedCategories,
    };
    axios
      .put(restaurantEndpoints.updateRestaurant(), obj)
      .then(() => {
        navigation("/manager");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(formState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Error: Restaurant not found!</div>;
  }

  return (
    <div className="w-full max-w-[100%] sm:max-w-[80%] lg:max-w-[60%] mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-3xl font-semibold mb-6">
            {t("Edit Restaurant")}
          </h3>

          <div className="space-y-4">
            <div>
              <Label className="pl-1">{t("description")}</Label>
              <Textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                className="w-full dark:bg-white dark:text-black mt-1"
                placeholder={t("Enter restaurant description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <Label className="pl-1">{t("work_time")}</Label>
              <Input
                name="workTime"
                value={formState.workTime}
                onChange={handleChange}
                placeholder="e.g., 9 AM - 9 PM"
                className="mt-1"
              />
              {errors.workTime && (
                <p className="text-red-500 text-sm mt-1">{errors.workTime}</p>
              )}
            </div>

            <div>
              <Label className="pl-1">Address</Label>
              <Input
                name="address"
                value={formState.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="mt-1"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <Label className="pl-1">{t("City")}</Label>
              <Input
                name="city"
                value={formState.city}
                onChange={handleChange}
                placeholder={t("Enter city")}
                className="mt-1"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <Label className="pl-1">{t("Country")}</Label>
              <Input
                name="country"
                value={formState.country}
                onChange={handleChange}
                placeholder={t("Enter country")}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 pl-1">
                {t("Phone Numbers")}
              </label>
              {formState.phones.map((phone: string, index: number) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder={`${t("Phone")} ${index + 1}`}
                  />
                  <Button
                    type="button"
                    className="bg-red-500 text-white p-1 h-[38px]"
                    onClick={() => removePhoneField(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addPhoneField}>
                <Plus className="mr-2" /> {t("Add Phone")}
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="pl-1">{t("Categories")}</Label>
              {categories && (
                <MultiSelect
                  className="dark:bg-white dark:font-normal dark:text-black"
                  options={categories.map((category, index) => ({
                    label: category.name,
                    value: category.id.toString(),
                  }))}
                  defaultValue={restaurant.restaurantCategories.map(
                    (category, index) => {
                      return category.category.id.toString();
                    }
                  )}
                  onValueChange={handleMultiSelect}
                  placeholder={t("Select options")}
                  variant="inverted"
                  maxCount={3}
                />
              )}
              {errors.selectedCategories && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedCategories}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit">{t("Edit")}</Button>
      </form>
    </div>
  );
};

export default EditRestaurantPage;
