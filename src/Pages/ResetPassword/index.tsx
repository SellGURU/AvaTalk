import { useFormik } from "formik";
import { Button, TextField } from "symphony-ui";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { Auth } from "../../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const context = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: () => {},
  });
  const onSubmit = () => {
    Auth.forgetPassword({
      email: context.varification.emailOrPhone,
      password: formik.values.password,
      confirm_password: formik.values.confirmPassword,
    }).then((res) => {
      toast.success(res.data.detail);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    });
  };
  return (
    <div className="px-4 lg:px-0">
      <div className="mt-8">
        <div className="text-text-primary font-semibold text-center">
          {" "}
          Reset Password
        </div>
        <div className="flex justify-center">
          <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
            Tip: Combine uppercase & lowercase letters, numbers and special
            characters.
          </div>
        </div>
      </div>
      <div className="mt-8">
        <TextField
          {...formik.getFieldProps("password")}
          type="password"
          required
          label="Password"
          placeholder="Enter Password..."
          inValid={
            formik.errors?.password != undefined &&
            (formik.touched?.password as boolean)
          }
          errorMessage={formik.errors.password}
          theme="Carbon"
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          {...formik.getFieldProps("confirmPassword")}
          type="password"
          required
          label="Confirm password"
          placeholder="Confirm password..."
          inValid={
            formik.errors?.confirmPassword != undefined &&
            (formik.touched?.confirmPassword as boolean)
          }
          errorMessage={formik.errors.confirmPassword}
          theme="Carbon"
        ></TextField>
      </div>
      <div className="mt-8">
        <Button
          disabled={
            !formik.isValid ||
            formik.values.confirmPassword == "" ||
            formik.values.password == ""
          }
          onClick={() => {
            context.siginupHandler({
              password: formik.values.password,
              conFirmPassword: formik.values.confirmPassword,
            });
            onSubmit();
          }}
          theme="Carbon"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
