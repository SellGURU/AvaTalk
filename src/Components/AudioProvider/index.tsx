import React, { ReactEventHandler, MutableRefObject } from "react"

interface AudioProviderProps {
    theme?:string
    audioref:MutableRefObject<HTMLAudioElement | null>
    url:string
    onEnd:ReactEventHandler<HTMLAudioElement>
    autoPlay:boolean
}
const AudioProvider:React.FC<AudioProviderProps> = ({audioref,url,autoPlay,onEnd}) => {
    return (
        <>
          <div style={{visibility:'hidden',top:0,left:0,position:'absolute',width:'0px',height:'0px'}}>
              <div style={{position:'absolute',zIndex:300}}>
              <audio ref={audioref} controls onEnded={onEnd} autoPlay={autoPlay}>
                  <source id="audioPlayer" src={url} type="audio/mpeg"/>
              </audio>
              </div>             
          </div>          
        </>
    )
}

export default AudioProvider