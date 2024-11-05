import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const PrivacyPage: React.FC = () => {
  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <Navbar />
      <div className="container mx-auto py-8 flex-1 pt-[72px]">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>
            We take your privacy seriously and will only use your personal information to provide the services you have requested.
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PrivacyPage;
