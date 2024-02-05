import React, { useState } from "react";
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";
import ChatList from "../ChatList";
import { Outlet } from "react-router";
import { useConstructor } from "../../help";
import { Auth } from "../../Api";
// import { TagList } from "..";
import { Tag,Contact } from "../../Types";

interface Props {
  theme?: string;
}

const Chat: React.FC<Props> = ({ theme }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chats, setChats] = useState<Contact[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("Visitors Chat History");

  useConstructor(() => {
    setIsLoading(true);

    Promise.all([Auth.getAllContacts((data) => setChats(data)), Auth.getAllTags((data) => setTags(data))])
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

;
const chat = [
  {
    id:'1',
    name:'User0215784515',
    date:'Yesterday',
    time:'07:45 pm',
    content:'Can you call me? It’s necessary to talk wit...',
  },
  {
    id:'2',
    name:'User0215784516',
    date:'2024/01/18',
    time:'06:33 pm',
    content:'Can you call me? It’s necessary to talk wit...',
  },
  {
    id:'3',
    name:'User0215784517',
    date:'2024/01/17',
    time:'06:25 pm',
    content:'Can you call me? It’s necessary to talk wit...',
  },
  {
    id:'4',
    name:'User0215784518',
    date:'2024/01/16',
    time:'06:15 pm',
    content:'Can you call me? It’s necessary to talk wit...',
  },
  {
    id:'5',
    name:'User0215784519',
    date:'2024/01/15',
    time:'05:15 pm',
    content:'Can you call me? It’s necessary to talk wit...',
  },
];

  const filteredData = chat.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.date.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase()));
  // const filteredTags = tags.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleToggleButtonClick = (buttonText: string) => {
    setActiveView(buttonText);
  };
  return (
    <div className={`${theme}-ContactsView-Container  `}>
      <Outlet></Outlet>
      <p className={`${theme}-ContactsView-contactText `}>Chats</p>
      <div className={`${theme}-ContactsView-buttonsContainer `}>
        <ToggleButton onButtonClick={handleToggleButtonClick} leftText="Visitors Chat History" rightText="Your Test History" theme="Carbon" />

      </div>
      {activeView === "Visitors Chat History" ? (
        <>
          <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search chat history..." />
          </div>
          {!(chats.length > 0) && isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No contact yet
              </div>
            </div>
          ) : (
            <ChatList data={filteredData} theme={theme} />
          )}
        </>
      ) : (
        <>
          <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search test history..." />
          </div>
          {!(tags.length > 0) && isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No tag yet
              </div>
            </div>
          ) : (
            <ChatList data={filteredData} theme={theme} />

            // <TagList data={filteredTags} theme={theme} />
          )}
        </>
      )}

    </div>
  );
};

export default Chat;
