import React from "react";
import Navbar from "@/components/ui/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import FacebookLoginButton from "@/components/FacebookLoginButton";

const UserPage: React.FC = () => {
  const { user } = useGlobalContext();
  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <Navbar />
      <div className="container mx-auto py-8 flex-1 pt-[72px] px-8">
        <h1 className="text-2xl font-bold mb-4">歡迎~</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src={user.picture?.data.url}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              {/* <p className="text-gray-600">{user.email}</p> */}
            </div>
          </div>
          <div className="mb-4 flex flex-row-reverse">
            <FacebookLoginButton />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserPage;
