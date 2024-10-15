/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth';

const PersonSchema = () => {
  const context = useAuth()
  const socialBOx:any = context.currentUser.boxs.filter(el => el.getTypeName() == 'SocialBox')[0]
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": context.currentUser.information?.firstName+""+context.currentUser.information?.lastName,
    "url": "https://portal.avatalk.me/#/A/"+context.currentUser.information?.unique_id,
    "image": context.currentUser.information?.imageurl,
    "sameAs":socialBOx?.getSocialMedias().map((el:any) => el.value),
    "jobTitle":context.currentUser.information?.job,
    "worksFor": {
      "@type": "Organization",
      "name": context.currentUser.information?.company
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default PersonSchema;