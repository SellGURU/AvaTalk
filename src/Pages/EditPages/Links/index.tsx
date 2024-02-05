import { TextField, Button } from "symphony-ui";
import { BackIcon } from "../../../Components";

const EditLinks = () => {
  return (
    <>
      <div className="w-full absolute h-screen bg-white z-[12]">
        <BackIcon title="Links" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Links" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No link yet"></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Add Link" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Click to add your link"></TextField>
        </div>
        <div className="px-6 mt-10">
          <Button theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};

export default EditLinks;
