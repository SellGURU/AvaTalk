import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  chat_list_id: string;
  entry_date: string;
  entry_time:string;
  response:string;
  date_group:string; 
}

const ChatItem = ({data, theme,visibleDate}: { data: DataProps; theme: string | undefined,visibleDate:boolean}) => {

  return (
    <>
    {visibleDate ?
      <div className={`${theme}-ChatItem-date`}>{data.date_group}</div>
    :undefined}
    <Link to={`/chats/${data.chat_list_id}`} className={`${theme}-ChatItem-container`}>
      <div className={`${theme}-ChatItem-section`}>
        <div className={`${theme}-ChatItem-card`}>
          <div className={`${theme}-ChatItem-innerCard `}>
            <p className={`${theme}-ChatItem-name`}>{data.chat_list_id}</p>
            <div className={`${theme}-ChatItem-iconContainer `}>
              <div>{data.entry_time.substring(0,5)}</div>
              <div className={`${theme}-ChatItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ChatItem-content`}>{data.response.substring(0,80)}</p>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ChatItem;
