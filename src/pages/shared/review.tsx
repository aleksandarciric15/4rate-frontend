import { format } from "date-fns";
import { motion } from "framer-motion";
import React from "react";
import defaultAvatar from "../../assets/default_avatar.png";

interface ReviewProps {
  avatarUrl: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const Review: React.FC<ReviewProps> = ({
  avatarUrl,
  username,
  rating,
  comment,
  createdAt,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        whileHover={{ scale: 1.2 }}
        className={`text-2xl ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <div className="p-4 ">
      <div className="flex items-center mb-3">
        <img
          src={avatarUrl === "" ? defaultAvatar : avatarUrl}
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(createdAt), "PPP")}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-3">{renderStars(rating)}</div>
      <p className="text-base text-gray-800 dark:text-gray-200">{comment}</p>
    </div>
  );
};

export default Review;
