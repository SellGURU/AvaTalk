import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

const SettingTermsService =() => {
    const navigate = useNavigate();

    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Terms of Service</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer text-left whitespace-pre-wrap ">
Welcome to Avatalk
<br />
These Terms of Use apply when you use our products and services or our affiliates, including our application programming interface, software, tools, developer services, data, documentation, and website (“Services”). The Terms include our Service Terms and other documentation, guidelines, or policies we may provide in writing. By using our Services, you agree to these Terms. Our Privacy Policy explains how we collect and use personal information.
<br />
1. Registration and Access
You must be 18 years or older and able to form a binding contract with AVATALK to use the Services. If you use the Services on behalf of another person or entity, you must have the authority to accept the Terms on their behalf. You must provide accurate and complete information to register for an account. You may not make your access credentials or account available to others outside your organization, and you are responsible for all activities that occur using your credentials.
<br />
2. Usage Requirements
Use of Services. You may access, and we grant you a non-exclusive right to use, the Services in accordance with these Terms. You will comply with these Terms and all applicable laws when using the Services. We and our affiliates own all rights, title, and interest in and to the Services.
<br />
3. Content
Your Content. You may provide input to the Services (“Input”), and receive output generated and returned by the Services based on the Input (“Output”). Input and Output are collectively “Content.” As between the parties and to the extent permitted by applicable law, you own all Input, and subject to your compliance with these Terms, AVATALK hereby assigns to you all its rights, title, and interests in and to Output. AVATALK may use Content as necessary to provide and maintain the Services, comply with applicable law, and enforce our policies. You are responsible for Content, including for ensuring that it does not violate any applicable law or these Terms.
<br />
4. Fees and Payments
Fees and Billing. You will pay all fees charged to your account (“Fees”) as otherwise agreed between us in writing. We have the right to correct pricing errors or mistakes even if we have already issued an invoice or received payment. You will provide complete and accurate billing information including a valid and authorized payment method. We will charge your payment method on an agreed-upon periodic basis but may reasonably change the date on which the charge is posted. You authorize AVATALK and its affiliates, and our third-party payment processor(s), to charge your payment method for the Fees. If your payment cannot be completed, we will provide you with written notice and may suspend access to the Services until payment is received. Fees are payable in UK pounds and are due upon invoice issuance. Payments are nonrefundable except as provided in this Agreement.
<br />
5. Term and Termination
Termination. These Terms take effect when you first use the Services and remain in effect until terminated. You may terminate these Terms at any time for any reason by discontinuing the use of the Services and Content. We may terminate these Terms for any reason by providing you with at least 30 days’ advance notice. We may terminate these Terms immediately upon notice to you if you materially breach Sections, if there are changes in relationships with third-party technology providers outside of our control, or if to comply with law or government requests.
<br />
6. General Terms
Relationship of the Parties. These Terms do not create a partnership, joint venture, or agency relationship between you and AVATALK or any of AVATALK’s affiliates. AVATALK and you are independent contractors and neither party will have the power to bind the other or to incur obligations on the other’s behalf without the other party’s prior written consent.
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingTermsService