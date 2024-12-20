import * as z from "zod";

const DialogCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be entered!" }),
});

const DialogCategoryFormDefaultValues = {
  name: "",
};

export { DialogCategoryFormDefaultValues, DialogCategoryFormSchema };
