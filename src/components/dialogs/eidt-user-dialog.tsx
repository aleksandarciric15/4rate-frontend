import { imageEndpoints, userEndpoints } from "@/environments/api-endpoints";
import { EditUserSchema } from "@/schemas/user-schemas";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z as zod } from "zod";
import EditUserForm from "../forms/edit-user-form";
import { FileUploadInput } from "../shared/file-upload-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

type EditUserDialogProps = {
  onEdit: (editedUser: User) => void;
  user: User;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const EditUserDialog = (props: EditUserDialogProps) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const createEditUserForm = useForm<zod.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      firstName: props.user?.firstName || "",
      lastName: props.user?.lastName || "",
      dateOfBirth: props.user?.dateOfBirth
        ? new Date(props.user.dateOfBirth)
        : undefined,
    },
  });

  const handleSubmitCreateForm = async (
    data: Zod.infer<typeof EditUserSchema>
  ) => {
    let obj = { userAccountId: props.user?.id, ...data };

    try {
      await axios.put(userEndpoints.updateUserAccount(), obj);

      let avatarUrl: string | undefined;

      if (files.length > 0) {
        avatarUrl = await handleUpdateAvatar(files[0]);
      }

      const editedUser: User = {
        ...props.user,
        ...data,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString()
          : "",
        avatarUrl: avatarUrl || props.user.avatarUrl,
      };
      props.onEdit(editedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.put(
        imageEndpoints.uploadAvatar(props.user.id),
        formData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 max-h-[90vh]  overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {t("edit_profile")}
          </DialogTitle>
        </DialogHeader>
        <Label>{t("Avatar")}</Label>
        <FileUploadInput
          multiple={false}
          accept="image/*"
          onChange={handleFileUpload}
        />
        <EditUserForm
          form={createEditUserForm}
          onFormSubmit={handleSubmitCreateForm}
          buttonName={t("Edit")}
        />
      </DialogContent>
    </Dialog>
  );
};

export { EditUserDialog };
