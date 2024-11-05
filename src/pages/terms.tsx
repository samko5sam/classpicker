import React from 'react';
import Navbar from '@/components/ui/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

const TermsPage: React.FC = () => {
  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <Navbar />
      <div className="container mx-auto py-8 flex-1 pt-[72px]">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>
            These are the terms of service for our application. By using our app, you agree to be bound by these terms.
          </p>
          <h2 className="text-xl font-semibold mt-4 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using our application, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using our application, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
          
          <h2 className="text-xl font-semibold mt-4 mb-2">2. Privacy Policy</h2>
          <p>
            Our Privacy Policy explains how we handle your personal data and protect your privacy when you use our Service.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">3. User Obligations</h2>
          <p>
            You must comply with all applicable laws and use the application only for lawful purposes.
          </p>
          
          <h2 className="text-xl font-semibold mt-4 mb-2">4. Modifications to Terms</h2>
          <p>
            We reserve the right to change these terms at any time, and you agree to be bound by such changes.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">5. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access, use, or inability to use this application.
          </p>
          
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TermsPage;
