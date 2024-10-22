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
    "url": "https://portal.avatalk.me/#/A/"+'',
    "image":'',
    // "sameAs":socialBOx?.getSocialMedias().map((el:any) => el.value),
    "jobTitle":'',
    "worksFor": {
      "@type": "Organization",
      "name": ''
    }
  });
  useEffect(() => {
    console.log(myData)
    if(myData!= undefined &&  myData!= null){
      setScemaData({
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": myData?.information.first_name+""+myData?.information.last_name,
      "url": "https://portal.avatalk.me/#/A/"+'',
      "image":'',
      // "sameAs":socialBOx?.getSocialMedias().map((el:any) => el.value),
      "jobTitle":'',
      "worksFor": {
        "@type": "Organization",
        "name": ''
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