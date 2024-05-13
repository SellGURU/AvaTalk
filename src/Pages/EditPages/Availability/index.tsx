import { Button, TextField } from "symphony-ui";
import { BackIcon } from "../../../Components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { AvailabilityBox } from "../../../Model";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  url: Yup.string().required(),
});

const EditAvailability = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "MeetingBox")[0] as AvailabilityBox;
  if (currentBox == undefined) {
    currentBox = new AvailabilityBox("", "");
  }
  const initialValue = {
    title: currentBox.getTitle(),
    url: currentBox.getUrl(),
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const submit = () => {
    auth.currentUser.addBox(new AvailabilityBox(formik.values.title, formik.values.url));
    navigate("/");
  };
  return (
    <>
      <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
        <div className="relative top-8">
          <BackIcon title="Set Yor Availability" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-[120px] hiddenScrollBar h-full">
          <p className="mt-24 px-6 text-sm font-medium">To create appointment scheduling access, please enter your Calendly Account URL</p>
          <div className="mt-4 px-6 text-left">
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
            <TextField
              {...formik.getFieldProps("url")}
              errorMessage={formik.errors?.url}
              placeholder="https://example.com"
              inValid={formik.errors?.url != undefined && (formik.touched?.url as boolean)}
              theme="Carbon"
              label="URL"
              type="text"
              name="url"
            ></TextField>
          </div>
          <div className="px-6 mt-10">
            <Button onClick={submit} theme="Carbon">
              Save Change
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditAvailability;
