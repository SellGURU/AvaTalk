import { useState } from "react"
import { Button } from "symphony-ui"
import { Card } from ".."
import { Outlet, useNavigate } from "react-router-dom"

interface EditProps {
    theme?:string
}

const Edit:React.FC<EditProps> = ({theme}) => {
    const navigate = useNavigate();
    const [editCards] =useState([
        {
            name:'Contact Info',
            icon:'book.svg',
            link:'',
            description:'Add the contact info you’d like to share others.'
        },
        {
            name:'About',
            icon:'info.svg',
            link:'about',
            description:'Share something about yourself.'
        },
        {
            name:'Gallery',
            icon:'gallery.svg',
            link:'gallery',
            description:'Add images to your profile.'
        }           
    ])
    return (
        <>
            <div className={`${theme}-Edit-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`${theme}-back`}>
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
                <p className={`${theme}-Edit-title`}>Edit Profile</p>
            </div>            

            <div className="px-6 mt-32">
                {editCards.map(item => {
                    return (
                        <Card linkTo={item.link} content={item} theme="Carbon"></Card>
                    )
                })}
            </div>    
            </div>
        </>
    )
}
export default Edit