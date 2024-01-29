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
        }
    ])
}

export default useMoch