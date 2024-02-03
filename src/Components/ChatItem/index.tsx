import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  name: string;
  content:string;
}

const ChatItem = ({ theme }: { data: DataProps; theme: string | undefined }) => {
  return (
    <Link to={`/chats`} className={`${theme}-ContactItem-container `}>
      <div className={`${theme}-ContactItem-section ${theme}-ChatItem-section`}>
        <div className={`${theme}-ChatItem-card `}>
          <div className={`${theme}-ContactItem-innerCard `}>
            <p className={`${theme}-ContactItem-name `}>User0215784515</p>
            <div className={`${theme}-ChatItem-iconContainer `}>
              <div className="text-xs	">06:45 pm</div>
              <img src="../../../Vector.svg" alt="" />
              {/* <div className={`${theme}-ContactItem-vectorIcon `}></div> */}
            </div>
          </div>
          <p className={`${theme}-ContactItem-email `}>Can you call me? It’s necessary to talk wit...</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
