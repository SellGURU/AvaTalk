/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ToggleButton from "../ToggleButton";
// import SearchBox from "../SearchBox";
import ChatList from "../ChatList";
import { Outlet } from "react-router";
import { useConstructor } from "../../help";
// import { TagList } from "..";
import ChatApi from '../../Api/Chat'
import AccessNotifManager from "../AccessNotifManager";
import { EnhanceModal } from "../__Modal__";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  theme?: string;
}

const Chat: React.FC<Props> = ({ theme }) => {

  const [searchQuery] = useState<string>("");
  const [chats,setChats] = useState<Array<any>>([]);
  const navigate = useNavigate()
  const appcontext = useAuth()
  // const [isLoading, setIsLoading] = useState(false);
  const [showEchangeModal,setShowEchangeModal] = useState(false)
  const [activeView, setActiveView] = useState("Visitors Chat History");

  useConstructor(() => {
    ChatApi.showList((res) => {
      // if(res.cha)
        if(res.chats){
          setChats(res.chats)
        }
    })
    if(appcontext.currentUser.editStatus == false) {
      setTimeout(() => {
        setShowEchangeModal(true)
      }, 10000);

    }
    // setIsLoading(false);
  });


// const chat = [
//   // {
//   //   id:'1',
//   //   name:'User0215784515',
//   //   date:'Yesterday',
//   //   time:'07:45 pm',
//   //   content:'Can you call me? It’s necessary to talk wit...',
//   // },
//   // {
//   //   id:'2',
//   //   name:'User0215784516',
//   //   date:'2024/01/18',
//   //   time:'06:33 pm',
//   //   content:'Can you call me? It’s necessary to talk wit...',
//   // },
//   // {
//   //   id:'3',
//   //   name:'User0215784517',
//   //   date:'2024/01/17',
//   //   time:'06:25 pm',
//   //   content:'Can you call me? It’s necessary to talk wit...',
//   // },
//   // {
//   //   id:'4',
//   //   name:'User0215784518',
//   //   date:'2024/01/16',
//   //   time:'06:15 pm',
//   //   content:'Can you call me? It’s necessary to talk wit...',
//   // },
//   // {
//   //   id:'5',
//   //   name:'User0215784519',
//   //   date:'2024/01/15',
//   //   time:'05:15 pm',
//   //   content:'Can you call me? It’s necessary to talk wit...',
//   // },
// ];

  const filteredData = chats?.filter((item) => item.chat_list_id.toLowerCase().includes(searchQuery.toLowerCase()) || item.response.toLowerCase().includes(searchQuery.toLowerCase()));
  // const filteredTags = tags.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  // };
  const handleToggleButtonClick = (buttonText: string) => {
    setActiveView(buttonText);
    setChats([])
    if(buttonText == 'Your Test History'){
      ChatApi.showTestList((res) => {
        if(res.chats){
          setChats(res.chats)
        }
      })
    }else{
      ChatApi.showList((res) => {
        if(res.chats){
          setChats(res.chats)
        }
      })    
    }
  };
  return (
    
    <div className={`${theme}-ContactsView-Container relative `}>
      <Outlet></Outlet>
      <p className={`${theme}-ContactsView-contactText mb-4`}>Chats</p>
      <div className={`${theme}-ContactsView-buttonsContainer w-3/4 `}>
        <ToggleButton onButtonClick={handleToggleButtonClick} leftText="Visitors Chat History" rightText="Your Test History" theme="Carbon" />

      </div>
      <div className="px-6 py-2">
        <AccessNotifManager page="ChatPage"></AccessNotifManager>

      </div>         
      {activeView === "Visitors Chat History" ? (
        <>
          {/* <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search chat history..." />
          </div> */}
          {chats?.length == 0? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No chats yet
              </div>
            </div>
          ) : (
            <ChatList data={filteredData} theme={theme} />
          )}
        </>
      ) : (
        <>
          {/* <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search test history..." />
          </div> */}
          {chats.length == 0? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
               No chats yet
              </div>
            </div>
          ) : (
            <ChatList data={filteredData} theme={theme} />

            // <TagList data={filteredTags} theme={theme} />
          )}
        </>
      )}
      {
        showEchangeModal && 
        <EnhanceModal onClose={() => {
          setShowEchangeModal(false)
        }} submit={() => {
          navigate('/edit/ai-setting')
        }}></EnhanceModal>
      }
    </div>
  );
};

export default Chat;
