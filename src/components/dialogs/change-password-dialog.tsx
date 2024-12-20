import { userEndpoints } from "@/environments/api-endpoints";
import { useUser } from "@/providers/user";
import {
  ChangePasswordDefaultValues,
  ChangePasswordSchema,
} from "@/schemas/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z as zod } from "zod";
import ChangePasswordUserForm from "../forms/change-password-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type ChangePasswordDialogProps = {
  onChange: (value: boolean) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const changePasswordForm = useForm<zod.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordDefaultValues,
  });

  const handleSubmitForm = (
    formData: Zod.infer<typeof ChangePasswordSchema>
  ) => {
    let obj = {
      userAccountId: user?.id,
      ...formData,
    };
    axios
      .put(userEndpoints.changePassword(), obj)
      .then(() => {
        props.onChange(true);
      })
      .catch((error) => {
        console.log(error);
        props.onChange(false);
      });

    changePasswordForm.reset();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 max-h-[90vh]  overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {t("Change_password")}
          </DialogTitle>
        </DialogHeader>
        <ChangePasswordUserForm
          form={changePasswordForm}
          onFormSubmit={handleSubmitForm}
          buttonName={t("submit")}
        />
      </DialogContent>
    </Dialog>
  );
};

export { ChangePasswordDialog };
