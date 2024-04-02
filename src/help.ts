/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useState } from "react";
import { MenuType, chat } from "./Types";
import { AboutBox, Box, GalleryBox, GoogleMapBox, LinkBox, SocialBox } from "./Model";
import { Chat } from "./Api";

const resolveMenuFromRoute = () => {
  console.log(window.location.pathname.replace("/", "").split("/")[0])
  // console.log(window.location.hash.replace('#/','').split('/')[0])
  switch (window.location.pathname.replace("/", "").replace("?splash=false", "").split("/")[0]) {
    case "":
      return "profile";
    case "edit":
      return "profile";
    default:
      return window.location.pathname.replace("/", "").replace("?splash=false", "").split("/")[0];
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
      return navigate("/anaylitics");
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
      return Object.assign(new GalleryBox("simple", []), box);
    }
    case "GoogleMapBox": {
      return Object.assign(new GoogleMapBox("simple",{lan:0,lat:0}), box);
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

const sendToApi = (
  chats: Array<chat>, 
  setChats: (chats: Array<chat>) => void,
  text: string,
  onresolve: (res: any) => void,
  oncatch: () => void,
  language:string,
  BLokedIdList:MutableRefObject<string[]>,
  userId:string
  ) => {
  const aiChats = chats.filter((item) => item.from == "Ai");
  const newChat: chat = {
    from: "user",
    message_key: makeid(15),
    text: text,
    instanceid: "",
    audio_file: "",
    chat_user:'',
    currentconverationid: "",
  };
  setChats([...chats, newChat]);
  chats.push(newChat);
  console.log(window.location.href.includes('?user='))
  let chatUser = aiChats.length > 0 ? aiChats[aiChats.length - 1].chat_user : undefined
  if(!window.location.href.includes('?user=')){
    chatUser =userId
  }
  // console.dir(BLokedIdList.current)
  Chat.flow({
    text: text,
    language: language,
    message_key: makeid(15),
    // apikey: "0e218a19f41b4eb689003fa634889a19",
    user_bot_id: userId,
    chat_user:chatUser,
    is_silent: false,
    getcurrentconvesationid: aiChats.length > 0 ? aiChats[aiChats.length - 1].currentconverationid : 1,
  })
    .then((res) => {
      console.dir(BLokedIdList.current)
      if(!BLokedIdList.current.includes(res.message_key as never)){
        setChats([
          ...chats,
          {
            from: "Ai",
            text: res.answer.answer,
            message_key:res.message_key,
            audio_file: res.answer.audio_file,
            instanceid: res.instanceid,
            currentconverationid: res.currentconverationid,
            chat_user:res.chat_user
          },
        ]);
        onresolve(res);
      }
    })
    .catch(() => {
      oncatch();
    });
};

const reolveJsonToObject = (jsonuser: string) => {
  const jsonparse = JSON.parse(jsonuser);
  if (jsonparse) {
    return resolveBoxsJson(jsonparse.boxs);
  }
  return [];
};

const resolveBoxsJson = (jsonBox: Array<any>) => {
  return jsonBox.map((item) => {
    switch (item.typeName) {
      case "GoogleMapBox":
        return new GoogleMapBox(item.title, item.location);
      case "AboutBox":
        return new AboutBox(item.title, item.text);
      case "GalleryBox":
        return new GalleryBox(item.title, item.contents);
      case "SocialBox":
        return new SocialBox(item.title, item.socialMedias);
      case "LinkBox":
        return new LinkBox(item.title, item.links);
    }
  }) as Array<Box>;
};

function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
export { resolveMenuFromRoute, resolveNavigation, useConstructor, boxProvider, getDragAfterElement, dragStart, dragEnd, dragOver, generateSlugId, sendToApi, reolveJsonToObject };
