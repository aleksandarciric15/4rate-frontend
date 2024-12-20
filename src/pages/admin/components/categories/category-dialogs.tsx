import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categoryEndpoints } from "@/environments/api-endpoints";
import {
  DialogCategoryFormDefaultValues,
  DialogCategoryFormSchema,
} from "@/schemas/category-schemas";
import { CategoryEditFormData } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z as zod } from "zod";
import CategoryForm from "./category-forms";
import { Category } from "./columns";

type CategoryCreateDialogProps = {
  onCreate: (newCategory: Category) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

type CateogryEditDialogProps = {
  onEdit: (data: CategoryEditFormData) => void;
  category: Category;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const CategoryCreateDialog = (props: CategoryCreateDialogProps) => {
  const { t } = useTranslation();
  const createCategoryForm = useForm<
    zod.infer<typeof DialogCategoryFormSchema>
  >({
    resolver: zodResolver(DialogCategoryFormSchema),
    defaultValues: DialogCategoryFormDefaultValues,
  });

  const handleSubmitCreateForm = (
    formData: Zod.infer<typeof DialogCategoryFormSchema>
  ) => {
    axios
      .post(categoryEndpoints.addCategory(), formData)
      .then((response) => {
        props.onCreate(response.data);
      })
      .catch((error) => {
        props.onOpenChange(false);
        console.log("Couldn't create category!", error);
      });
  };

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            {t("add_category")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("create_category")}</DialogTitle>
            <DialogDescription>
              {t("Create a new category. Click create when you're done.")}
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            form={createCategoryForm}
            onFormSubmit={handleSubmitCreateForm}
            buttonName={t("Create")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const CategoryEditDialog = (props: CateogryEditDialogProps) => {
  const { t } = useTranslation();
  const editCategoryForm = useForm<zod.infer<typeof DialogCategoryFormSchema>>({
    resolver: zodResolver(DialogCategoryFormSchema),
    defaultValues: { name: props.category.name },
  });

  useEffect(() => {
    if (props.category) {
      editCategoryForm.reset({ name: props.category.name });
    }
  }, [props.category, editCategoryForm]);

  const handleSubmitEditForm = (
    formData: zod.infer<typeof DialogCategoryFormSchema>
  ) => {
    props.category.name = formData.name;
    axios
      .put(categoryEndpoints.editCategory(), props.category)
      .then(() => {
        props.onEdit({ ...formData, categoryId: props.category.id });
      })
      .catch((error) => {
        console.log("Could not edit category!", error);
      });
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("edit_category")}</DialogTitle>
          <DialogDescription>
            {t("Edit category. Click edit when you're done.")}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          form={editCategoryForm}
          onFormSubmit={handleSubmitEditForm}
          buttonName={t("Edit")}
        />
      </DialogContent>
    </Dialog>
  );
};

export { CategoryCreateDialog, CategoryEditDialog };
