/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
// import LocationPicker, { PointMode } from "react-leaflet-location-picker";
import LocationPicker, { PointMode} from 'react-leaflet-location-picker';
import {  useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LatLngTuple } from "leaflet";
import '../../../index.css'

// import MapComponent from "./MapComponent";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditGoogleMap = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    let currentBox: GoogleMapBox = auth.currentUser.boxs.filter((item) => item.getTypeName() === "GoogleMapBox")[0] as GoogleMapBox;
    if (currentBox === undefined) {
        currentBox = new GoogleMapBox("Google Map", { lan: 33, lat: 33 });
    }
    const [pointVals, setPointVals] = useState([[currentBox.location.lan, currentBox.location.lat]]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const pointMode: PointMode = {
        banner: false,
    
        control: {
            values: pointVals as LatLngTuple[],
            onClick: (point: any) => setPointVals([...[point]]),
            onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
        },
    };

    const initialValue = {
        title: currentBox.getTitle(),
    };

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const submit = () => {
        auth.currentUser.addBox(
            new GoogleMapBox(formik.values.title, {
                lan: pointVals[0][0] as number,
                lat: pointVals[0][1] as number,
            })
        );
        navigate('/');
    };

    // Fetch coordinates using the Nominatim API
    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setPointVals([[parseFloat(lat), parseFloat(lon)]]);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <>
            <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className="relative top-8">
                    <BackIcon title="Google Map" theme="Carbon"></BackIcon>
                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="mt-24 px-6 text-left">
                        <TextField
                            {...formik.getFieldProps("title")}

                            errorMessage={formik.errors?.title}
                            inValid={formik.errors?.title !== undefined && (formik.touched?.title as boolean)}
                            theme="Carbon"
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Enter title..."
                        />
                    </div>
                    <div className="px-6 mt-3 mb-[50px] w-full h-[2rem] flex flex-col items-center justify-start">
                       {/* <TextField type="s"></TextField> */}
                        {/* <label className="ml-6 w-full text-left text-[13px] font-medium leading-[19.36px] text-[#374151]">Your Location</label> */}
                        {/* <div className=" w-full  rounded-[27px] bg-[#F3F4F6] px-4 pb-2 pt-2 text-[14px] font-normal leading-[21px] text-[#374151] flex items-center justify-between">
                            <input type="text" className=" w-[80%] h-[29px] bg-transparent border-none " value={searchQuery} onChange={(e) =>{
                                setSearchQuery(e.target.value)
                                handleSearch()
                            } } placeholder="Search for a location..." />
                            <div className="bg-[#ffff] p-2 rounded-full inputBorderBox cursor-pointer">
                                                        <svg onClick={handleSearch} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#6432c9]" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                            </div>


                        </div> */}
                       <TextField
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                handleSearch()
                            }}
                            onBlur={() => {}}
                            theme="Carbon"
                            label="Search Location"
                            name="search"
                            type="text"
                            placeholder="Search for a location..."
                            inValid={false}
                            errorMessage=""
                        />

                        {/* <Button onClick={handleSearch} theme="Carbon">Search</Button>  */}
                    </div>
                    <div className="px-6 mt-3">
                        <LocationPicker
                            showInputs={false}
                            mapStyle={{ height: "211px", borderRadius: "27px" }}
                            pointMode={pointMode}
                        />
                    </div>
                    {/* <div>
                        <LocationPickerMap></LocationPickerMap>
                    </div> */}
                    <div className="px-6 mt-10">
                        <Button onClick={submit} theme="Carbon">Save Changes</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditGoogleMap;
