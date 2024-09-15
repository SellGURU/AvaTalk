import  { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import '../../../index.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const FlyToLocation = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  map.flyTo(position, 13, {
    animate: true,
  });
  return null;
};

const EditGoogleMap = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() === "GoogleMapBox")[0] as GoogleMapBox;

  if (!currentBox) {
    currentBox = new GoogleMapBox("Google Map", { lan: 33, lat: 33 });
  }

  const [position, setPosition] = useState<[number, number]>([currentBox.location.lan, currentBox.location.lat]);
  const [searchQuery, setSearchQuery] = useState('');

  const formik = useFormik({
    initialValues: { title: currentBox.getTitle() },
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
      })
    );
    navigate('/');
  };

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
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  return (
    <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
      <div className="relative top-8">
        <BackIcon title="Google Map" theme="Carbon" />
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
        <div className="px-6 mt-3 mb-[50px] w-full h-[2rem] flex flex-col items-center justify-start">
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            theme="Carbon"
            label="Search Location"
            name="search"
            type="text"
            placeholder="Search for a location..."
            inValid={false}
            errorMessage=""
            onBlur={() => {}}
          />
        </div>
        <div className="px-6 mt-3">
          <MapContainer center={position} zoom={13} style={{ height: '250px', borderRadius: '27px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} />
            <FlyToLocation position={position} />
          </MapContainer>
        </div>
        <div className="px-6 mt-10">
          <Button onClick={submit} theme="Carbon">Save Change</Button>
        </div>
      </div>
    </div>
  );
};

export default EditGoogleMap;
