/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { Outlet, useNavigate, useSearchParams} from "react-router-dom"
import { useConstructor } from "../../help";
import { Chat } from "../../Api";
import { useState } from "react";

interface ChatDetailsProps {
    theme?:string
}

const ChatDetails:React.FC<ChatDetailsProps> = ({theme}) => {
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams()
    // console.log(queryParameters.get("name"))
    const [currentChat,setCurrentChat] = useState<Array<any>>([])
    useConstructor(() => {
      Chat.showSelectedChat(window.location.hash.split('/')[2],(res) => {
        setCurrentChat(res)
      })
    })
    const formatText = (text:string) => {
  // Split the text on newlines and process each line
      return text.split('\n').map((line, index) => {
        // Check for headers
        if (line.startsWith('### ')) {
          return <h3 key={index}>{line.slice(4)}</h3>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index}>{line.slice(3)}</h2>;
        } else if (line.startsWith('# ')) {
          return <h1 key={index}>{line.slice(2)}</h1>;
        }

        // Process bold text within the lines
        const parts = line.split(/(\*\*[^*]+\*\*)/g); // Split by bold format (**bold**)
        
        return (
          <p key={index}>
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the asterisks and render bold text
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              } else {
                return part; // Regular text
              }
            })}
          </p>
        );
      });
    };    
    return (
        <>
          <div className={`${theme}-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-ChatDetails-title max-w-[280px] `}>{queryParameters.get("name")}</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
              <div className="text-center mb-1">{currentChat[0]?.messages[0]?.date}</div>
              {currentChat.map((el) => {
                return (
                  <>
                    <div className="bg-primary-color text-[14px] text-white px-4 py-3 rounded-[16px] rounded-tl-none">{ formatText(el.messages[0].content)}</div>
                    {/* <Button theme="Carbon" data-mode="ChatDetails-question-button">{el.messages[0].content}</Button>               */}
                    <div className="bg-[#F3F4F6] text-[14px] text-[#374151] px-4 py-3 rounded-[16px] rounded-tr-none">{formatText(el.messages[1].content)}</div>                  
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