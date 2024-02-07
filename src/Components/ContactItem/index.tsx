import { Link } from "react-router-dom";
import { Contact } from "../../Types";

const ContactItem = ({ data, theme }: { data: Contact; theme: string | undefined }) => {
  return (
    <Link to={`/contacts/${data.id}`} className={`${theme}-ContactItem-container `}>
      <div className={`${theme}-ContactItem-section `}>
        {data.isExchange && <p className={`${theme}-ContactItem-exchange `}>Exchange</p>}
        <img src={data.photo} alt={data.lastName} className="w-[50px] h-[50px]" />
        <div className={`${theme}-ContactItem-card `}>
          <div className={`${theme}-ContactItem-innerCard `}>
            <p className={`${theme}-ContactItem-name `}>{data.firstName+' '+ data.lastName}</p>
            <div className={`${theme}-ContactItem-iconContainer `}>
              {data.tags.length>0 && <p className={`${theme}-ContactItem-exhibition `}>{data.tags[0].name}</p>}
              <div className={`${theme}-ContactItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ContactItem-email `}>{data.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContactItem;
