import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

interface BackButtonProps {
  text: string;
  link: string;
}

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      to={link}
      className="text-gray-500 hover:underline flex items-center gap-1 font-bold mb-5"
    >
      <ArrowLeftCircle size={18} /> {text}
    </Link>
  );
};

export default BackButton;
