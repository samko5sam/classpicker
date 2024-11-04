import React from "react";
import Navbar from "@/components/ui/Navbar";

const UserPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-1 pt-[64px]">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">About Me</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vestibulum, nisl nec ultricies lacinia, nisl nisl aliquam nisl,
              nec aliquam nisl nisl sit amet nisl.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Settings</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  Edit Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  Change Password
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  Notification Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
