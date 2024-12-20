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
import { AdminCreateSchema } from "@/schemas/user-schemas";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type AdminCreateFormProps = {
  form: UseFormReturn<Zod.infer<typeof AdminCreateSchema>>;
  onFormSubmit: (data: Zod.infer<typeof AdminCreateSchema>) => void;
  buttonName: string;
};

export default function AdminCreateForm(props: AdminCreateFormProps) {
  const { t } = useTranslation();
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onFormSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={props.form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("enter_username")} {...field}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("enter_email")} {...field}></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("enter_password")}
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Confirm Password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("enter_password_confirmation")}
                    {...field}
                  ></Input>
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
