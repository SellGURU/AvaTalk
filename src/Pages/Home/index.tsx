import Footer from "../../Components/Footer"
import {Profile} from "../../Components"
import { useState } from "react"
import { MenuType } from "../../Types"
import ContactsView from "../../Components/ContactsView"

const Home = () => {
    const [menu,setMenu] = useState<MenuType>('profile')
    const menuResolver = () => {
        switch (menu) {
            case 'profile' : return <Profile theme="Carbon"></Profile>
            case 'contacts' : return <ContactsView theme="Carbon"></ContactsView>
            case 'settings' : return <Profile theme="Carbon"></Profile>
            case 'status' : return <Profile theme="Carbon"></Profile>
        }
    }
    return (
        <>
            {menuResolver()}
            <Footer activeItem={menu} onItemChange={setMenu} theme="Carbon"/>
        </>
    )
}

export default Home