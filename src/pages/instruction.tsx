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
        {/* Instructions */}
        <h1 className="text-2xl font-bold mb-4">如何使用 Classpicker</h1>
        <iframe src="https://scribehow.com/embed/Step-by-Step_Instructions_Using_Classpicker__7tidqyY4QRWchZqsXbnEeg?as=scrollable" width="100%" height="600" allowFullScreen={true} frameBorder={0}></iframe>
      </div>
    </SidebarProvider>
  );
};

export default PrivacyPage;
