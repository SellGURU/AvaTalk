import { useState } from "react"
import { Button , TextField} from "symphony-ui"

const Login = () => {
    const [email,setEmail] = useState('');
    return (
        <>
        <div className="w-full">
            <div className="w-full flex justify-center">
                <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">
                    Enter Your Phone Number or Email Address to Login
                </div>
            </div>
            <div className="mb-6">
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
        </div>
        </>
    )
}
export default Login