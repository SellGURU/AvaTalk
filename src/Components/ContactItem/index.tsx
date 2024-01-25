interface DataProps {
  id: number;
  name: string;
  email: string;
  image: string;
  Exhibition: boolean;
  Exchange: boolean;
}

const ContactItem = ({ data, theme }: { data: DataProps; theme: string | undefined }) => {
  return (
    <div className={`${theme}-ContactItem-container `}>
      <div className={`${theme}-ContactItem-section `}>
        {data.Exchange && <p className={`${theme}-ContactItem-exchange `}>Exchange</p>}
        <img src={data.image} alt={data.name} />
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
    </div>
  );
};

export default ContactItem;
