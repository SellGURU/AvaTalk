import {BackIcon} from "../../../Components";
import {Accordion} from "../../../Components/accardion";

export const UserManual=()=>{
    const AccordionData=[
        {
            body:"How we use...?",
            title:"step into the future of professional networking with the Avatalk NFC Business Card, a cutting-edge tool designed to transform how you connect with others. This isn’t just another business card—it’s an AI-powered networking assistant embedded within a sleek, modern design. The Avatalk NFC Business Card goes beyond traditional contact sharing, offering a comprehensive digital experience that captivates, engages, and leaves a lasting impression."
        },
        {
            body:"What is ...?",
            title:""
        },
        {
            body:"How we can...?",
            title:""
        },

    ]
    return(
        <>
            <div className={"w-full bg-[#FDFDFE] hiddenScrollBar h-dvh top-[0px]  z-[15]"}>
                <div className=" top-4">
                    <BackIcon title="User Manumal" theme="Carbon"></BackIcon>

                </div>
                <div
                    className={" p-4 rounded-lg  px-16 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[10px]"}>
                    {AccordionData.map(({title, body})=>{
                        return (
                            <Accordion bodyText={title} title={body}/>
                        )
                    })}

                </div>
            </div>
        </>
    )
}