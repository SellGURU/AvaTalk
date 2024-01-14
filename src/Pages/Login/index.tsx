import { useState } from "react"
import { Button , TextField} from "symphony-ui"

const Login = () => {
    const [email,setEmail] = useState('');
    return (
        <>
        <div className="w-full px-4">
            <div className="w-full flex justify-center">
                <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">
                    Enter Your Phone Number or Email Address to Login
                </div>
            </div>
            <div className="mb-8">
                <TextField
                    theme="Carbon"
                    name="email"
                    inValid={false}
                    onBlur={() => {}}
                    placeholder="Enter your phone number or email..."
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    value={email}
                ></TextField>
            </div>
            <Button theme="Carbon">Continue</Button>
            <div className="flex w-full items-center mt-11">
                <div style={{background:'linear-gradient(to left,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)'}} className="w-full h-[4px]">
                    <div style={{background:'linear-gradient(to top,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)'}} className="w-full h-[4px]"></div>
                </div>
                <div className="px-3 text-slate-800 text-sm font-medium">or</div>
                <div style={{background:'linear-gradient(to right,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)'}} className="w-full h-[4px]">
                    <div style={{background:'linear-gradient(to bottom,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)'}} className="w-full h-[4px]"></div>
                </div>
            </div>

            <div className="mt-11">
                <Button theme="Carbon-Google">
                    <img className="mr-2" src="./Google.png" alt="" />
                    <div>
                        Continue with Google
                    </div>
                </Button>
            </div>
        </div>
        </>
    )
}
export default Login