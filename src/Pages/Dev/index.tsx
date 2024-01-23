import { useState } from "react"
import { Select } from "../../Components"

const Dev = () => {
    const medias = [
        {
            name:'Linkedin',
            icon:'devicon_linkdin.svg'
        },
        {
            name:'Instagram',
            icon:'devicon_instagram.svg'
        },
        {
            name:'Facebook',
            icon:'devicon_facebook.svg'
        },
        {
            name:'Twitter/ X',
            icon:'devicon_twitter.svg'
        },
        {
            name:'Youtube',
            icon:'devicon_youtube.svg'
        },                                
    ]
    const [selectItem,setSelectedItem] = useState(medias[0])
    return (
        <>
            <Select
                valueElement={
                    <div className={`cursor-pointer mt-[2px] flex justify-start items-center`}>
                        <img className="h-4" src={"./icons/media/"+selectItem.icon} alt="" />
                        <div className="ml-1 text-gray-700 text-sm">{selectItem.name}</div>
                    </div>
                }
                theme="Carbon"
            >
                {medias.map((item,index) => {
                    return (
                        <div onClick={() => {
                            setSelectedItem(item)
                            }} className={`h-[50px] px-5 border-b border-[white] cursor-pointer flex justify-start items-center ${index == medias.length -1 ? ' border-none':''}`}>
                            <img className="h-4" src={"./icons/media/"+item.icon} alt="" />
                            <div className="ml-1 text-gray-700 text-sm">{item.name}</div>
                        </div>
                    )
                })}
                
            </Select>
        </>
    )
}

export default Dev