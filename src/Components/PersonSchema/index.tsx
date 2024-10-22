/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet';

import Share from '../../Api/Share';
import { useEffect, useState } from 'react';

const PersonSchema = () => {

  const [myData,setMydata] = useState<any>(null)
  useEffect(() => {
    Share.getShareData('/presentation_info/user='+window.location.hash.split("/")[2],(data) => {
      setMydata(data)
    })    
  },[])


  // const socialBOx:any = myData.boxs.filter((el:any) => el.typeName == 'SocialBox')[0]
  const [schemaData,setScemaData] =  useState({
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": myData?.information.first_name+""+myData?.information.last_name,
    "url": "https://portal.avatalk.me/#/A/"+window.location.hash.split("/")[2],
    "image":myData?.information.profile_pic,
    "sameAs":'',
    "jobTitle":myData?.information.job_title,
    "worksFor": {
      "@type": "Organization",
      "name": myData?.information.company_name
    }
  });
  useEffect(() => {
    if(myData!= undefined &&  myData!= null){
      const socialBOx:any = myData?.boxs.filter((el:any) => el.typeName == 'SocialBox')[0]
      setScemaData({
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": myData?.information.first_name+""+myData?.information.last_name,
      "url": "https://portal.avatalk.me/#/A/"+window.location.hash.split("/")[2],
      "image":myData?.information.profile_pic,
      "sameAs":socialBOx?.getSocialMedias().map((el:any) => el.value),
      "jobTitle":myData?.information.job_title,
      "worksFor": {
        "@type": "Organization",
        "name": myData?.information.company_name
      }
  })

    }
  },[myData])
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default PersonSchema;