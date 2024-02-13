import { BackIcon,Select } from "../../../Components"

const SettingAccount =() => {
    // const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className="relative top-4">
                    <BackIcon title="Your Account" theme="Carbon"></BackIcon>

                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="px-4">
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label ">
                                    First Name
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield76297" placeholder="Enter your first name..." name="FirstName" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label">
                                    Last Name
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield42095" placeholder="Enter your last name..." name="LastName" />

                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Account Email</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">

                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="email" id="textfield28972" placeholder="Enter your email address..." name="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Account Phone</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <div className="Carbon-TextField-selectPhone-container">
                                        <img src="https://flagcdn.com/w20/us.png"/>
                                        <img className="Carbon-TextField-selectPhone-container-icon" src="./Carbon/bottomVector.svg" alt=""/>
                                    </div>
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="phone" id="textfield28972" placeholder="Enter your phone number..." name="Phone" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Select label="Language" valueElement={<div></div>} placeholder="Select tag..." theme="Carbon">
  
                            </Select>

                        </div>
                        <div className="mt-8 mb-4">
                            <button className="Carbon-Button-container">Save Changes</button>
                        </div>
                        <div className="mt-5 flex items-center cursor-pointer">
                            <p className="text-cyan-500 ms-2">Delete Your Account</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SettingAccount;