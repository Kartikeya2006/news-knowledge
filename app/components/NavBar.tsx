import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, Menu as MenuIcon, X as XIcon, LogOut, 
  Home, Newspaper, Settings, ChevronRight, Clock
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/news", label: "News", icon: Newspaper },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full top-0 z-50 bg-[#F5F5DC] bg-opacity-95 backdrop-blur-sm p-4 shadow-lg border-b border-[#D3C6A6]"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-[#4A4A2F] font-bold text-xl cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            News Knowledge
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-[#4A4A2F] hover:text-[#5C4033] transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}

            {/* Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#E5E5D1] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white">
                {session?.user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#E5E5D1] transition-colors"
          >
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-[#4A4A2F] hover:text-[#5C4033] transition-colors"
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center space-x-2 text-[#4A4A2F] hover:text-[#5C4033] transition-colors"
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setIsProfileOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XIcon size={20} />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                
                <h2 className="text-2xl font-bold text-[#4A4A2F] mb-1">
                  {session?.user?.name}
                </h2>
                <p className="text-[#706F6F] mb-6">{session?.user?.email}</p>

                <div className="w-full space-y-4">
                  
                  <ProfileItem icon={Clock} label="Reading Time" value="2.5 hours" />
                  <ProfileItem icon={Settings} label="Preferences" value={undefined} />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#8B5CF6] text-white px-4 py-3 rounded-lg hover:bg-[#7B4FE0] transition-all shadow-md flex items-center justify-center space-x-2"
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push('/profile');
                    }}
                  >
                    <span>View Full Profile</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface ProfileItemProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value?: string;
}

const ProfileItem = ({ icon: Icon, label, value }: ProfileItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5F5DC] transition-colors cursor-pointer">
    <div className="flex items-center space-x-3">
      <Icon size={20} className="text-[#8B5CF6]" />
      <span className="text-[#4A4A2F]">{label}</span>
    </div>
    {value && (
      <span className="text-[#706F6F] text-sm">{value}</span>
    )}
  </div>
);

export default Navbar;