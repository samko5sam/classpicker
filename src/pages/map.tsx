import MapWithPins, { Pin } from '@/components/MapWithPins';
import Navbar from '@/components/ui/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from "@/components/AppSidebar"
import { preDefinedLocations } from '@/constants/Locations';
import React, { useState } from 'react';

const MapPage: React.FC = () => {
  const [center, setCenter] = useState([121.5278889480134, 25.02665988439874]);
  const [zoom, setZoom] = useState(16);
  const [pinData, setPinData] = useState<Pin[]>(preDefinedLocations);

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
