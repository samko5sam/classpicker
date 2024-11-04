import React from "react";
import Navbar from "@/components/ui/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const UserPage: React.FC = () => {
  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <Navbar />
      <div className="container mx-auto py-8 flex-1 pt-[64px]">
        <h1 className="text-2xl font-bold mb-4">歡迎~</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1135.jpg"//"https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">Hayley</h2>
              <p className="text-gray-600">Aaliyah23@hotmail.com</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">關於我</h3>
            <p>
              兔青就何動叫寺門占刃還；成也習彩字遠言正立右香幫流許沒蝴，何課幸時春氣笑星大右黃原貝花公，毛升親地而要再呀乞真隻立陽吃子白子半，山家一工誰！弓蝴河開加小在祖還步。
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">設定</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  編輯個人資料
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  更新密碼
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  通知設定
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserPage;
