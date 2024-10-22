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

            <div className="flex flex-col gap-y-5 px-6 mt-[55px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer text-sm font-normal leading-[21px] text-justify whitespace-pre-wrap space-y-3">
                    <h3 className="font-semibold">Terms of Service</h3>
                    <p>Last Updated: 9/18/2024

</p>
<p>Welcome to Avatalk, a revolutionary AI-driven electronic business card service (“Avatalk”, “we”, “us”, “our”). These Terms of Service (“Terms”) govern your access and use of our website, mobile applications, and related services (collectively, the “Services”). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Services.</p>
<p>Please read these Terms carefully, as they contain important information regarding your legal rights, remedies, and obligations. This includes various limitations and exclusions, a dispute resolution clause, and a binding arbitration agreement.

</p>
<h1 className="font-semibold text-base">Access and Use of the Services
</h1>
<h3 className="font-semibold">Description of Services
</h3>
<p>Avatalk offers an advanced AI-driven electronic business card that not only stores your contact information but also acts as a networking assistant. It engages with others on your behalf, ensuring that your professional representation is consistently sharp, engaging, and effective.

</p>
<h3 className="font-semibold">Your Registration Obligations
</h3>
<p>To access and use the Services, you must register and maintain a valid account. You agree to provide and maintain accurate, current, and complete information as prompted by our registration process. If you are under 13 years of age, you are not authorized to use the Services. If you are under 18, you may use the Services only with the approval of your parent or guardian.

</p>
<h3 className="font-semibold">Security of Your Account
</h3>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Avatalk immediately of any unauthorized use of your account or any other breach of security. Avatalk will not be liable for any loss or damage arising from your failure to comply with these requirements.

</p>
<h3 className="font-semibold">Access to the Service
</h3>
<p>You are responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access, or otherwise use the Services, including, without limitation, modems, hardware, software, and long-distance or local telephone service. You are responsible for ensuring that such equipment and services are compatible with the Services and comply with all configurations and specifications set forth by Avatalk.

</p>
<h3 className="font-semibold">Modifications to the Service
</h3>
<h4>Changes for Free Users
</h4>
<p>Avatalk reserves the right to modify, change, or discontinue any features or aspects of the Services for free users at its sole discretion and without prior notice. You acknowledge and agree that Avatalk will not be liable for any modification, suspension, or discontinuance of any features or aspects of the Services for free users.

</p>
<h4>Changes for Paid Users
</h4>
<p>For paid users, Avatalk will provide reasonable notice of any material modifications, changes, or discontinuations of features or aspects of the Services. You acknowledge and agree that while Avatalk will strive to inform paid users in advance, there may be instances where changes need to be made immediately, in which case notice will be provided as soon as practicable.

</p>
<h3 className="font-semibold">General Practices Regarding Use and Storage
</h3>
<p>You acknowledge that Avatalk may establish general practices and limits concerning the use of the Services, including without limitation the maximum period that data or other content will be retained by the Services and the maximum storage space that will be allotted on Avatalk’s servers on your behalf. You agree that Avatalk has no responsibility or liability for the deletion or failure to store any data or other content maintained or transmitted by the Services. You acknowledge that Avatalk reserves the right to terminate accounts that are inactive for an extended period. You further acknowledge that Avatalk reserves the right to change these general practices and limits at any time in its sole discretion with or without notice.

</p>
<h4>Fair Use and Excessive Usage
</h4>
<p>Avatalk reserves the right to limit or restrict access to the Services if it determines, at its sole discretion, that a user’s usage exceeds reasonable and normal usage patterns compared to the average norms. This includes, but is not limited to, cases where there is excessive usage of AI tools beyond what is considered fair use. Avatalk will notify users if their usage is deemed excessive and may provide guidance on acceptable usage levels. Continued excessive usage may result in suspension or termination of the account.

</p>
<h3 className="font-semibold">Mobile Services
</h3>
<p>The Services may include certain features that are available via a mobile device, including (i) the ability to upload content to the Services via a mobile device, (ii) the ability to browse the Services and the Site from a mobile device, and (iii) the ability to access certain features through an application downloaded and installed on a mobile device (collectively, the “Mobile Services”). To the extent you access the Services through a mobile device, your wireless service carrier’s standard charges, data rates, and other fees may apply. In addition, downloading, installing, or using certain Mobile Services may be prohibited or restricted by your carrier, and not all Mobile Services may work with all carriers or devices.

</p>
<h1 className="text-lg font-semibold">Conditions of Use
</h1>
<h3 className="font-semibold">User Conduct
</h3>
<p>You are solely responsible for all information, data, text, images, video, or other materials (“Content”) that you upload, post, publish, display, transmit, or send (collectively, “Transmit”) or otherwise use via the Services. You agree to use the Services in compliance with all applicable local, state, national, and international laws and regulations.

</p>
<h3 className="font-semibold">Prohibited Activities
</h3>
You agree not to:

<ul className="list-disc pl-4">
    <li>Use the Services for any illegal purpose or in violation of any local, state, national, or international law.
</li>
    <li>Transmit any Content that is unlawful, defamatory, obscene, pornographic, hateful, or otherwise objectionable.
</li>
    <li>Transmit any Content that infringes any intellectual property or other proprietary rights of any party.
</li>
    <li>Transmit any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of solicitation.
</li>
    <li>Engage in any conduct that restricts or inhibits any other user from using or enjoying the Services.
</li>
</ul>
<h3 className="font-semibold">Fees</h3>
<p>To the extent the Services or any portion thereof is made available for any fee, you will be required to select a payment plan and provide Avatalk with accurate billing information. You agree to pay Avatalk the amount specified in the payment plan in accordance with the terms of such plan and these Terms. You authorize Avatalk to bill your payment instrument in advance on a periodic basis in accordance with the terms of the applicable payment plan until you terminate your account. You acknowledge and agree that any such cancellation will be effective at the end of your current billing period and will not result in any refund of prepaid fees.

</p>
<h3 className="font-semibold">Business Accounts
</h3>
<p>If you have been provided access to the Services as part of your employer’s business account with Avatalk, then you acknowledge that your right to access and use the Services is subject to the terms of a separate agreement between Avatalk and your employer. Your access to the Services may be revoked by your employer at any time.

</p>
<h3 className="font-semibold">Special Notice for International Use; Export Controls
</h3>
<p>Software available in connection with the Services and the transmission of applicable data, if any, is subject to United States export controls. No Software may be downloaded from the Services or otherwise exported or re-exported in violation of U.S. export laws. Downloading or using the Software is at your sole risk. Recognizing the global nature of the Internet, you agree to comply with all local rules and laws regarding your use of the Services, including as it concerns online conduct and acceptable content.

</p>
<h3 className="font-semibold">Commercial Use
</h3>
<p>Unless otherwise expressly authorized herein or in the Services, you agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer, or transmit for any commercial purposes, any portion of the Services, use of the Services, or access to the Services.

</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingTermsService