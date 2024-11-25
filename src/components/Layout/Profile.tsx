import { Key, Lock, LogOut, MapPin, RotateCcw, User } from "lucide-react";
import Link from "next/link";

type MenuItems = {
  icon: JSX.Element;
  label: string;
};

type User = {
  avatarUrl: string;
  name: string;
  phone: string;
};

type ProfileProps = {
  user: User;
};

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const menuItems: MenuItems[] = [
    { icon: <Lock className="mr-2" />, label: "Order History" },
    { icon: <RotateCcw className="mr-2" />, label: "Return Orders" },
    { icon: <User className="mr-2" />, label: "Acount" },
    { icon: <Key className="mr-2" />, label: "Change Password" },
    { icon: <MapPin className="mr-2" />, label: "Address" },
    { icon: <LogOut className="mr-2" />, label: "Logout" },
  ];
  return (
    <div className="w-full relative z-10">
      <div className="flex space-x-4 items-center">
        <div>
          <img
            src={user.avatarUrl}
            alt="profile avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
      </div>
      <div className="mt-4">
        <ul className="space-y-4">
          {menuItems?.map((item, index) => (
            <li key={index} className="mb-1 block">
              <Link
                href={"/account"}
                className="flex items-center text-gray-700"
              >
                {item.icon} <span className="ms-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
