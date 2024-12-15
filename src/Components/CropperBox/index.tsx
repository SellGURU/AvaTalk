/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useRef } from "react"
// import { Cropper } from "react-cropper"
import { CircleStencil, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

import { Button } from "symphony-ui"
import { publish } from "../../utils/event";

interface CropperBoxProps {
    url:string
    onResolve: (base64:string|ArrayBuffer|null) => void
    onCancel:() => void
}

const CropperBox:React.FC<CropperBoxProps> = ({url,onResolve,onCancel}) => {
    // const [cropper,setCropper] = useState<any>()
    useEffect(() => {
        publish("IncressFooter",{})
        publish("profileIsReview",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])     
    const onCrop = () => {
        if (cropperRef.current) {
            // setCropper(cropperRef.current.getCanvas()?.toDataURL())
            onResolve(cropperRef.current.getCanvas()?.toDataURL())
            // setCoordinates(cropperRef.current.getCoordinates());
            // // You are able to do different manipulations at a canvas
            // // but there we just get a cropped image, that can be used
            // // as src for <img/> to preview result
            // setImage(cropperRef.current.getCanvas()?.toDataURL());
        }
    };
    // const getCropData = async () => {
    //     if (cropper) {
    //         const file = await fetch(cropper.getCroppedCanvas().toDataURL())
    //             .then((res) => res.blob())
    //             .then((blob) => {
    //             return new File([blob], "newAvatar.png", { type: "image/png" });
    //             });
    //         if (file) {
    //             console.log(file)
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file);
    //             reader.onload = () => {
    //                 onResolve(reader.result)
    //             };                
    //         }
    //     }
    // };    
    const getData2 = () => {
        onCrop()
        // if(cropper){
        //     onResolve(cropper)
        // }else {
        //     getCropData()
        // }
    }
    const cancel =() => {
        onCancel()
    }
    const cropperRef = useRef<any>(null); // Reference to the Cropper
	// const onChange = (cropper: CropperRef) => {
	// 	// console.log(cropper.getCanvas()?.toDataURL());
    //     setCropper(cropper.getCanvas()?.toDataURL())
	// };    
//   const getCropData = () => {
//     if (cropperRef.current) {
//       const cropperInstance = cropperRef.current;

//       // Get crop coordinates
//       const coordinates = cropperInstance.getCoordinates();

//       // Get cropped area as a canvas
//       const canvas = cropperInstance.getCanvas();

//       if (canvas) {
//         const preview = canvas.toDataURL(); // Base64 image
//         setCropper(
//           preview,
//         );
//         onResolve(preview)
        
//         console.log("Crop Data:", { coordinates, preview });
//       } else {
//         console.log("No canvas available. Ensure the cropper is loaded.");
//       }
//     }
//   };  
    return (
        <>
        {
            url.length > 0 ?
            <>
                    <div className="absolute w-full top-0 left-0 h-screen z-[42] bg-black opacity-[0.6]"></div>     
                    <div className='absolute w-full top-0 left-0 h-full flex z-[45] justify-center items-center'>
                        <div>
                            {/* <Cropper
                            // autoCropArea={80}
                            src={url}
                            aspectRatio={1.5}
                            style={{ height: 400, width: 400 }}
                            onInitialized={(instance) => {
                                console.log(instance)
                                setCropper(instance);
                            }}
                            /> */}

                            <Cropper
                                src={url}
                                ref={cropperRef}
                                // onChange={onChange}
                                stencilComponent={CircleStencil}
                                // stencilComponent={{
                                //     aspectRatio: 1/1,
                                //     movable: false,
                                //     resizable: false                                    
                                // }}
                                stencilProps={{
                                    aspectRatio: 1/1,
                                }}
                                style={{ height: 400, width: 400 }}
                            />                            

                            <div className="mt-7 flex justify-center gap-2 px-4">
                                <Button onClick={cancel} theme="Carbon-Google" style={{boxShadow:'none'}}>Cancel</Button> 
                                <Button onClick={getData2} theme="Carbon-Crop">Crop</Button> 
                            </div>

                        </div>
                    </div>  
            </>
            :undefined
        }        

        </>
    )
}

export default CropperBox