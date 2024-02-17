import { Contact, Tag } from "../../Types";
import { generateSlugId } from "../../help";
import Api from "./Api";


const tags:Array<Tag> = [
    {
      id: generateSlugId(),
      name: "Exhibition",
      color: "#FBBF24",
      contacts:5
    },
    {
      id: generateSlugId(),
      name: "Priority",
      color: "#14B8A6",
      contacts:10
    },
    {
      id: generateSlugId(),
      name: "Company",
      color: "#6366F1",
      contacts: 15
    },    
]
const contacts:Array<Contact> = [
    {
      id: generateSlugId(),
      firstName:'Sara',
      lastName:'Doe',
      email: "sonia.doe@example.com",
      photo: "/Acord/person.png",
      tags:[
        {
          id: generateSlugId(),
          name: "Exhibition",
          color: "#FBBF24",
          contacts: 12
        }
      ],
      isExchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      firstName:'Sara',
      lastName:'Doe',
      email: "sonia.doe@example.com",
      photo: "/Acord/person.png",
      tags:[
        {
          id: generateSlugId(),
          name: "Exhibition",
          color: "#FBBF24",
          contacts: 12
        }
      ],
      isExchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },    
]
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
      contents:[
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
      ]
    },    
  ]);
  Api.post("/contactsInfo",contacts);
  Api.post("/contactDetails",contacts[0]);
  Api.post("/tagsInfo", tags);
  Api.post("/tagDetails",tags[0]);
  Api.post("/flow_uni",
  {
    "answer": {
        "Command": "file_information",
        "answer": "Hello! How can I help you today?",
        "suggestion_list": [],
        "products": {},
        "photo_file": "",
        "audio_file_name": "audio_1707111441_fed79a2841_English_en-US-AndrewNeural.wav",
        "video_file": null,
        "audio_file": "https://codieappstorage.blob.core.windows.net/codievoice/Audios/audio_1707111441_fed79a2841_English_en-US-AndrewNeural.wav"
    },
    "currentconverationid": 8919224343,
    "instanceid": "ad5777e2-906b-43f0-b550-1433c04d0305",
    "message_state": true,
    "message_key": "",
    "resources ": []
  });
  Api.post('/share',{
    information:{
      firstName:'Farzin',
      lastName:'Azami',
      phone:'',
      job:'',
      company:'',
      location:{
        lat:20,
        lng:33,
      },
      imageurl:'',
      banelImage:'',
      personlEmail:'',
      workEmail:'',
      workPhone:''
    }
  })
};

export default useMoch;
