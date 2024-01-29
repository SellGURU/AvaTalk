/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MenuType } from "./Types";
import {Box ,SocialBox} from "./Model";

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
const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) {
    return;
  }
  callBack();
  setHasBeenCalled(true);
};

const boxProvider = (box:any) => {
    switch(box.typeName) {
        case 'SocialBox' : {
            return Object.assign(new SocialBox('simple',[]),box)
        }
        default : {
            return Object.assign(new Box('simple'),box)
        }
    }
}

export {
    resolveMenuFromRoute,
    resolveNavigation,
    useConstructor,
    boxProvider
}