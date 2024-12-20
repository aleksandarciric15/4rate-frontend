import * as z from "zod";

const DialogRestaurantBlockFormSchema = z.object({
  description: z.string().min(1, { message: "Description must be entered!" }),
});

const DialogRestaurantBlockFormDefaultValues = {
  description: "",
};

export {
  DialogRestaurantBlockFormDefaultValues,
  DialogRestaurantBlockFormSchema,
};
