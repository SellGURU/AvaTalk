import Footer from "../../Components/Footer"
import {Profile} from "../../Components"
import { useState } from "react"
import { MenuType } from "../../Types"
import ContactsView from "../../Components/ContactsView"
import Splash from "../../Components/Splash"

const Home = () => {
    const [menu,setMenu] = useState<MenuType>('profile')
    const [showSplash,setshowSplash] = useState(true);
    const menuResolver = () => {
        switch (menu) {
            case 'profile' : return <Profile theme="Carbon"></Profile>
            case 'contacts' : return <ContactsView theme="Carbon"></ContactsView>
            case 'settings' : return <Profile theme="Carbon"></Profile>
            case 'status' : return <Profile theme="Carbon"></Profile>
        }
    }
    setTimeout(() => {
        setshowSplash(false)
    }, 3000);
    return (
        <>
            {showSplash ?
                <Splash theme="Carbon"></Splash>
            :
            <>
                {menuResolver()}
                <Footer activeItem={menu} onItemChange={setMenu} theme="Carbon"/>
            </>
            }
        </>
    )
}

export default Home