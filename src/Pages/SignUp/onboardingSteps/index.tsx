import { Button } from "symphony-ui"
import { TextField } from "../../../Components"

const OnBoarding = () => {
    return (
        <>
            <div className="w-full min-h-screen py-8 px-4">
                <div className="flex justify-between items-center w-full">
                    <Button onClick={() =>{}} theme="Carbon-Google" data-mode="profile-review-button-2">
                        <div className="Carbon-back-Button-vector"></div>
                    </Button>
                    <div className="text-text-primary font-semibold">Skip</div>
                </div>
                <div className="mt-8">
                    <div className="text-text-primary font-semibold text-center"> Set a Password</div>
                    <div className="flex justify-center">
                        <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                            Tip: Combine uppercase & lowercase letters, numbers and special characters.                        
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <TextField type="text" required label="Password" placeholder="Enter Password..." inValid={false} name="" onBlur={() => {}} onChange={() => {}} value="" theme="Carbon" ></TextField>
                </div>
                <div className="mt-4">
                    <TextField type="text" required label="Confirm password" placeholder="Confirm password..." inValid={false} name="" onBlur={() => {}} onChange={() => {}} value="" theme="Carbon" ></TextField>
                </div>     
                <div className="mt-8">
                    <Button theme="Carbon">Continue</Button>           
                </div>
            </div>
        </>
    )
}

export default OnBoarding