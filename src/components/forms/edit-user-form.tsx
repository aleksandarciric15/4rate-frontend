import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { EditUserSchema } from "@/schemas/user-schemas";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type EditUserFormProps = {
  form: UseFormReturn<Zod.infer<typeof EditUserSchema>>;
  onFormSubmit: (data: Zod.infer<typeof EditUserSchema>) => void;
  buttonName: string;
};

export default function EditUserForm(props: EditUserFormProps) {
  const { t } = useTranslation();
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onFormSubmit)}>
        <div className="flex flex-col gap-1">
          <FormField
            control={props.form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("first_name")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("enter_first_name")}
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("last_name")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("enter_last_name")}
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel>{t("date_of_birth")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("pick_a_date")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
