import MapWithPins, { Pin } from '@/components/MapWithPins';
import Navbar from '@/components/ui/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from "@/components/AppSidebar"
import { preDefinedLocations, locations } from '@/constants/Locations';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const MapPage: React.FC = () => {
  const { selectedClasses } = useGlobalContext();
  const [center, setCenter] = useState([121.5278889480134, 25.02665988439874]);
  const [zoom, setZoom] = useState(16);
  const [pinData, setPinData] = useState<Pin[]>(preDefinedLocations);

  useEffect(() => {
    const coursePins = []
    selectedClasses.forEach((item) => {
      if (item.地點時間) {
        const place = item.地點時間.split(" ").slice(2,4).join("");
        const location = locations.filter((item) => {
          return item.name === place;
        })[0]
        if (location) {
          coursePins.push({...location, ...item});
        }
      };
    })
    setPinData([...preDefinedLocations, ...coursePins])
  }, [selectedClasses])
  return (
    <SidebarProvider className="w-full flex-1 h-screen">
      <AppSidebar />
      <div className='w-full h-screen flex flex-col'>
        <Navbar setMapCenter={setCenter} setMapZoom={setZoom} />
        <MapWithPins center={center} zoom={zoom} pinData={pinData} />
      </div>
    </SidebarProvider>
  );
};

export default MapPage;
