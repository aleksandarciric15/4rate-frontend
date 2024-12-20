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
import { userEndpoints } from "@/environments/api-endpoints";
import { useUser } from "@/providers/user";
import { LoginDefaultValues, LoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../components/auth-layout";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { setIsLogged, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: LoginDefaultValues,
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
    setIsLoading(true);

    axios
      .post(userEndpoints.login(), values)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          setIsLogged(true);
          setUser(response.data);
          if (response.data.role === "administrator") navigate("/admin");
          else navigate("/");
          setIsLoading(false);
        }, 1000);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: t("Login"),
          description: t("Could not login!"),
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AuthLayout
        classLayout="h-screen flex items-center justify-center"
        sectionLayout="w-full"
      >
        <CardWrapper
          label={t("Login to your account")}
          title={t("Login")}
          backButtonHref="/register"
          backButtonLabel={t("Don't have an account? Sign up here.")}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 space-y-6"
            >
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

              <Button type="submit" className="w-full">
                {t("Login")}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </AuthLayout>
    </>
  );
};
