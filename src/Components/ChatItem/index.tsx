import { useNavigate } from "react-router-dom";
import { publish } from "../../utils/event";

interface DataProps {
  id: string;
  chat_list_id: string;
  entry_date: string;
  entry_time:string;
  response:string;
  title:string;
  date_group:string; 
}

const ChatItem = ({data, theme,visibleDate,isLimitedChat}: { data: DataProps; theme: string | undefined,visibleDate:boolean,plan:string,isLimitedChat:boolean}) => {
  const navigate = useNavigate()
  return (
    <>
    {visibleDate  ?
      <div className={`${theme}-ChatItem-date`}>{data.date_group}</div>
    :undefined}
    <div  onClick={() => {
      if(!isLimitedChat|| data.title == 'Samantha'){
        navigate(`/chats/${data.chat_list_id}/?name=${data.title}`)
      }
      if(isLimitedChat&&data.title != 'Samantha'){
        setTimeout(() => {
          publish("chatReadyForMore",{})
          
        }, 500);
      }      
      // to={`/chats/${data.chat_list_id}`}
    }}  className={`${theme}-ChatItem-container`} style={{opacity:!isLimitedChat || data.title == 'Samantha'?'100%':'30%'}}>
      <div className={`${theme}-ChatItem-section`}>
        <div className={`${theme}-ChatItem-card`}>
          <div className={`${theme}-ChatItem-innerCard `}>
            <p className={`${theme}-ChatItem-name`}>{data.title?data.title: data.chat_list_id.substring(0,22)+' ...'}</p>
            <div className={`${theme}-ChatItem-iconContainer `}>
              <div>{data.entry_time.substring(0,5)}</div>
              <div className={`${theme}-ChatItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ChatItem-content`}>{data.response}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatItem;
