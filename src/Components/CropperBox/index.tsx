/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Cropper } from "react-cropper"
import { Button } from "symphony-ui"

interface CropperBoxProps {
    url:string
    onResolve: (base64:string|ArrayBuffer|null) => void
}

const CropperBox:React.FC<CropperBoxProps> = ({url,onResolve}) => {
    const [cropper,setCropper] = useState<any>()
    const getCropData = async () => {
        if (cropper) {
            const file = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                return new File([blob], "newAvatar.png", { type: "image/png" });
                });
            if (file) {
                console.log(file)
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    onResolve(reader.result)
                };                
            }
        }
    };    
    return (
        <>
        {
            url.length > 0 ?
            <>
                    <div className="absolute w-full top-0 left-0 h-screen z-[22] bg-black opacity-60"></div>     
                    <div className='absolute w-full top-0 left-0 h-full flex z-30 justify-center items-center'>
                        <div>
                            <Cropper
                            // autoCropArea={80}
                            src={url}
                            aspectRatio={1.5}
                            style={{ height: 400, width: 400 }}
                            onInitialized={(instance) => {
                                console.log(instance)
                                setCropper(instance);
                            }}
                            />
                            <div className="mt-2">
                                <Button onClick={getCropData} theme="Carbon-Crop">crop</Button> 
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