import { Button } from "@/components/ui/button";
import { reviewEndpoints } from "@/environments/api-endpoints";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const AddReview: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { id: restaurantId } = useParams();
  const { user } = useUser();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const ratingDescriptions = [
    "",
    "Not Good",
    "Could’ve been better",
    "OK",
    "Good",
    "Great",
  ];

  const handleRatingClick = (index: number): void => {
    setRating(index);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (rating === 0) {
      setError(t("Please select a star rating."));
      return;
    }
    if (reviewText.trim().length < 50) {
      setError(
        t("Please write a more detailed review (at least 50 characters).")
      );
      return;
    }

    setError("");

    if (!restaurantId) return;

    let obj = { grade: rating, comment: reviewText, userAccountId: user?.id };
    axios
      .post(reviewEndpoints.add(restaurantId), obj)
      .then(() => {
        toast({
          variant: "default",
          title: "Review",
          description: "Added successfully",
        });
      })
      .catch((error) => {
        toast({
          variant: "default",
          title: "Review",
          description: "Couldn't add review",
        });
        console.log(error);
      });
    console.log({ rating, reviewText });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("Write a Review")}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-2">
            {t("Your Rating")}
          </label>
          <div className="flex gap-3">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  type="button"
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  className={`text-3xl transition duration-300 ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  ★
                </motion.button>
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold">
              {ratingDescriptions[hoverRating ?? rating]}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">
            {t("Your Comment")}
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder={t("Write your review here...")}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 dark:text-black"
            rows={6}
          ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 dark:hover:bg-slate-500"
        >
          {t("Post Review")}
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
