import { MutableRefObject } from "react"

interface AiAvatarProps {
    videoUrl:string
    videoref:MutableRefObject<HTMLVideoElement | null>
}

const AiAvatar:React.FC<AiAvatarProps> = ({videoUrl,videoref}) => {
    return (
        <>
          <div style={{display:'flex',zIndex:20,top:0,justifyContent:'center',height:'100%'}}>
              <video id="dragAbleAi" playsInline ref={videoref} height={'100%'} style={{borderRadius:'100%',maxWidth:'auto',marginTop:window.innerWidth>600?'-20px':'0px'}} className="pk_video" preload="auto"  autoPlay={true} loop muted >
                  <source id="videoPlayer"  src={videoUrl} type="video/mp4"></source>
              </video>               
          </div>           
        </>
    )
}
export default AiAvatar