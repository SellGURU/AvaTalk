import { Button, TextField } from "symphony-ui";
import { BackIcon, Select } from "../../../Components";
const EditSocials = () => {
  return (
    <>
      <div className="w-full absolute h-screen bg-white z-[12]">
        <BackIcon title="Socials" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Social Medias" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Social"></TextField>
        </div>
        <div className="px-6 mt-3">
          <Select valueElement="" label="Add Social Media" placeholder="Please select social media..." theme="Carbon" />
        </div>
        <div className="px-6 mt-10">
          <Button theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};

export default EditSocials;
