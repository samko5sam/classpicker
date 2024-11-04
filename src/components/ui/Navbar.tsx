import {
  MapIcon,
  Menu,
  MinusCircle,
  PlusCircle,
  Search,
  UserCircle2,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { preDefinedLocations } from "@/constants/ILocations";
import { Link } from "react-router-dom";

type Props = {
  setMapCenter?: React.Dispatch<React.SetStateAction<number[]>>;
  setMapZoom?: React.Dispatch<React.SetStateAction<number>>;
};

const Navbar: React.FC<Props> = ({ setMapCenter, setMapZoom }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white rounded-none md:rounded-b-3xl shadow-md py-3 px-4 flex items-center justify-between z-40 h-[60px]">
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <Menu />
        </button>
        <Link to="/map" className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <MapIcon />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
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
        <Link to="/user" className="text-gray-600 hover:text-gray-800 focus:outline-none">
          <UserCircle2 />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
