import Api from "./Api";
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
  ]);
  Api.post("/contactInfo", [
    {
      id: generateSlugId(),
      name: "Sara Doe",
      email: "sonia.doe@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Jane Smith",
      email: "jane.smith@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: false,
      Exchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: false,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Bob Johnson",
      email: "david.bonson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: false,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Bob Johnson",
      email: "david.bonson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: false,
      Exchange: false,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
    {
      id: generateSlugId(),
      name: "Bobii Johnson",
      email: "david.bonson@example.com",
      image: "../../public/Acord/person.png",
      Exhibition: true,
      Exchange: true,
      phone: "+44 (788)29 59 722",
      location: "London, Street21, NO.124",
      company: "Codie",
      meetDate: "Met at the exhibition",
      addDate: "Added on 12.08.2023",
      job: "Digital Marketer",
    },
  ]);
};

export default useMoch;
