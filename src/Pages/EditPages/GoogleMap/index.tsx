/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import  { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMap,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/images/marker-icon-2x.png";
import { Button } from "symphony-ui";
import { BackIcon, TextArea, TextField } from "../../../Components";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import '../../../index.css';
import LocationModal from '../../../Components/__Modal__/LocationModal';
import { useCallback, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const validationSchema = Yup.object().shape({
  title: Yup.string(),
  address:Yup.string()
});

// const FlyToLocation = ({ position }: { position: [number, number] }) => {
//   const map = useMap();
//   map.flyTo(position, 13, {
//     animate: true,
//   });
//   return null;
// };

const EditGoogleMap = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() === "AddressBox")[0] as GoogleMapBox;
  const [showAddLocation,setShowAddLocation] = useState(false)
  console.log(currentBox)
  if (!currentBox) {
    currentBox = new GoogleMapBox("Address", { lan: 51.50, lat: 0.1276 },'',false);
  }

  const [position, setPosition] = useState<[number, number]>([currentBox?.location.lan, currentBox?.location.lat]);
  // const [searchQuery, setSearchQuery] = useState('');
  const [isLocation,setIsLocation] = useState(currentBox.getISLocation())
  const formik = useFormik({
    initialValues: { 
      title: currentBox.getTitle(),
      address:currentBox.address
     },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const submit = () => {
    auth.currentUser.addBox(
      new GoogleMapBox(formik.values.title, {
        lan: position[0],
        lat: position[1],
      },formik.values.address,isLocation)
    );
    // setTimeout(() => {
    //   // publish('ForceReload',{})
    //   auth.setNeedReload(true)
    //   navigate('/?splash=false')
    // }, 200);
    navigate('/');
  };
  const [isGenerating,setIsGenerating] = useState(false)
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
  useEffect(() => {
    handleSearch(formik.values.address);
  }, [formik.values.address]);
  useEffect(() => {
    if(isGenerating == true){
      setTimeout(() => {
        setIsGenerating(false)
      }, 500);
    }
  },[isGenerating])
  return (
    <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
      <div className="relative top-8">
        <BackIcon title="Address" theme="Carbon" />
      </div>
      <div className="mt-[120px] hiddenScrollBar h-full">
        <div className="mt-24 px-6 text-left">
          <TextField
            {...formik.getFieldProps("title")}
            errorMessage={formik.errors?.title}
            inValid={!!(formik.errors?.title && formik.touched?.title)}
            theme="Carbon"
            label="Title"
            name="title"
            type="text"
            placeholder="Enter title..."
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mt-4 px-6 text-left">
          <TextArea 
            {...formik.getFieldProps("address")}
            name='address'
            inValid={false}
            textAreaHeight='136px'
            placeholder='Write your address ...'
            theme='Carbon'
            label='Address'
          ></TextArea>
        </div>
        {isLocation &&!isGenerating  &&
          <div className='px-8 mt-2'>
            <MapContainer dragging={false}  center={position}  zoom={13} style={{ height: '80px', borderRadius: '27px' }}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
                
            </MapContainer>               

          </div>
        }
        <div className='w-full px-8 flex justify-end mt-2'>

          <div onClick={() => {
            setShowAddLocation(true)
          }} className='flex justify-end  gap-1 items-center'>
            <img src="./icons/location-add.svg" alt="" />
            <div className='text-[#06B6D4] text-[13px] cursor-pointer font-medium'>{isLocation?'Change Location':'Add Location on Map'}</div>

          </div>
        </div> 
        {
            isLocation &&
            <div className='w-full px-8 flex justify-end mt-2'>

              <div onClick={() => {
                setIsLocation(false)
              }} className='flex justify-end gap-1 items-center'>
                <img src="./icons/removeLocation.svg" alt="" />
                <div className='text-[#06B6D4] text-[13px] cursor-pointer font-medium'>Remove Location</div>

              </div>
            </div>         
        }
        {/* <div className="px-6 mt-3 mb-[50px] w-full h-[2rem] flex flex-col items-center justify-start">
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            theme="Carbon"
            label="Search Location"
            name="search"
            type="searchBox"
            placeholder="Search for a location..."
            inValid={false}
            errorMessage=""
            onBlur={() => {}}
          />
        </div>
        <div className="px-6 mt-3">
          <MapContainer  center={position} zoom={13} style={{ height: '250px', borderRadius: '27px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker></LocationMarker>
            <FlyToLocation position={position} />
          </MapContainer>
        </div> */}
        <div className="px-6 mt-10">
          <Button onClick={submit} theme="Carbon">Save Changes</Button>
        </div>
      </div>
      {
        showAddLocation&&
        <>
          <div className="fixed w-full z-[1201] left-0 bottom-0 flex justify-center">
            <LocationModal setAddress={(text:string) =>formik.setFieldValue("address",text) } setISLocation={setIsLocation} position={position} setPosition={setPosition} isOpen={true} onClose={() => {
              setShowAddLocation(false)
              setIsGenerating(true)         
              }} theme='Carbon'></LocationModal>
          </div>
          <div className="fixed w-full z-[1200] h-full bg-black opacity-60 top-0 left-0"></div>    
        </>
      }
    </div>
  );
};

export default EditGoogleMap;
