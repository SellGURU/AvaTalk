import Api from "./Api"

const useMoch = () => {
    Api.post("/login",{token:'ebdsjcdkosoqe3r4gnfvnwoe2g94nvsjka23f0vslvnsk39jsncje239'});
    Api.post("/get_Login_code",{message:'Mobile number is not registered'});
    Api.post("/register",{});
    Api.post("/profileInfo",[
        {
            "title": "Social",
            "typeName": 'SocialBox',
            "socialMedias": [
                {
                    "type": "Linkedin",
                    "value": "dsdsdsd"
                },
                {
                    "type": "Instagram",
                    "value": "dsdsdsdsxs"
                },
                {
                    "type": "Youtube",
                    "value": "dsdsdsdsxs"
                },
                {
                    "type": "Twitter/ X",
                    "value": "dsdsdsdsxs"
                },
                {
                    "type": "Facebook",
                    "value": "dsdsdsdsxs"
                }                                                
            ]
        },
        {
            "title": "Links",
            "typeName": 'LinkBox',
            "links": [
                {
                    "url": "https://web-codie.vercel.app/#/",
                }, 
                {
                    "url": "https://web-codie.vercel.app/#/",
                },                                                               
            ]
        },
        {
            "title": "About me",
            "typeName": 'AboutBox',
            "text":'Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.'
        }                  
    ])
}

export default useMoch