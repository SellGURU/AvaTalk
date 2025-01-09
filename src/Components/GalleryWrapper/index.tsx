/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageGallery from "react-image-gallery";
import { Button } from "symphony-ui";
import { Fullscreen } from 'lucide-react';
import { Auth } from "../../Api";
import { useEffect, useState } from "react";
// import { Auth } from "../../Api";
interface GalleryWrapperProps {
    contentsUp:Array<any>
}
const GalleryWrapper:React.FC<GalleryWrapperProps> =({contentsUp}) => {
    const theme = 'Carbon'
    const [contents,setContents] = useState<any>([])
    const resolveContent = async () => {
        const filesids:any =contentsUp;
        const base64Images = await Promise.all(
            filesids.map(async (fileId:any) => {
            const data = await Auth.getContentsFile(fileId);
            return data.data.content ;
            })
        );
        setContents(base64Images)
    }    
    useEffect(() => {
        resolveContent()
    },[contentsUp])
    return (
        <>
            <ImageGallery 
            showFullscreenButton={true}
            items={contents} 
            renderLeftNav={(onClick, disabled) => {
                return (
                    <>
                        <div  className={`${theme}-back-Button-container-box `} style={{transform: 'translate(30%, -50%)'}} data-mode="gallery">
                            <Button onClick={onClick} disabled={disabled} theme={`${theme}-back`}>
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>
                    </>
                )
            }} 
            renderRightNav={(onClick, disabled) => {
                return (
                    <>
                        <div  className={`${theme}-back-Button-container-box`} style={{transform: 'translate(-30%, -50%)',right:'0%'}}  data-mode="gallery">
                            <Button onClick={onClick} disabled={disabled}  theme={`${theme}-back`} style={{rotate:'180deg'}}>
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>
                    </>
                )
            }}
            renderFullscreenButton={(onClick, isFullscreen ,) => {
                // console.log(isFullscreen)
                if(!isFullscreen){
                    document.querySelectorAll(".image-gallery-image").forEach((element:any) => {
                        console.log(element)
                        element.style.height = "400px";
                        element.style.maxHeight = "400px "; // Change property and value as needed
                    });                            
                }

                return (
                    <div className="absolute right-1 bottom-4 z-[2] cursor-pointer" onClick={(e) => {
                        // console.log(document.getElementById("image-gallery-image"))
                        // const cols =document.getElementsByClassName("image-gallery-image")
                        document.querySelectorAll(".image-gallery-image").forEach((element:any) => {
                            console.log(element)
                            element.style.height = "100vh ";
                            element.style.maxHeight = "100vh "; // Change property and value as needed
                        });
                        onClick(e)
                    }}  >
                        <Fullscreen></Fullscreen>
                    </div>
                )
            }}
            />   
        </>
    )
}

export default GalleryWrapper