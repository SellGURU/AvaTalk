import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";
import { TextField } from "../../Components";
import { useFormik } from "formik";
import { useState , useEffect } from "react";
// import { AuthContext } from "../../store/auth-context";
import * as Yup from "yup";
import { SuccessModal } from "./SucessModal";
// import { Auth } from "../../Api";
const ChangePassowrd = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useEffect(()=> console.log(step),[step]
)
  //   const context = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      setShowSuccessModal(true);
    },
  });
  const handleCurrentPasswordVerification = () => {
    formik.setFieldTouched("currentPassword", true);
    formik.validateField("currentPassword").then(() => {
      if (!formik.errors.currentPassword && formik.values.currentPassword) {
        setStep(2);
      }
    });
  };
  //   const verifyCurrentPassword = async (password:string) => {
  //     return password === 'yourActualPassword';
  //   };
  const handleChangePassword = () => {
    formik.setFieldTouched("newPassword", true);
    formik.setFieldTouched("confirmPassword", true);
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      } else {
        console.log("Validation errors:", errors);
      }
    });
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(-1);
  };

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
          <p className="  text-justify text-sm text-text-primary">
            Regularly changing your password is important for keeping your
            account secure.{" "}
          </p>
          <ul className="  list-disc  text-sm text-text-primary px-6">
            <li className="text-justify">
              Choose a strong, unique password with a mix of letters, numbers,
              and symbols.
            </li>
            <li className="text-justify">
              Keep your information secure by avoiding predictable words or
              patterns.
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-[13px] font-medium">
            {step == 1 ? (
              <>
                <TextField
                  {...formik.getFieldProps("currentPassword")}
                  inValid={!!formik.errors.currentPassword}
                  theme="Carbon"
                  required
                  errorMessage={
                    formik.touched.currentPassword
                      ? formik.errors.currentPassword
                      : ""
                  }
                  placeholder="Enter your current password..."
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  onBlur={() => formik.setFieldTouched("currentPassword", true)}

                />
                <Button
                  onClick={handleCurrentPasswordVerification}
                  theme={"Carbon"}
                >
                  Continue
                </Button>
              </>
            ) : step == 2 && (
              <>
                <TextField
                  {...formik.getFieldProps("newPassword")}
                  inValid={!!formik.errors.newPassword}
                  theme="Carbon"
                  required
                  placeholder="Enter your new password..."
                  errorMessage={
                    formik.touched.newPassword ? formik.errors.newPassword : ""
                  }
                  name="newPassword"
                  label="New Password"
                  type="password"
                  onBlur={() => formik.setFieldTouched("newPassword", true)}
                />
                <TextField
                  {...formik.getFieldProps("confirmPassword")}
                  inValid={!!formik.errors.confirmPassword}
                  theme="Carbon"
                  required
                  placeholder="Enter your new password..."

                  errorMessage={
                    formik.touched.confirmPassword
                      ? formik.errors.confirmPassword
                      : ""
                  }
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  onBlur={() => formik.setFieldTouched("confirmPassword", true)}
                />
                <Button onClick={handleChangePassword} theme={"Carbon"}>
                  Change Password
                </Button>
              </>
            )}
          </div>
        </div>
        {showSuccessModal && (
          <SuccessModal onClose={handleCloseModal}></SuccessModal>
        )}
      </div>
    </>
  );
};
export default ChangePassowrd;
