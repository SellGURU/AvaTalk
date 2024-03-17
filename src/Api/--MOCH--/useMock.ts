import { Contact, Tag } from "../../Types";
import { generateSlugId } from "../../help";
import Api from "./Api";

const tags: Array<Tag> = [
  {
    id: generateSlugId(),
    name: "Exhibition",
    color: "#FBBF24",
    contacts: 5,
  },
  {
    id: generateSlugId(),
    name: "Priority",
    color: "#14B8A6",
    contacts: 10,
  },
  {
    id: generateSlugId(),
    name: "Company",
    color: "#6366F1",
    contacts: 15,
  },
];
const contacts: Array<Contact> = [
  {
    id: generateSlugId(),
    fullName: "John Lee",
    email: "John.lee@example.com",
    mapLocation: { lat: 28.7523, lng: 4.35464 },
    photo: "/Acord/person.png",
    tags: [
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#16A34A",
        contacts: 12,
      },
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#14B8A6",
        contacts: 12,
      },    
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#FBBF24",
        contacts: 12,
      },            
    ],
    isExchange: true,
    phone: "+44 (788)29 59 722",
    location: "London, Street21, NO.124",
    company: "Codie",
    note: "Met at the exhibition",
    addDate: "Added on 12.08.2023",
    job: "Digital Marketer",
  },
  {
    id: generateSlugId(),
    fullName: "Sara Doe",
    mapLocation: { lat: 80, lng: 75.6 },
    email: "sonia.doe@example.com",
    photo: "/Acord/person.png",
    tags: [
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#FBBF24",
        contacts: 12,
      },
    ],
    isExchange: true,
    phone: "+44 (788)29 59 722",
    location: "London, Street21, NO.124",
    company: "Codie",
    note: "Met at the exhibition",
    addDate: "Added on 12.08.2023",
    job: "Digital Marketer",
  },
  {
    id: generateSlugId(),
    fullName: "John Lee",
    email: "John.lee@example.com",
    mapLocation: { lat: 28.7523, lng: 4.35464 },
    photo: "/Acord/person.png",
    tags: [
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#16A34A",
        contacts: 12,
      },
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#14B8A6",
        contacts: 12,
      },    
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#FBBF24",
        contacts: 12,
      },    
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#FB923C",
        contacts: 12,
      },  
      {
        id: generateSlugId(),
        name: "Exhibition",
        color: "#6D28D9",
        contacts: 12,
      },                      
    ],
    isExchange: true,
    phone: "+44 (788)29 59 722",
    location: "London, Street21, NO.124",
    company: "Codie",
    note: "Met at the exhibition",
    addDate: "Added on 12.08.2023",
    job: "Digital Marketer",
  },  
];

const useMoch = () => {
  Api.post("/login", { token: "ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239" });
  Api.post("/get_Login_code", { message: "Mobile number is not registered" });
  Api.post("/register", {});
  Api.post("/profileInfo", [
    {
      title: "Social",
      typeName: "SocialBox",
      socialMedias: [
        {
          type: "Linkedin",
          value: "dsdsdsd",
        },
        {
          type: "Instagram",
          value: "dsdsdsdsxs",
        },
        {
          type: "Youtube",
          value: "dsdsdsdsxs",
        },
        {
          type: "Twitter/ X",
          value: "dsdsdsdsxs",
        },
        {
          type: "Facebook",
          value: "dsdsdsdsxs",
        },
      ],
    },
    {
      title: "Links",
      typeName: "LinkBox",
      links: [
        {
          url: "https://web-codie.vercel.app/#/",
        },
        {
          url: "https://web-codie.vercel.app/#/",
        },
      ],
    },
    {
      title: "About me",
      typeName: "AboutBox",
      text: "Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.",
    },
    {
      title: "Gallery",
      typeName: "GalleryBox",
      contents: [
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
      ],
    },
  ]);
  Api.post("/contactsInfo", contacts);
  Api.post("/contactDetails", contacts[0]);
  Api.post("/tagsInfo", tags);
  Api.post("/tagDetails", tags[0]);
  Api.post("/flow_uni", {
    answer: {
      Command: "file_information",
      answer: "Hello! How can I help you today?",
      suggestion_list: [],
      products: {},
      photo_file: "",
      audio_file_name: "audio_1707111441_fed79a2841_English_en-US-AndrewNeural.wav",
      video_file: null,
      audio_file: "https://codieappstorage.blob.core.windows.net/codievoice/Audios/audio_1707111441_fed79a2841_English_en-US-AndrewNeural.wav",
    },
    currentconverationid: 8919224343,
    instanceid: "ad5777e2-906b-43f0-b550-1433c04d0305",
    message_state: true,
    message_key: "",
    "resources ": [],
  });
  Api.post("/share", {
    information: {
      firstName: "Farzin",
      lastName: "Azami",
      phone: "+44 123456789",
      job: "CoFounder & CEO",
      company: "Codie",
      location: {
        lat: 20,
        lng: 33,
      },
      imageurl:
        "data:image/png;base64,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",
      banelImage: "",
      personlEmail: "",
      workEmail: "",
      workPhone: "",
    },
    boxs: [
      {
        title: "Social",
        typeName: "SocialBox",
        socialMedias: [
          {
            type: "Linkedin",
            value: "dsdsdsd",
          },
          {
            type: "Instagram",
            value: "dsdsdsdsxs",
          },
          {
            type: "Youtube",
            value: "dsdsdsdsxs",
          },
          {
            type: "Twitter/ X",
            value: "dsdsdsdsxs",
          },
          {
            type: "Facebook",
            value: "dsdsdsdsxs",
          },
        ],
      },
      {
        title: "Links",
        typeName: "LinkBox",
        links: [
          {
            url: "https://web-codie.vercel.app/#/",
          },
          {
            url: "https://web-codie.vercel.app/#/",
          },
        ],
      },
      {
        title: "About me",
        typeName: "AboutBox",
        text: "Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.",
      },
      {
        title: "Gallery",
        typeName: "GalleryBox",
        contents: [
          {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
          },
          {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
          },
          {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
          },
        ],
      },
    ],
  });
  Api.post("/show_chat_list",[
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
  ])
};

export default useMoch;
