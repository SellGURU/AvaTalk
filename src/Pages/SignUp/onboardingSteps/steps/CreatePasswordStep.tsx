import { Button } from "symphony-ui"
import { TextField } from "../../../../Components"

const CreatePasswordStep = () => {
    return (
        <>
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
        </>
    )
}

export default CreatePasswordStep