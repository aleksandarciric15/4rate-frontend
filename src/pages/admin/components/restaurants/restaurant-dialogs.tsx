import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogRestaurantBlockFormDefaultValues,
  DialogRestaurantBlockFormSchema,
} from "@/schemas/restaurant-schemas";
import { RestaurantBlockFormData } from "@/types/restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Restaurant } from "./columns";
import RestaurantBlockForm from "./restaurant-forms";

type RestaurantBlockDialogProps = {
  onEdit: (data: RestaurantBlockFormData) => void;
  restaurant: Restaurant;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const RestaurantBlockDialog = (props: RestaurantBlockDialogProps) => {
  const createCategoryForm = useForm<
    zod.infer<typeof DialogRestaurantBlockFormSchema>
  >({
    resolver: zodResolver(DialogRestaurantBlockFormSchema),
    defaultValues: DialogRestaurantBlockFormDefaultValues,
  });

  const handleSubmitBlockForm = (
    formData: Zod.infer<typeof DialogRestaurantBlockFormSchema>
  ) => {
    props.onEdit({ ...formData, restaurantId: props.restaurant.id });
  };

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Block restaurant</DialogTitle>
            <DialogDescription>
              Enter reason for blocking restaurant. Click submit when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <RestaurantBlockForm
            form={createCategoryForm}
            onFormSubmit={handleSubmitBlockForm}
            buttonName="Submit"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export { RestaurantBlockDialog };
