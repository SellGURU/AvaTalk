/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { Outlet, useNavigate} from "react-router-dom"
import { useConstructor } from "../../help";
import { Chat } from "../../Api";
import { useState } from "react";

interface ChatDetailsProps {
    theme?:string
}

const ChatDetails:React.FC<ChatDetailsProps> = ({theme}) => {
    const navigate = useNavigate();
    const [currentChat,setCurrentChat] = useState<Array<any>>([])
    useConstructor(() => {
      Chat.showSelectedChat(window.location.hash.split('/')[2],(res) => {
        setCurrentChat(res)
      })
    })
    return (
        <>
          <div className={`${theme}-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-ChatDetails-title max-w-[280px] `}>{window.location.hash.split('/')[2]}</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
              <div className="text-center mb-1">{currentChat[0]?.messages[0]?.date}</div>
              {currentChat.map((el) => {
                return (
                  <>
                    <Button theme="Carbon" data-mode="ChatDetails-question-button">{el.messages[0].content}</Button>              
                    <div>{el.messages[1].content}</div>                  
                  </>
                )
              })}
              {/* <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>              
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div> */}
            </div>
                
          </div>
        </>
    )
}
export default ChatDetails