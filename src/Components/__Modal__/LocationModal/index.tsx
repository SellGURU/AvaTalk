/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import useModalAutoClose from "../../../hooks/useModalAutoClose";
import { publish } from "../../../utils/event";
import { Button } from "symphony-ui";
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/images/marker-icon-2x.png";
import { MapContainer, TileLayer, Marker, useMap,useMapEvents } from 'react-leaflet';
import { debounce } from 'lodash';
import { GoogleMapBox } from "../../../Model";
import { useAuth } from "../../../hooks/useAuth";

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme?: string;
    position: [number, number]
    setISLocation:(action:boolean) =>void
    setPosition:(pos:[number, number]) => void
    setAddress:(text:string) => void
}

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.flyTo(position, 13, {
    animate: true,
  });
  return null;
};

const LocationModal:React.FC<LocationModalProps> = ({
    onClose,theme,position,setPosition,setISLocation,setAddress
}) => {
    useEffect(() => {
        publish("IncressFooter",{})
        publish("profileIsReview",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])     
    const refEl =useRef<HTMLDivElement>(null)
    const auth = useAuth();
    useModalAutoClose({
        refrence:refEl,
        close:() => {
            onClose()
        }
    })     
    let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() === "GoogleMapBox")[0] as GoogleMapBox;

    if (!currentBox) {
        currentBox = new GoogleMapBox("Address", { lan: 33, lat: 33 },'',false);
    }    
    // const [position, setPosition] = useState<[number, number]>([currentBox?.location.lan, currentBox?.location.lat]);
    const [searchQuery, ] = useState('');
    const [localAddress,setLocalAddress] = useState('')
    const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (!query) return;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }, 500), // 500ms delay
    []
  );
    function LocationMarker() {
        // const [position, setPosition] = useState(null);

        // Using useMapEvents to handle map clicks
        useMapEvents({
        click(e:any) {
            setPosition([parseFloat(e.latlng.lat), parseFloat(e.latlng.lng)]);
            fetchAddress(parseFloat(e.latlng.lat), parseFloat(e.latlng.lng))
            // console.log(e)
        },
        });

        return position ? <Marker position={position}></Marker> : null;
    }
    const fetchAddress = async (lat:any, lon:any) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        try {
        const response = await fetch(url);
        const data = await response.json();
        setLocalAddress(data.display_name || "");
        console.log(data)
        } catch (error) {
        console.error("Error fetching address:", error);
        // setAddress("Error fetching address");
        }
    };    
    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery, handleSearch]);    
    return (
        <>
            <div ref={refEl} className="rounded-[27px] px-6 py-6 max-w-[32rem] h-auto max-h-[678px] pb-10 rounded-b-none slideupModal  bg-white w-full">
                <div className='flex w-full justify-between items-center mb-4'>
                    <Button onClick={onClose} theme="Carbon-back">
                        <div className={`${theme}-back-Button-vector`}></div>
                    </Button>
                    <div>
                        <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>Select Location on Map</div>
                    </div>
                    <div className="invisible">
                        <Button onClick={onClose} theme="Carbon-back">
                            <div className={`${theme}-back-Button-vector`}></div>
                        </Button>
                    </div>
                </div>        

                <div className=" my-4">
                <MapContainer  center={position} zoom={13} style={{ height: '250px', borderRadius: '27px' }}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* <Marker position={position} /> */}
                    <LocationMarker></LocationMarker>
                    <FlyToLocation position={position} />
                </MapContainer>
                </div>

                <div>
                    <Button onClick={() => {
                        setISLocation(true)
                        setAddress(localAddress)
                        onClose()
                    }} theme="Carbon">Confirm</Button>
                </div>
            </div>        
        </>
    )
}

export default LocationModal