import { SquareArrowOutUpRight } from "lucide-react";

interface MenuButtonProps {
  url: string;
  label: string;
}

const MenuButton = ({ url, label }: MenuButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300"
    >
      <SquareArrowOutUpRight className="mr-2" />
      <span>{label}</span>
    </a>
  );
};

export default MenuButton;
