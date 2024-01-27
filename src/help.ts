import { MenuType } from "./Types";

const resolveMenuFromRoute = () => {
    switch (window.location.hash.replace('#/','')) {
        case '' : return 'profile';
        default : return window.location.hash.replace('#/','');
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