import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  name: string;
  date: string;
  time:string;
  content:string;
}

const ChatItem = ({data, theme }: { data: DataProps; theme: string | undefined }) => {
  return (
    <>
    <div className={`${theme}-ChatItem-date`}>{data.date}</div>
    <Link to={`/chats/${data.id}`} className={`${theme}-ChatItem-container`}>
      <div className={`${theme}-ChatItem-section`}>
        <div className={`${theme}-ChatItem-card`}>
          <div className={`${theme}-ChatItem-innerCard `}>
            <p className={`${theme}-ChatItem-name`}>{data.name}</p>
            <div className={`${theme}-ChatItem-iconContainer `}>
              <div>{data.time}</div>
              <div className={`${theme}-ChatItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ChatItem-content`}>{data.content}</p>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ChatItem;
