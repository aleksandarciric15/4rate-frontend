import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type DropdownMenuItemLinkProps = {
  location: string;
  name: string;
  onAction?: () => void;
};

const DropdownMenuItemLink = ({
  location,
  name,
  onAction,
}: DropdownMenuItemLinkProps) => {
  const navigate = useNavigate();
  const handleOnMenuItemClick = () => {
    if (onAction !== undefined) onAction();
    navigate(location);
  };
  return (
    <DropdownMenuItem onClick={handleOnMenuItemClick}>{name}</DropdownMenuItem>
  );
};

export default DropdownMenuItemLink;
