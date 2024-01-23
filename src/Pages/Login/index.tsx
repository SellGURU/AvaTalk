import { Button, TextField } from "symphony-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Api";

const initialValue = {
  emailOrPhone: "",
};
const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .matches(/^[0-9]+$/, "Please enter a valid phone number")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  function handleSubmit() {
    Auth.get_Login_code({ mobile_number: formik.values.emailOrPhone }, (res) => {
      console.log(res);
      if (res.data === "Mobile number is not registered") {
        navigate("/Verification");
      }
    });
  }
  return (
    <>
      <div className="w-full px-4">
        <div className="w-full flex justify-center">
          <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">Enter Your Phone Number or Email Address to Login</div>
        </div>
        <div className="mb-8">
          <TextField {...formik.getFieldProps("emailOrPhone")} theme="Carbon" name="emailOrPhone" errorMessage={formik.errors?.emailOrPhone} placeholder="Enter your phone number or email..." type="email" inValid={formik.errors?.emailOrPhone != undefined && (formik.touched?.emailOrPhone as boolean)}></TextField>
        </div>
        <Button
          onClick={handleSubmit}
          //     () => {
          //     navigate("/Verification");
          //   }
          // }
          disabled={!formik.isValid || !formik.touched.emailOrPhone}
          theme="Carbon"
        >
          Continue
        </Button>
        <div className="flex w-full items-center mt-11">
          <div style={{ background: "linear-gradient(to left,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
            <div style={{ background: "linear-gradient(to top,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
          </div>
          <div className="px-3 text-slate-800 text-sm font-medium">or</div>
          <div style={{ background: "linear-gradient(to right,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
            <div style={{ background: "linear-gradient(to bottom,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
          </div>
        </div>

        <div className="mt-11">
          <Button theme="Carbon-Google">
            <img className="mr-2" src="./Google.png" alt="" />
            <div>Continue with Google</div>
          </Button>
        </div>
      </div>
    </>
  );
};
export default Login;
