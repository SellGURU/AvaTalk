/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
// import { Cropper } from "react-cropper"
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

import { Button } from "symphony-ui"

interface CropperBoxProps {
    url:string
    onResolve: (base64:string|ArrayBuffer|null) => void
    onCancel:() => void
}

const CropperBox:React.FC<CropperBoxProps> = ({url,onResolve,onCancel}) => {
    const [cropper,setCropper] = useState<any>()
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
        if(cropper){
            onResolve(cropper)
        }
    }
    const cancel =() => {
        onCancel()
    }
	const onChange = (cropper: CropperRef) => {
		// console.log(cropper.getCanvas()?.toDataURL());
        setCropper(cropper.getCanvas()?.toDataURL())
	};    
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
                                onChange={onChange}
                                // stencilComponent={{
                                //     aspectRatio: 1/1,
                                //     movable: false,
                                //     resizable: false                                    
                                // }}
                                stencilProps={{
                                    aspectRatio: 2/1,
                                }}
                                style={{ height: 400, width: 400 }}
                            />                            
                            <div className="mt-4 flex justify-center gap-2 px-4">
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