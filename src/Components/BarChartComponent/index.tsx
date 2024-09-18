/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../../hooks/useAuth";

// const data = [
//   {
//     name: "Socials",
//     value: 450,
//   },
//   {
//     name: "Links",
//     value: 200,
//   },
//   {
//     name: "Videos",
//     value: 300,
//   },
//   {
//     name: "Gallery",
//     value: 220,
//   },
//   {
//     name: "Contact",
//     value: 380,
//   },
//   {
//     name: "About",
//     value: 300,
//   },
//   {
//     name: "Al",
//     value: 420,
//   },
// ];
interface Props {
  theme?: string;
  data:Array<any>
}
const BarChartComponent: React.FC<Props> = ({ theme ,data}) => {
  const context = useAuth()
  const [filterdata, setFilterData] = useState<Array<any>>(data.map(el => {
    return {
      name:el.type,
      value:el.count,
    }
  }));  
  useEffect(() => {
    setFilterData(data.map(el => {
      return {
        name:el.type,
        value:el.count,
      }
    }))     
  },[data])
  return (
    <div className="relative w-[100%] ">
    {context.currentUser.type_of_account.getType() == 'Free'?
      <>
        <p className={`${theme}-AreaChartComponent-text absolute top-4 left-4 z-10`}>Clicks per Category</p>
        <img className=" scale-[1.027] w-full z-20 " src="./icons/chartBlur3.png" alt="" />
      </>       
    :
      <div className={`${theme}-BarChartComponent-container`}>
        <p className={`${theme}-BarChartComponent-text`}>Clicks per Category</p>
        {data.length>0?(        <ResponsiveContainer width="100%" height="100%">
              <BarChart
                  data={filterdata}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -30,
                    bottom: 0,
                  }}
                  barSize={28}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} stroke="#9CA3AF" />
                <YAxis fontSize={12} stroke="#9CA3AF" />
                <Tooltip cursor={false} />
                <Bar dataKey="value" fill="#5048E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
        ):(<div className={" h-full w-full flex-col flex items-center justify-center scale-150"}>
          <img className={"md:w-20 w-16 h-16 md:h-20 "} src={"/Carbon/notDAtaToShow.svg"}/>
          <h1 className={"text-[12px] font-medium"}>No data to show</h1>

        </div>)}
      </div>
    }
    </div>
  );
};

export default BarChartComponent;