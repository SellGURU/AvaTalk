/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const EditGoogleMap =() => {
    const auth = useAuth()
    const navigate = useNavigate();
    const [pointVals, setPointVals] = useState([[auth.currentUser.information?.location.lat, auth.currentUser.information?.location.lng]]);
    const pointMode = {
        banner: false,
        control: {
        values: pointVals,
        onClick: (point: any) => setPointVals([...[point]]),
        onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
        },
    };    
    let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == 'GoogleMapBox')[0] as GoogleMapBox    
    if(currentBox == undefined) {
        currentBox = new GoogleMapBox('Google Map',{
            lan:auth.currentUser.information?.location.lat as number,
            lat:auth.currentUser.information?.location.lng as number
        })
    }
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
                <div className="relative top-4">
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
