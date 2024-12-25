import {
  MapIcon,
  MinusCircle,
  PlusCircle,
  Table2,
  UserCircle2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { preDefinedLocations } from "@/constants/Locations";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import AnnouncementModal from "../Announcement";

type Props = {
  setMapCenter?: React.Dispatch<React.SetStateAction<number[]>>;
  setMapZoom?: React.Dispatch<React.SetStateAction<number>>;
  hideNavbar?: boolean;
};

const Navbar: React.FC<Props> = ({ setMapCenter, setMapZoom, hideNavbar = false }) => {
  const location = useLocation()
  const [isNavbarHidden, setIsNavbarHidden] = useState(hideNavbar);
  const {open: sidebarOpen} = useSidebar()
  const { user } = useGlobalContext();

  const isMapPath = /^\/map\/?$/.test(location.pathname);
  const isClassTablePath = /^\/classtable\/?$/.test(location.pathname);

  useEffect(() => {
    setIsNavbarHidden(sidebarOpen)
  }, [sidebarOpen])

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white rounded-none md:rounded-b-3xl shadow-md py-3 px-4 flex items-center justify-between z-40 h-[60px] transition-all duration-300 ${isNavbarHidden ? 'translate-y-[-100%] opacity-0' : ''}`}>
      <div className="flex items-center space-x-4">
        <SidebarTrigger />

        {!isMapPath && (
          <Link to="/map" className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <MapIcon />
          </Link>
        )}

        {!isClassTablePath && (
          <Link to="/classtable" className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <Table2 />
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4 overflow-x-auto">
        {setMapCenter && (
          <div className="flex flex-row">
            <Button
              onClick={() => {
                setMapCenter([
                  preDefinedLocations[0].longitude,
                  preDefinedLocations[0].latitude,
                ]);
                setMapZoom(preDefinedLocations[0].zoom);
              }}
              variant="ghost"
            >
              校本部
            </Button>
            <Button
              onClick={() => {
                setMapCenter([
                  preDefinedLocations[1].longitude,
                  preDefinedLocations[1].latitude,
                ]);
                setMapZoom(preDefinedLocations[1].zoom);
              }}
              variant="ghost"
            >
              公館校區
            </Button>
          </div>
        )}
        {setMapZoom && (
          <div className="flex flex-row-reverse">
            <Button
              onClick={() => setMapZoom((old) => old + 0.1)}
              variant="ghost"
            >
              <PlusCircle />
            </Button>
            <Button
              onClick={() => setMapZoom((old) => old - 0.1)}
              variant="ghost"
            >
              <MinusCircle />
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <AnnouncementModal />
        <Link to="/user" className="text-gray-600 hover:text-gray-800 focus:outline-none">
          {user.id ? <img
              src={user.picture?.data.url}//"https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-8 h-8 rounded-full ml-4"
            /> : <UserCircle2 width={32} height={32} />}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
