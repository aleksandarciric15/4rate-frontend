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
import { Textarea } from "@/components/ui/textarea";
import { DialogRestaurantBlockFormSchema } from "@/schemas/restaurant-schemas";
import { UseFormReturn } from "react-hook-form";

type RestaurantBlockFormProps = {
  form: UseFormReturn<Zod.infer<typeof DialogRestaurantBlockFormSchema>>;
  onFormSubmit: (
    data: Zod.infer<typeof DialogRestaurantBlockFormSchema>
  ) => void;
  buttonName: string;
};

export default function RestaurantBlockForm(props: RestaurantBlockFormProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason to block</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
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
