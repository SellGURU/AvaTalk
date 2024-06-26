/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import LocationPicker, { PointMode } from "react-leaflet-location-picker";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LatLngTuple } from "leaflet";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditGoogleMap =() => {
    const auth = useAuth()
    const navigate = useNavigate();
    let currentBox:GoogleMapBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "GoogleMapBox")[0] as GoogleMapBox;
    if (currentBox == undefined) {
        currentBox = new GoogleMapBox("Google Map", {lan:33,lat:33});
    }
    const [pointVals, setPointVals] = useState([[currentBox.location.lan,currentBox.location.lat]]);
    const pointMode:PointMode = {
        banner: false,
        control: {
        values: pointVals as LatLngTuple[],
        onClick: (point: any) => setPointVals([...[point]]),
        onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
        },
    };    
     
    const initialValue = {
        title:currentBox.getTitle(),
    };    
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },
    });     
    const submit =() => {
        auth.currentUser.addBox(
            new GoogleMapBox(formik.values.title,{
                lan:pointVals[0][0] as number,
                lat:pointVals[0][1] as number
            })
        )
        navigate('/')
    }
    return (
        <>
            <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                {/* <BackIcon title="Google Map" theme="Carbon"></BackIcon> */}
                <div className="relative top-8">
                    <BackIcon title="Google Map" theme="Carbon"></BackIcon>
                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="mt-24 px-6 text-left">
                        <TextField  {...formik.getFieldProps("title")} errorMessage={formik.errors?.title} inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)} theme="Carbon" label="Title"  name="title" type="text" placeholder="Enter title..."></TextField>
                    </div>
                    <div className="px-6 mt-3">
                        <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
                    </div>
                    <div className="px-6 mt-10">
                        <Button onClick={() => {
                            submit()
                        }} theme="Carbon">Save Change</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditGoogleMap
