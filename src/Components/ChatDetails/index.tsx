import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

interface ChatDetailsProps {
    theme?:string
}

const ChatDetails:React.FC<ChatDetailsProps> = ({theme}) => {
    const navigate = useNavigate();

    return (
        <>
          <div className={`${theme}-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-ChatDetails-title`}>User0215784515</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-[-webkit-fill-available] overflow-y-scroll pb-[300px] pt-[32px]">
              <div className="text-center mb-1">12 Jan 2024</div>
              
              <Button theme="Carbon" data-mode="ChatDetails-question-button">Can you introduce yourself?</Button>              
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
              <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
            </div>
                
          </div>
        </>
    )
}
export default ChatDetails