import { MenuType } from "./Types";

const resolveMenuFromRoute = () => {
    // console.log(window.location.hash.replace('#/','').split('/')[0])
    switch (window.location.hash.replace('#/','').split('/')[0]) {
        case '' : return 'profile';
        default : return window.location.hash.replace('#/','').split('/')[0];
    }
} 
const resolveNavigation = (item:MenuType, navigate:(route:string) => void) => {
    switch (item) {
        case 'profile' : return navigate('/')
        case 'contacts' : return navigate('/contacts')
        case 'settings' : return navigate('/')
        case 'status' : return navigate('/')
    }        
}

export {
    resolveMenuFromRoute,
    resolveNavigation
}