/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../../Api';
import { useAuth } from '../../hooks/useAuth';
import { Box } from '../../Model';
import { boxProvider } from '../../help';
import { toast } from 'react-toastify';
// import axios from "axios";

const LinkedInCallback: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
// const getToken=async (code:string)=>{
//   try {
//       const response = await axios.get(
//           `https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=https://linkedin-callback.vercel.app/linkedin/callback&client_id=786lwqvw2unoip&client_secret=1pxmz4fEh5TwUbZP` );
//       console.log(response.data); // Access token should be in response.data
//     } catch (e) {
//     console.log("error:", e);
//       if (e.response) {
//         console.log("Error:", e.response.data); // Detailed error from LinkedIn API
//       } else {
//         console.log("Error:", e.message);
//       }
//     }

// }
  useEffect(() => {
    // Extract the authorization code from the URL query parameters
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      console.log('Authorization code:', code);
      Auth.get_UserInfo(code).then(res => {
        console.log(res)
        auth.setGoogleInformation(res.data)
        Auth.loginWithGoogle({
          google_json:res.data
        }).then(res => {
          auth.setReferalCode(params.get("referral") as string)
          if(res.data.access_token){
            localStorage.setItem("token",res.data.access_token)
            auth.login(res.data.access_token)
            const resolveSocial: Array<Box> = [];
            Auth.showProfile((data) => {
                data.boxs.map((item:any) => {
                    const newBox = boxProvider(item);
                    resolveSocial.push(newBox);
                })
                auth.currentUser.updateInformation({
                    firstName:data.information.first_name,
                    lastName:data.information.last_name,
                    phone:data.information.mobile_number,
                    personlEmail:data.information.email,
                    company:data.information.company_name,
                    job:data.information.job_title,
                    banelImage:data.information.back_ground_pic,
                    imageurl:data.information.profile_pic,
                    location:{
                        lat:33,
                        lng:33
                    },
                    workEmail:data.information.work_email,
                    workPhone:data.information.work_mobile_number,
                    userId:data.information.created_userid
                })
                auth.currentUser.setBox(resolveSocial)
                navigate("/?splash=true");
            })                                                   
          }else{
            toast.error(res.data)
          }
        })
      })
      // getToken(code);
    } else {
      console.error('No authorization code found');
    }
  }, [auth, location, navigate]);

  return (
    <div>
      <h2>Processing LinkedIn Login...</h2>
    </div>
  );
};

export default LinkedInCallback;