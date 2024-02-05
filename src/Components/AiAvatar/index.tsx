import { MutableRefObject } from "react"

interface AiAvatarProps {
    videoUrl:string
    videoref:MutableRefObject<HTMLVideoElement | null>
}

const AiAvatar:React.FC<AiAvatarProps> = ({videoUrl,videoref}) => {
    return (
        <>
          <div style={{display:'flex',zIndex:20,top:0,justifyContent:'center',width:'100%'}}>
              <video id="dragAbleAi" playsInline ref={videoref} height={'80%'} style={{borderRadius:'100%'}} className="pk_video" preload="auto" width={'80%'} autoPlay={true} loop muted >
                  <source id="videoPlayer"  src={videoUrl} type="video/mp4"></source>
              </video> 
          </div>           
        </>
    )
}
export default AiAvatar