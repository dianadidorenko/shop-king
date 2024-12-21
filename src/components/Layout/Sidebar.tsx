import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaEnvelope, FaMapMarked, FaPhone } from "react-icons/fa";

interface MenuItem {
  label: string;
  icon?: IconType;
  link: string;
  onClick?: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  socialLinks: { icon: IconType; url: string }[];
  language: string;
  address: string;
  email: string;
  phone: string;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  menuItems,
  socialLinks,
  language,
  address,
  email,
  phone,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          className="text-orange-500 text-2xl absolute top-4 right-4"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="p-4 space-y-6">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item?.link}
                  className={`text-lg ${
                    item?.link === pathname
                      ? "text-orange-500"
                      : "text-gray-900"
                  } flex items-center space-x-2 hover:text-orange-500`}
                  onClick={() => {
                    router.push(item?.link);
                    onClose();
                  }}
                >
                  {item.icon && <item.icon className="text-lg" />}
                  <span>{item?.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-2 text-sm text-gray-700">
            <p className="flex items-center space-x-2">
              <FaMapMarked className="text-lg" />
              <span>{address}</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaEnvelope className="text-lg" />
              <span>{email}</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaPhone className="text-lg" />
              <span>{phone}</span>
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
              >
                <social.icon className="text-2xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
