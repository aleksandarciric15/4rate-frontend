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
import { ChangePasswordSchema } from "@/schemas/user-schemas";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ChangePasswordFormProps = {
  form: UseFormReturn<Zod.infer<typeof ChangePasswordSchema>>;
  onFormSubmit: (data: Zod.infer<typeof ChangePasswordSchema>) => void;
  buttonName: string;
};

export default function ChangePasswordUserForm(props: ChangePasswordFormProps) {
  const { t } = useTranslation();
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onFormSubmit)}>
        <div className="flex flex-col gap-1">
          <FormField
            control={props.form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("Current_Password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("enter_current_password")}
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("new_password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("enter_new_password")}
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
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm_new_password")}</FormLabel>
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
