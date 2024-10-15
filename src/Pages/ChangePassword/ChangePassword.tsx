import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";
import { TextField } from "../../Components";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import * as Yup from "yup";
import { Auth } from "../../Api";
const ChangePassowrd = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const context = useContext(AuthContext);
  
  const validationSchema = Yup.object().shape({
    // currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const initialValues = {
   currentPassword :"",
    newPassword: "",
    confirmPassword: "",
  };


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      {" "}
      <div className={`Carbon-ChatDetails-container `}>
        <Outlet></Outlet>
        <div className="flex px-6 items-center space-x-4 absolute  top-8">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            theme={`Carbon-back`}
          >
            <div className={`Carbon-back-Button-vector`}></div>
          </Button>
          <p className={`Carbon-ChatDetails-title`}>Change Password</p>
        </div>
        <div className="mt-[96px] flex flex-col hiddenScrollBar h-dvh overscroll-y-scroll px-6  pb-[300px]">
          <p className="text-sm text-text-primary">
            Regularly changing your password is important for keeping your
            account secure.{" "}
          </p>
          <ul className=" mt-4 list-disc space-y-1 text-sm text-text-primary px-6">
            <li>
              Choose a strong, unique password with a mix of letters, numbers,
              and symbols.
            </li>
            <li>
              Keep your information secure by avoiding predictable words or
              patterns.
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-[13px] font-medium">
            {step == 1 ? (
              <>
                <TextField
                  {...formik.getFieldProps("firstname")}
                  inValid={formik.errors.currentPassword != undefined}
                  theme="Carbon"
                  required
                  errorMessage={formik.errors.currentPassword}
                  name="current password"
                  label="Current Password"
                  type="text"
                ></TextField>
                <Button onClick={() => setStep(2)} theme={"Carbon"}>
                  Continue
                </Button>
              </>
            ) : (
              <>
                <TextField
                  {...formik.getFieldProps("firstname")}
                  inValid={formik.errors.currentPassword != undefined}
                  theme="Carbon"
                  required
                  errorMessage={formik.errors.currentPassword}
                  name="new password"
                  label="New Password"
                  type="text"
                ></TextField>
                <TextField
                  {...formik.getFieldProps("firstname")}
                  inValid={formik.errors.currentPassword != undefined}
                  theme="Carbon"
                  required
                  errorMessage={formik.errors.currentPassword}
                  name="Confirm New Password"
                  label="confirm new password"
                  type="text"
                ></TextField>
                <Button onClick={() => setStep(2)} theme={"Carbon"}>
                  Change Password
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ChangePassowrd;
