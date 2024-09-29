import { useNavigate } from "react-router-dom";

interface DataProps {
  id: string;
  chat_list_id: string;
  entry_date: string;
  entry_time:string;
  response:string;
  title:string;
  date_group:string; 
}

const ChatItem = ({data, theme,visibleDate,plan}: { data: DataProps; theme: string | undefined,visibleDate:boolean,plan:string}) => {
  const navigate = useNavigate()
  return (
    <>
    {visibleDate  ?
      <div className={`${theme}-ChatItem-date`}>{data.date_group}</div>
    :undefined}
    <div  onClick={() => {
      if(plan != 'Free' || data.title == 'Samantha'){
        navigate(`/chats/${data.chat_list_id}/?name=${data.title}`)
      }
      // to={`/chats/${data.chat_list_id}`}
    }}  className={`${theme}-ChatItem-container`} style={{opacity:plan != 'Free' || data.title == 'Samantha'?'100%':'30%'}}>
      <div className={`${theme}-ChatItem-section`}>
        <div className={`${theme}-ChatItem-card`}>
          <div className={`${theme}-ChatItem-innerCard `}>
            <p className={`${theme}-ChatItem-name`}>{data.title?data.title: data.chat_list_id.substring(0,22)+' ...'}</p>
            <div className={`${theme}-ChatItem-iconContainer `}>
              <div>{data.entry_time.substring(0,5)}</div>
              <div className={`${theme}-ChatItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ChatItem-content`}>{data.response.substring(0,35)+' ...'}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatItem;
