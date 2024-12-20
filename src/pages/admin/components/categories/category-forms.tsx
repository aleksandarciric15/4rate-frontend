import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogCategoryFormSchema } from "@/schemas/category-schemas";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CategoryFormProps = {
  form: UseFormReturn<Zod.infer<typeof DialogCategoryFormSchema>>;
  onFormSubmit: (data: Zod.infer<typeof DialogCategoryFormSchema>) => void;
  buttonName: string;
};

export default function CategoryForm(props: CategoryFormProps) {
  const { t } = useTranslation();
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Enter_name")} {...field}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">{props.buttonName}</Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
