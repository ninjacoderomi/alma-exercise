import { usePathnameWithOutL18n } from "@/utilities/routing";
import Link from "next/link";

const MenuLink = ({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) => {
  const currentPath = usePathnameWithOutL18n();
  return (
    <li className="mb-2 p-2 overflow-hidden ">
      <Link
        href={href}
        className={`${
          currentPath === href ? "text-grey-900 font-bold" : "text-gray-800"
        } ${className}`}
      >
        {label}
      </Link>
    </li>
  );
};
export default MenuLink;
