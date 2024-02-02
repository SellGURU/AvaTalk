/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MenuType } from "./Types";
import {AboutBox, Box ,LinkBox,SocialBox} from "./Model";

const resolveMenuFromRoute = () => {
    // console.log(window.location.hash.replace('#/','').split('/')[0])
    switch (window.location.hash.replace('#/','').split('/')[0]) {
        case '' : return 'profile';
        case 'edit': return 'profile';
        default : return window.location.hash.replace('#/','').split('/')[0];
    }
} 
const resolveNavigation = (item:MenuType, navigate:(route:string) => void) => {
    switch (item) {
        case 'profile' : return navigate('/')
        case 'contacts' : return navigate('/contacts')
        case 'chats' : return navigate('/chats')
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
        case 'LinkBox' : {
            return Object.assign(new LinkBox('simple',[]),box)
        }   
        case 'AboutBox' : {
            return Object.assign(new AboutBox('simple',''),box)
        }                
        default : {
            return Object.assign(new Box('simple'),box)
        }
    }
}

const getDragAfterElement = (
    container:any, y:any
) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];
 
    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };} 
            else {
                return closest;
            }},
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};

const dragStart = (e:any,allowDrag:boolean,setDraggedItem:(value:any) => void) => {
    if(allowDrag){
        setDraggedItem(e.target)
        setTimeout(() => {
        e.target.style.display =
            "none";
        }, 0);
    }    
}

const dragEnd = (e:any,allowDrag:boolean,setDraggedItem:(value:any) => void) => {
    setTimeout(() => {
        if(allowDrag){
            e.target.style.display = "";
            setDraggedItem(null)
        }
    }, 0);    
}

const dragOver = (e:any,allowDrag:boolean,draggedItem:any) => {
    if(allowDrag){
        const sortableList = document.getElementById("sortable");
        e.preventDefault();
        const afterElement =getDragAfterElement(sortableList,e.clientY);
        if (afterElement == null) {
            sortableList?.appendChild(
                draggedItem
            );} 
        else {
            sortableList?.insertBefore(
                draggedItem,
                afterElement
            );}            
    }    
}
export {
    resolveMenuFromRoute,
    resolveNavigation,
    useConstructor,
    boxProvider,
    getDragAfterElement,
    dragStart,
    dragEnd,
    dragOver
}