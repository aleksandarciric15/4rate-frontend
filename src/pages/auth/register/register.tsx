import CardWrapper from "@/components/shared/card-wrapper";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userEndpoints } from "@/environments/api-endpoints";
import {
  RegisterDefaultValues,
  RegisterSchema,
} from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../components/auth-layout";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: RegisterDefaultValues,
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    setIsLoading(true);

    axios
      .post(userEndpoints.createAccount(), values)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AuthLayout
        classLayout="flex items-center justify-center overflow-auto"
        sectionLayout="w-full h-full p-5"
      >
        <CardWrapper
          label={t("Create an account")}
          title={t("Register")}
          backButtonHref="/login"
          backButtonLabel={t("Already have an account? Login here.")}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-4 space-y-2 "
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Role")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_a_role")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manager">{t("Manager")}</SelectItem>
                        <SelectItem value="guest">{t("Guest")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Username")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_username")}
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Password")} </FormLabel>
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
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Confirm password")}</FormLabel>
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
              <div>
                <Button type="submit" className="mt-6 w-full ">
                  {t("Register")}
                </Button>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </AuthLayout>
    </>
  );
};
