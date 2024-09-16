import { Button, TextField } from "symphony-ui";
import { BackIcon, TextArea } from "../../../Components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { AboutBox } from "../../../Model";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  bio: Yup.string().required('Bio is required.'),
});

const EditAbout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "AboutBox")[0] as AboutBox;
  if (currentBox == undefined) {
    currentBox = new AboutBox("about", "");
  }
  const initialValue = {
    title: currentBox.getTitle(),
    bio: currentBox.getBio(),
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const submit = () => {
    auth.currentUser.addBox(new AboutBox(formik.values.title, formik.values.bio));
    navigate("/");
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="About" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <div className="mt-24 px-6 text-left">
            <TextField
              {...formik.getFieldProps("title")}
              name="title"
              errorMessage={formik.errors?.title}
              theme="Carbon"
              label="Title"
              inValid={formik.errors?.title != undefined && (formik.touched?.title as boolean)}
              type="text"
              placeholder="Enter title..."
            ></TextField>
          </div>
          <div className="px-6 mt-3 text-left">
            <TextArea
              {...formik.getFieldProps("bio")}
              errorMessage={formik.errors?.bio}
              placeholder="Write your bio ..."
              inValid={formik.errors?.bio != undefined && (formik.touched?.bio as boolean)}
              textAreaHeight="136px"
              theme="Carbon"
              label="Bio"
              name="bio"
            ></TextArea>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditAbout;
