import React, { ReactEventHandler, MutableRefObject } from "react"

interface AudioProviderProps {
    theme?:string
    audioref:MutableRefObject<HTMLAudioElement | null>
    url:string
    onEnd:ReactEventHandler<HTMLAudioElement>
    autoPlay:boolean
    setStartVideoTalking:(action:boolean) => void
}
const AudioProvider:React.FC<AudioProviderProps> = ({audioref,setStartVideoTalking,url,autoPlay,onEnd}) => {
    return (
        <>
          <div style={{visibility:'hidden',top:0,left:0,position:'absolute',width:'0px',height:'0px'}}>
              <div style={{position:'absolute',zIndex:300}}>
              <audio  ref={audioref} onLoadedData={() => {
                setStartVideoTalking(true)
              }}  controls onEnded={onEnd} autoPlay={autoPlay}>
                  <source id="audioPlayer" src={url} type="audio/mpeg"/>
              </audio>
              </div>             
          </div>          
        </>
    )
}

export default AudioProvider