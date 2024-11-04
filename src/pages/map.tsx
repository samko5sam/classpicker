import MapWithPins, { Pin } from '@/components/MapWithPins';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import { preDefinedLocations } from '@/constants/ILocations';
import React, { useState } from 'react';

const MapPage: React.FC = () => {
  const [center, setCenter] = useState([121.5278889480134, 25.02665988439874]);
  const [zoom, setZoom] = useState(16);
  const [pinData, setPinData] = useState<Pin[]>(preDefinedLocations);

  return (
    <div className="w-full flex-1 h-screen flex flex-col">
      <Navbar setMapCenter={setCenter} setMapZoom={setZoom} />
      <MapWithPins center={center} zoom={zoom} pinData={pinData} />
      <div className='hidden'>
        <Button onClick={() => setCenter([101, 25])}>Change Center</Button>
        <Button onClick={() => setZoom(18)}>Change Zoom</Button>
      </div>
    </div>
  );
};

export default MapPage;
