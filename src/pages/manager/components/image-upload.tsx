import { FileUploadInput } from "@/components/shared/file-upload-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { imageEndpoints } from "@/environments/api-endpoints";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const RestaurantImageUpload = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    if (!id) return;
    axios
      .post(imageEndpoints.uploadRestaurantImages(id), formData)
      .then(() => {
        toast({
          variant: "default",
          title: t("Images Upload"),
          description: t("Images uploaded successfully! Return to restaurant."),
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: t("Images Upload"),
          description: t("Could not upload images!"),
        });
      });
  };

  const handleChangFile = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div className="w-full max-w-[100%] sm:max-w-[80%] lg:max-w-[60%] mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-3xl font-semibold mb-6">{t("Upload Images")}</h3>

          <div className="space-y-4">
            <div>
              <Label className="pl-1">{t("Select Images")}</Label>
              <FileUploadInput
                multiple={true}
                accept="image/*"
                onChange={handleChangFile}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-4">
          {t("Upload Images")}
        </Button>
        <p className="text-gray-400 text-sm">
          {t("*This will overwrite the old images with the new ones!")}
        </p>
      </form>
    </div>
  );
};

export default RestaurantImageUpload;
