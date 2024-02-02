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
  Api.post("/contactsInfo", [
    {
      id: generateSlugId(),
      fullName: "Sara Doe",
      email: "sonia.doe@example.com",
      image: "/Acord/person.png",
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
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      image: "/Acord/person.png",
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
      fullName: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "/Acord/person.png",
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
      fullName: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "/Acord/person.png",
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
      fullName: "Bob Johnson",
      email: "david.bonson@example.com",
      image: "/Acord/person.png",
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
      fullName: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "/Acord/person.png",
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
      fullName: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "/Acord/person.png",
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
      fullName: "Bob Johnson",
      email: "david.bonson@example.com",
      image: "/Acord/person.png",
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
      fullName: "Elson Johnson",
      email: "bob.johnson@example.com",
      image: "/Acord/person.png",
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
      fullName: "Jane Smith",
      email: "jourg.smith@example.com",
      image: "/Acord/person.png",
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
      fullName: "Bobii Johnson",
      email: "david.bonson@example.com",
      image: "/Acord/person.png",
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
  Api.post("/contactDetails", [
    {
      id: generateSlugId(),
      fullName: "Sara Doe",
      email: "sonia.doe@example.com",
      image: "/Acord/person.png",
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
  Api.post("/tagsInfo", [
    {
      id: generateSlugId(),
      tag: "Exhibition",
      color: "#FBBF24",
      contacts: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        },
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phone: "+1 (555) 987-6543",
        },
      ],
    },
    {
      id: generateSlugId(),
      tag: "Priority",
      color: "#14B8A6",
      contacts: [
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "+1 (555) 789-0123",
        },
      ],
    },
    {
      id: generateSlugId(),
      tag: "Company",
      color: "#6366F1",
      contacts: [
        {
          name: "Robert Johnson",
          email: "robert.johnson@example.com",
          phone: "+1 (555) 234-5678",
        },
        {
          name: "Eva Williams",
          email: "eva.williams@example.com",
          phone: "+1 (555) 876-5432",
        },
      ],
    },
  ]);
  Api.post("/tagDetails", [
    {
      id: generateSlugId(),
      tag: "Exhibition",
      color: "",
      contacts: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        },
        {
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          phone: "+1 (555) 987-6543",
        },
      ],
    },
  ]);
};

export default useMoch;
