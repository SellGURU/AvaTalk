/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MenuType, chat } from "./Types";
import { AboutBox, Box, GalleryBox, LinkBox, SocialBox } from "./Model";
import { Chat } from "./Api";

const resolveMenuFromRoute = () => {
  // console.log(window.location.hash.replace('#/','').split('/')[0])
  switch (window.location.hash.replace("#/", "").split("/")[0]) {
    case "":
      return "profile";
    case "edit":
      return "profile";
    default:
      return window.location.hash.replace("#/", "").split("/")[0];
  }
};
const resolveNavigation = (item: MenuType, navigate: (route: string) => void) => {
  switch (item) {
    case "profile":
      return navigate("/");
    case "contacts":
      return navigate("/contacts");
    case "chats":
      return navigate("/chats");
    case "settings":
      return navigate("/settings");
    case "status":
      return navigate("/");
  }
};
const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) {
    return;
  }
  callBack();
  setHasBeenCalled(true);
};

const boxProvider = (box: any) => {
  switch (box.typeName) {
    case "SocialBox": {
      return Object.assign(new SocialBox("simple", []), box);
    }
    case "LinkBox": {
      return Object.assign(new LinkBox("simple", []), box);
    }
    case "AboutBox": {
      return Object.assign(new AboutBox("simple", ""), box);
    }
    case "GalleryBox": {
      return Object.assign(new GalleryBox("simple",[]), box);
    }    
    default: {
      return Object.assign(new Box("simple"), box);
    }
  }
};

const getDragAfterElement = (container: any, y: any) => {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};

const dragStart = (e: any, allowDrag: boolean, setDraggedItem: (value: any) => void) => {
  if (allowDrag) {
    setDraggedItem(e.target);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  }
};

const dragEnd = (e: any, allowDrag: boolean, setDraggedItem: (value: any) => void) => {
  setTimeout(() => {
    if (allowDrag) {
      e.target.style.display = "";
      setDraggedItem(null);
    }
  }, 0);
};

const dragOver = (e: any, allowDrag: boolean, draggedItem: any) => {
  if (allowDrag) {
    const sortableList = document.getElementById("sortable");
    e.preventDefault();
    const afterElement = getDragAfterElement(sortableList, e.clientY);
    if (afterElement == null) {
      sortableList?.appendChild(draggedItem);
    } else {
      sortableList?.insertBefore(draggedItem, afterElement);
    }
  }
};

const generateSlugId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const slugLength = 24;

  let slugId = "";

  for (let i = 0; i < slugLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    slugId += characters.charAt(randomIndex);
  }

  return slugId;
};

const sendToApi = (chats:Array<chat>,setChats:(chats:Array<chat>) => void,text:string,onresolve:(res:any) => void,oncatch:() => void) => {
    const aiChats = chats.filter((item) => item.from == 'Ai')
    const newChat:chat = {
      from:'user',
      text:text,
      instanceid:'',
      audio_file:'',
      currentconverationid:''  
    }
    setChats([...chats,newChat])
    chats.push(newChat)
    Chat.flow({
      "text":text,
      "language":"English",
      "message_key":"",
      "apikey":"0e218a19f41b4eb689003fa634889a19",
      "is_silent":false,
      "getcurrentconvesationid":aiChats.length > 0 ? aiChats[aiChats.length -1].currentconverationid : 1      
    }).then(res => {
      setChats([...chats,{
        from:'Ai',
        text:res.answer.answer,
        audio_file:res.answer.audio_file,
        instanceid:res.instanceid,
        currentconverationid:res.currentconverationid
      }])
      onresolve(res)
    }).catch(() => {
        oncatch()
    })    
}

export {
    resolveMenuFromRoute,
    resolveNavigation,
    useConstructor,
    boxProvider,
    getDragAfterElement,
    dragStart,
    dragEnd,
    dragOver,
    generateSlugId,
    sendToApi
}
