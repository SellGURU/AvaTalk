import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  name: string;
  email: string;
  image: string;
  Exhibition: boolean;
  Exchange: boolean;
}

const ContactItem = ({ data, theme }: { data: DataProps; theme: string | undefined }) => {
  return (
    <Link to={`/contacts/${data.id}`} className={`${theme}-ContactItem-container `}>
      <div className={`${theme}-ContactItem-section `}>
        {data.Exchange && <p className={`${theme}-ContactItem-exchange `}>Exchange</p>}
        <img src={data.image} alt={data.name} className="w-[50px] h-[50px]" />
        <div className={`${theme}-ContactItem-card `}>
          <div className={`${theme}-ContactItem-innerCard `}>
            <p className={`${theme}-ContactItem-name `}>{data.name}</p>
            <div className={`${theme}-ContactItem-iconContainer `}>
              {data.Exhibition && <p className={`${theme}-ContactItem-exhibition `}>Exhibition</p>}
              <img src="../../../Vector.svg" alt="" />
              {/* <div className={`${theme}-ContactItem-vectorIcon `}></div> */}
            </div>
          </div>
          <p className={`${theme}-ContactItem-email `}>{data.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContactItem;
