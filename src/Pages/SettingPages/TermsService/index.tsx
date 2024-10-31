import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"

const SettingTermsService =() => {
    const navigate = useNavigate();

    return (
        <>
        <div className={`Carbon-ChatDetails-container overflow-auto`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Terms of Service</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[55px] pb-[100px] pt-[32px]">
                <div>
                    <div className="px-6 mt-24 Carbon-Setting-CardContainer text-sm font-normal leading-[21px] text-justify whitespace-pre-wrap space-y-3 ">
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
<h2 className="text-base font-semibold">Third Party Distribution Channels
</h2>
<p>Avatalk offers Software applications that may be made available through the Apple App Store, Android Marketplace, or other distribution channels (“Distribution Channels”). If you obtain such Software through a Distribution Channel, you may be subject to additional terms of the Distribution Channel. These Terms are between you and Avatalk only, and not with the Distribution Channel. To the extent that you utilize any other third-party products and services in connection with your use of the Services, you agree to comply with all applicable terms of any agreement for such third-party products and services.

</p>
<h3 className="font-semibold">Apple-Enabled Software Terms
</h3>
With respect to Software that is made available for your use in connection with an Apple-branded product (such Software, “Apple-Enabled Software”), the following terms and conditions apply in addition to the other terms set forth in these Terms:

<ul className="pl-4 list-disc">
    <li>Avatalk and you acknowledge that these Terms are concluded between Avatalk and you only, and not with Apple, and that as between Avatalk and Apple, Avatalk, not Apple, is solely responsible for the Apple-Enabled Software and the content thereof.
</li>
    <li>Your use of the Apple-Enabled Software must comply with the App Store Terms of Service.
</li>
    <li>You may not use the Apple-Enabled Software in any manner that is in violation of or inconsistent with the Usage Rules set forth for Apple-Enabled Software in, or otherwise be in conflict with, the App Store Terms of Service.
</li>
    <li>Apple has no obligation whatsoever to provide any maintenance or support services with respect to the Apple-Enabled Software.
</li>
    <li>Apple is not responsible for any product warranties, whether express or implied by law. In the event of any failure of the Apple-Enabled Software to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the Apple-Enabled Software to you; and, to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the Apple-Enabled Software, or any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty, which will be Avatalk’s sole responsibility, to the extent it cannot be disclaimed under applicable law.
</li>
    <li>Avatalk and you acknowledge that Avatalk, not Apple, is responsible for addressing any claims of you or any third party relating to the Apple-Enabled Software or your possession and/or use of that Apple-Enabled Software, including, but not limited to: (i) product liability claims; (ii) any claim that the Apple-Enabled Software fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection or similar legislation.
</li>
<li>In the event of any third-party claim that the Apple-Enabled Software or your possession and use of that Apple-Enabled Software infringes that third party’s intellectual property rights, as between Avatalk and Apple, Avatalk, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim.
</li>
<li>You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
</li>
<li>You must comply with applicable third-party terms of agreement when using the Apple-Enabled Software (e.g., your wireless data service agreement).
</li>
<li>Avatalk and you acknowledge and agree that Apple, and Apple’s subsidiaries, are third-party beneficiaries of these Terms with respect to the Apple-Enabled Software, and that, upon your acceptance of the terms and conditions of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you with respect to the Apple-Enabled Software as a third-party beneficiary thereof.
</li>
</ul>
<h2 className="font-semibold text-base">Intellectual Property Rights
</h2>
<h4 className="text-semibold">Service Content, Software, and Trademarks
</h4>
<p>You acknowledge and agree that the Services may contain content or features (“Service Content”) that are protected by copyright, patent, trademark, trade secret, or other proprietary rights and laws. Except as expressly authorized by Avatalk, you agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute, or create derivative works based on the Services or the Service Content, in whole or in part, except that the foregoing does not apply to your own User Content (as defined below) that you legally upload to the Services. In connection with your use of the Services, you will not engage in or use any data mining, robots, scraping, or similar data gathering or extraction methods. If you are blocked by Avatalk from accessing the Services (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address). Any use of the Services or the Service Content other than as specifically authorized herein is strictly prohibited. The technology and software underlying the Services or distributed in connection therewith are the property of Avatalk, our affiliates, and our partners (the “Software”). You agree not to copy, modify, create a derivative work of, reverse engineer, reverse assemble, or otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise transfer any right in the Software. Any rights not expressly granted herein are reserved by Avatalk.

</p>
<h3 className="font-semibold">The Avatalk Trademarks
</h3>
<p>The Avatalk name and logos are trademarks and service marks of Avatalk (collectively the “Avatalk Trademarks”). Other Avatalk, product, and service names and logos used and displayed via the Services may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to Avatalk. Nothing in these Terms or the Services should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any of Avatalk Trademarks displayed on the Services, without our prior written permission in each instance. All goodwill generated from the use of Avatalk Trademarks will inure to our exclusive benefit.

</p>
<h3 className="font-semibold">Third Party Material
</h3>
<p>Under no circumstances will Avatalk be liable in any way for any content or materials of any third parties (including users), including, but not limited to, for any errors or omissions in any Content, or for any loss or damage of any kind incurred as a result of the use of any such content. You acknowledge that Avatalk does not pre-screen content, but that Avatalk and its designees will have the right (but not the obligation) in their sole discretion to refuse or remove any Content that is available via the Services. You agree that you must evaluate, and bear all risks associated with, the use of any content, including any reliance on the accuracy, completeness, or usefulness of such content.

</p>
<h3 className="font-semibold">User Content Transmitted Through the Services
</h3>
<p>With respect to the Content or other materials you transmit through the Services or share with other users or recipients (collectively, “User Content”), you represent and warrant that you own all right, title, and interest in and to such User Content, including, without limitation, all copyrights and rights of publicity contained therein. By transmitting any User Content through the Services, you hereby grant and will grant Avatalk and its affiliated companies a license to perform the actions necessary to deliver User Content to the intended recipients. You also acknowledge and agree that User Content does not include any System Data. System Data is owned by Avatalk. “System Data” means aggregated and anonymous user and other data regarding the Services that may be used to generate logs, statistics, and reports regarding performance, availability, integrity, and security of the Services. System Data does not include the contact information or Personal Data of your contacts that you upload or receive through the Services.

</p>
<h3 className="font-semibold">Submissions
</h3>
<p>You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information about the Services provided by you to Avatalk (“Submissions”), and any User Content that you make available through the Services in a manner that allows other users of the Services and/or members of the general public not specified or identified by you to access your User Content (“Public User Content”) are non-confidential and Avatalk will be entitled to the unrestricted use and dissemination of these Submissions and Public User Content for any purpose, commercial or otherwise, without acknowledgment or compensation to you.

</p>
<h3 className="font-semibold">Disclosure
</h3>
<p>You acknowledge and agree that Avatalk may preserve content and may also disclose content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws, or government requests; (b) enforce these Terms; (c) respond to claims that any content violates the rights of third parties; or (d) protect the rights, property, or personal safety of Avatalk, its users, and the public. You understand that the technical processing and transmission of the Services, including your content, may involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.

</p>
<h1 className="text-lg font-semibold">Third Party Services
</h1>
<p>The Services may provide, or third parties may provide, links or other access to other sites, services, products, and resources on the Internet (“Third Party Services”). Avatalk has no control over such Third Party Services and Avatalk is not responsible for and does not endorse such Third Party Services. You further acknowledge and agree that Avatalk will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any content, events, goods, or services available on or through any such Third Party Service. Any dealings you have with third parties found while using the Services are between you and the third party, and you agree that Avatalk is not liable for any loss or claim that you may have against any such third party.

</p>
<h1 className="text-lg font-semibold">Indemnity and Release
</h1>
<p>You agree to release, indemnify, and hold Avatalk and its affiliates and their officers, employees, directors, and agents (collectively, “Indemnitees”) harmless from any and all losses, damages, expenses, including reasonable attorneys’ fees, rights, claims, actions of any kind, and injury (including death) arising out of or relating to your use of the Services, any User Content, your connection to the Services, your violation of these Terms, or your violation of any rights of another. Notwithstanding the foregoing, you will have no obligation to indemnify or hold harmless any Indemnitee from or against any liability, losses, damages, or expenses incurred as a result of any action or inaction of such Indemnitee.

</p>
<p>If you are a California resident, you waive California Civil Code Section 1542, which says: “A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor.” If you are a resident of another jurisdiction, you waive any comparable statute or doctrine.

</p>
<h1 className="text-lg font-semibold">Disclaimer of Warranties
</h1>
<p>YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. AVATALK EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

</p>
<p>AVATALK MAKES NO WARRANTY THAT (I) THE SERVICES WILL MEET YOUR REQUIREMENTS, (II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.

</p>
<h1 className="text-lg font-semibold">Limitation of Liability
</h1>
<p>YOU EXPRESSLY UNDERSTAND AND AGREE THAT AVATALK WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF AVATALK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICES; (II) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION, OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICES; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICES; OR (V) ANY OTHER MATTER RELATING TO THE SERVICES.

</p>
<p>IN NO EVENT WILL AVATALK’S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID AVATALK IN THE LAST SIX (6) MONTHS, OR, IF GREATER, ONE HUNDRED DOLLARS ($100).

</p>
<p>SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE ENFORCEABLE WITH RESPECT TO YOU AND ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE APPLICABLE STATE. IF ANY PORTION OF THESE SECTIONS IS HELD TO BE INVALID UNDER APPLICABLE LAWS, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICES OR WITH THESE TERMS, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICES.

</p>
<h1 className="font-semibold text-lg">Dispute Resolution by Binding Arbitration
</h1>
<p>PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.

</p>
<h3 className="font-semibold">Agreement to Arbitrate
</h3>
<p>This Dispute Resolution by Binding Arbitration section is referred to in these Terms as the “Arbitration Agreement.” You agree that any and all disputes or claims that have arisen or may arise between you and Avatalk, whether arising out of or relating to these Terms (including any alleged breach thereof), the Services, any advertising, any aspect of the relationship or transactions between us, shall be resolved exclusively through final and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement, except that you may assert individual claims in small claims court if your claims qualify. Further, this Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies, and such agencies can, if the law allows, seek relief against us on your behalf. You agree that, by entering into these Terms, you and Avatalk are each waiving the right to a trial by jury or to participate in a class action. Your rights will be determined by a neutral arbitrator, not a judge or jury. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement.

</p>
<h3 className="font-semibold">Prohibition of Class and Representative Actions and Non-Individualized Relief
</h3>
<p>YOU AND AVATALK AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING. UNLESS BOTH YOU AND AVATALK AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S), EXCEPT THAT YOU MAY PURSUE A CLAIM FOR AND THE ARBITRATOR MAY AWARD PUBLIC INJUNCTIVE RELIEF UNDER APPLICABLE LAW TO THE EXTENT REQUIRED FOR THE ENFORCEABILITY OF THIS PROVISION.

</p>
<h3 className="font-semibold">Pre-Arbitration Dispute Resolution
</h3>
<p>Avatalk is always interested in resolving disputes amicably and efficiently, and most customer concerns can be resolved quickly and to the customer’s satisfaction by emailing customer support at support@avatalk.com. If such efforts prove unsuccessful, a party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of Dispute (“Notice”). The Notice to Avatalk should be sent to [Avatalk Address]. The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought. If Avatalk and you do not resolve the claim within sixty (60) calendar days after the Notice is received, you or Avatalk may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by Avatalk or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any, to which you or Avatalk is entitled.

</p>
<h3 className="font-semibold">Arbitration Procedures
</h3>
<p>Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association’s (“AAA”) rules and procedures, including the AAA’s Consumer Arbitration Rules (collectively, the “AAA Rules”), as modified by this Arbitration Agreement. For information on the AAA, please visit its website, www.adr.org. Information about the AAA Rules and fees for consumer disputes can be found at the AAA’s consumer arbitration page, www.adr.org/consumer_arbitration. If there is any inconsistency between any term of the AAA Rules and any term of this Arbitration Agreement, the applicable terms of this Arbitration Agreement will control unless the arbitrator determines that the application of the inconsistent Arbitration Agreement terms would not result in a fundamentally fair arbitration. The arbitrator must also follow the provisions of these Terms as a court would. All issues are for the arbitrator to decide, including, but not limited to, issues relating to the scope, enforceability, and arbitrability of this Arbitration Agreement. Although arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings, the arbitrator can award the same damages and relief on an individual basis that a court can award to an individual under the Terms and applicable law. Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons.

</p>
<p>Unless Avatalk and you agree otherwise, any arbitration hearings will take place in a reasonably convenient location for both parties with due consideration of their ability to travel and other pertinent circumstances. If the parties are unable to agree on a location, the determination shall be made by AAA. If your claim exceeds $10,000, the right to a hearing will be determined by the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the award is based.

</p>
<h3 className="font-semibold">Costs of Arbitration
</h3>
<p>Payment of all filing, administration, and arbitrator fees (collectively, the “Arbitration Fees”) will be governed by the AAA Rules, unless otherwise provided in this Arbitration Agreement. If you are able to demonstrate to the arbitrator that you are economically unable to pay your portion of the Arbitration Fees or if the arbitrator otherwise determines for any reason that you should not be required to pay your portion of the Arbitration Fees, Avatalk will pay your portion of such fees. In addition, if you demonstrate to the arbitrator that the costs of arbitration will be prohibitive as compared to the costs of litigation, Avatalk will pay as much of the Arbitration Fees as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive. Any payment of attorneys’ fees will be governed by the AAA Rules.

</p>
<h3 className="font-semibold">Confidentiality
</h3>
<p>All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.

</p>
<h3 className="font-semibold">Severability
</h3>
<p>If a court or the arbitrator decides that any term or provision of this Arbitration Agreement (other than the subsection (b) titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” above) is invalid or unenforceable, the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Arbitration Agreement shall be enforceable as so modified. If a court or the arbitrator decides that any of the provisions of subsection (b) above titled “Prohibition of Class and Representative Actions and Non-Individualized Relief” are invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void, unless such provisions are deemed to be invalid or unenforceable solely with respect to claims for public injunctive relief. The remainder of the Terms will continue to apply.

</p>
<h3 className="font-semibold">Future Changes to Arbitration Agreement
</h3>
<p>Notwithstanding any provision in these Terms to the contrary, Avatalk agrees that if it makes any future change to this Arbitration Agreement (other than a change to the Notice Address) while you are a user of the Services, you may reject any such change by sending Avatalk written notice within thirty (30) calendar days of the change to the Notice Address provided above. By rejecting any future change, you are agreeing that you will arbitrate any dispute between us in accordance with the language of this Arbitration Agreement as of the date you first accepted these Terms (or accepted any subsequent changes to these Terms).

</p>

<h2 className="text-lg font-semibold">Termination</h2>
<h3 className="font-semibold">Termination by Avatalk
</h3>
<p>You agree that Avatalk, in its sole discretion, may suspend or terminate your account (or any part thereof) or use of the Services and remove and discard any content within the Services, for any reason, including, without limitation, for lack of use or if Avatalk believes that you have violated or acted inconsistently with the letter or spirit of these Terms. Any suspected fraudulent, abusive, or illegal activity that may be grounds for termination of your use of the Services may be referred to appropriate law enforcement authorities. Avatalk may also, in its sole discretion and at any time, discontinue providing the Services, or any part thereof, with or without notice. You agree that any termination of your access to the Services under any provision of these Terms may be effected without prior notice, and acknowledge and agree that Avatalk may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or the Services. Further, you agree that Avatalk will not be liable to you or any third party for any termination of your access to the Services.

</p>
<h3 className="font-semibold">Termination by You
</h3>
<p>You may terminate your account at any time by following the instructions provided in the Services. Upon any termination by you, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination will survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

</p>
<h2 className="text-base font-semibold">User Disputes
</h2>
<p>You agree that you are solely responsible for your interactions with any other user in connection with the Services and Avatalk will have no liability or responsibility with respect thereto. Avatalk reserves the right, but has no obligation, to become involved in any way with disputes between you and any other user of the Services.

</p>
<h2 className="text-base font-semibold">General</h2>
<h3 className="font-semibold">Entire Agreement
</h3>
<p>These Terms constitute the entire agreement between you and Avatalk and govern your use of the Services, superseding any prior agreements between you and Avatalk with respect to the Services. You also may be subject to additional terms and conditions that may apply when you use affiliate or third-party services, third-party content, or third-party software.

</p>
<h3 className="font-semibold">Governing Law
</h3>
<p>These Terms will be governed by the laws of the State of California without regard to its conflict of law provisions. With respect to any disputes or claims not subject to arbitration, as set forth above, you and Avatalk agree to submit to the personal and exclusive jurisdiction of the state and federal courts located within Santa Clara County, California.

</p>
<h3 className="font-semibold">Waiver and Severability of Terms
</h3>
<p>The failure of Avatalk to exercise or enforce any right or provision of these Terms will not constitute a waiver of such right or provision. If any provision of these Terms is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of these Terms remain in full force and effect.

</p>
<h3 className="font-semibold">No Right of Survivorship and Non-Transferability
</h3>
<p>You agree that your Avatalk account is non-transferable and any rights to your Avatalk ID or contents within your account terminate upon your death. Upon receipt of a copy of a death certificate, your account may be terminated and all its contents permanently deleted.

</p>
<h3 className="font-semibold">Notices</h3>
<p>Avatalk may provide notices to you via email or regular mail. The Services may also provide notices to you of changes to these Terms or other matters by displaying notices or links to notices generally on the Services.

</p>
<h3 className="font-semibold">Assignment
</h3>
<p>You may not assign these Terms or any of your rights or obligations under these Terms without the prior written consent of Avatalk. Avatalk may assign these Terms or any rights or obligations under these Terms to any third party without your consent. Any assignment in violation of this section will be null and void.

</p>
<h3 className="font-semibold">Section Titles
</h3>
<p>The section titles in these Terms are for convenience only and have no legal or contractual effect.

</p>
<h3 className="font-semibold">Contact Information
</h3>
<p>If you have any questions about these Terms or the Services, please contact us at support@avatalk.com.

</p>
<h2 className="text-base font-semibold">Your Privacy
</h2>
<p>At Avatalk, we respect the privacy of our users. For details, please see our Privacy Policy at avatalk.me/privacy-policy . By using the Services, you consent to our collection and use of personal data as outlined therein.

</p>
<h2 className="text-base font-semibold">Notice for California Users

</h2>
<p>Under California Civil Code Section 1789.3, California users of the Services are entitled to the following specific consumer rights notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in CA 95834, or by telephone at (800) 952-5210.

</p>
<h2 className="text-base font-semibold">Data Processing Addendum

</h2>
<p>To the extent we process any Customer Personal Data (as defined in the Addendum) that is subject to the GDPR (as defined in the Addendum) on your behalf, the terms of the data processing addendum at [Avatalk Data Processing Addendum URL] (“Addendum”), which are hereby incorporated by reference, shall apply and the parties agree to comply with such terms.

</p>
<h2 className="text-base font-semibold">Additional Terms
</h2>
<h3 className="font-semibold">Customer Data
</h3>
<p>You retain all rights, title, and interest in and to all Customer Data. You grant Avatalk and its affiliates a non-exclusive, worldwide, royalty-free license to use, copy, distribute, perform, display, and create derivative works of the Customer Data for the purpose of providing the Services. “Customer Data” means all information and data (including text, images, video, or other content) that you or your Authorized Users submit to the Services.

</p>
<h3 className="font-semibold">Feedback</h3>
<p>We welcome and encourage you to provide feedback, comments, and suggestions for improvements to the Services (“Feedback”). You may submit Feedback by emailing us at support@avatalk.com or through the features of the Services. You acknowledge and agree that all Feedback will be the sole and exclusive property of Avatalk, and you hereby irrevocably assign to Avatalk and agree to irrevocably assign to Avatalk all of your right, title, and interest in and to all Feedback, including any intellectual property rights therein.

</p>
<h3 className="font-semibold">Customer Representations and Warranties
</h3>
<p>You represent and warrant that (i) you have the legal power and authority to enter into these Terms, (ii) you own all rights, title, and interest in and to the Customer Data, or have obtained all rights, licenses, consents, and permissions necessary to grant the rights granted herein, (iii) you and your Authorized Users will comply with all applicable laws in connection with your use of the Services, and (iv) your Customer Data and the use of your Customer Data as contemplated by these Terms do not and will not violate, misappropriate, or infringe any intellectual property rights, or any privacy or other rights of any third party.

</p>
<h2 className="text-lg font-semibold">Compliance with Laws
</h2>
<p>Avatalk will comply with all applicable laws in the provision of the Services to customers generally (i.e., without regard to the nature of the Customer Data and/or Customer’s particular use or configuration of the Services). To the extent any artificial intelligence laws are newly enacted, we will evaluate our obligations in good faith and, if we determine such laws apply, we will use commercially reasonable efforts to comply within a reasonable period of time.

</p>
<h2 className="font-semibold text-lg">Further Artificial Intelligence Assurances
</h2>
<p>We will, in good faith and all material respects, implement into our practices, and design into our products, the ‘Consent, Control, and Collaboration’ principles described in our Help Center, as updated from time to time (the “AI Principles”). These AI Principles will include policies and practices designed to protect the trust, safety, and integrity of the Services (“AI Safeguards”).

</p>
<h2 className="font-semibold text-lg">Further Artificial Intelligence Assurances</h2>
<h3 className="font-semibold">Our Indemnification of You
</h3>
<p>We will defend you from and against any third-party claims, actions, suits, or proceedings alleging that the Services or the use thereof as permitted hereunder infringes or misappropriates the intellectual property rights of a third party, and will indemnify you for all reasonable attorney’s fees incurred and damages and other costs finally awarded against you in connection with or as a result of, and for amounts paid by you under a settlement we approve of in connection with, such a claim. We will have no liability if a claim against you arises from (a) Customer Data, (b) your negligence or misconduct, or (c) your use of the Services in violation of these Terms.

</p>
<h3 className="font-semibold">Your Indemnification of Us
</h3>
<p>You agree to defend, indemnify, and hold harmless Avatalk, its affiliates, and their respective directors, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, debt, and expenses (including but not limited to attorney’s fees) arising from (a) your use of and access to the Services, (b) your violation of any term of these Terms, (c) your violation of any third-party right, including without limitation any intellectual property, property, or privacy right, or (d) any claim that your Customer Data caused damage to a third party.

</p>
<h3 className="font-semibold">Indemnification Procedures
</h3>
<p>The indemnified party will promptly notify the indemnifying party in writing of any claim, suit, or proceeding for which indemnification is being sought. The indemnifying party will have the right to assume the defense and settlement of such claim at its own expense. The indemnified party will cooperate with the indemnifying party in the defense and settlement of such claim at the indemnifying party’s expense. The indemnified party may participate in the defense and settlement of such claim at its own expense.

</p>
<h2 className="font-semibold text-lg">Limitation on Indemnifications
</h2>
<p>Notwithstanding anything contained in the preceding sections, (a) an indemnified party will always be free to choose its own counsel if it pays for the cost of such counsel, and (b) no settlement may be entered into by an indemnifying party without the express written consent of the indemnified parties (such consent not to be unreasonably withheld) if (i) the third party asserting the claim is a government agency, (ii) the settlement arguably involves the making of admissions by the indemnified parties, (iii) the settlement does not include a full release of liability for the indemnified parties, or (iv) the settlement includes terms other than a full release of liability for the indemnified parties and the payment of money.

</p>
<h2 className="font-semibold text-lg">Confidentiality</h2>
<h3 className="font-semibold">Confidential Information
</h3>
<p>Each party (“Disclosing Party”) may disclose “Confidential Information” to the other party (“Receiving Party”) in connection with these Terms. Confidential Information includes all non-public business, product, technology, and marketing information. Confidential Information does not include information that (a) is or becomes generally available to the public without breach of any obligation owed to the Disclosing Party, (b) was known to the Receiving Party prior to its disclosure by the Disclosing Party without breach of any obligation owed to the Disclosing Party, (c) is received from a third party without breach of any obligation owed to the Disclosing Party, or (d) was independently developed by the Receiving Party.

</p>
<h3 className="font-semibold">Protection and Use of Confidential Information
</h3>
<p>The Receiving Party will (a) take reasonable measures to prevent unauthorized disclosure or use of Confidential Information and limit access to those employees, affiliates, and contractors who need to know such information in connection with these Terms, and (b) not use or disclose any Confidential Information of the Disclosing Party for any purpose outside the scope of these Terms. Nothing above will prevent either party from sharing Confidential Information with financial and legal advisors, provided that the advisors are bound to confidentiality obligations at least as restrictive as those in these Terms.

</p>
<h3 className="font-semibold">Compelled Access or Disclosure
</h3>
<p>The Receiving Party may access or disclose Confidential Information of the Disclosing Party if required by law, provided that the Receiving Party gives the Disclosing Party prior notice of the compelled access or disclosure (to the extent legally permitted) and reasonable assistance, at the Disclosing Party’s cost, if the Disclosing Party wishes to contest the access or disclosure. If the Receiving Party is compelled by law to access or disclose the Disclosing Party’s Confidential Information, the Disclosing Party will reimburse the Receiving Party for its reasonable cost of compiling and providing access to such Confidential Information and the reasonable cost for any support provided in connection with the Disclosing Party seeking a protective order or confidential treatment for the Confidential Information to be produced.

</p>
<h2 className="font-semibold text-base">Survival
</h2>
<p>The sections titled “Feedback is Welcome,” “Intellectual Property Rights,” “Use of the Services,” “Our Removal Rights,” “Payment Terms,” “Indemnification,” “Confidentiality,” and “Survival,” as well as all of the provisions under the general heading “General Provisions,” will survive any termination or expiration of these Terms.

</p>
<h2 className="text-lg font-semibold">General Provisions
</h2>
<h3 className="font-semibold">Publicity
</h3>
<p>You grant us the right to use your company name and logo as a reference for marketing or promotional purposes on our website and in other public or private communications with our existing or potential customers, subject to your standard trademark usage guidelines as provided to us from time to time. You may send us an email to support@avatalk.com stating that you do not wish to be used as a reference.

</p>
<h3 className="font-semibold">Force Majeure
</h3>
<p>Neither you nor Avatalk will be liable by reason of any failure or delay in the performance of its obligations on account of events beyond the reasonable control of a party, which may include denial-of-service attacks, a failure by a third-party hosting provider or utility provider, strikes, shortages, riots, fires, acts of God, war, terrorism, and governmental action.

</p>
<h3 className="font-semibold">Relationship of the Parties; No Third-Party Beneficiaries
</h3>
<p>The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, fiduciary, or employment relationship between the parties. There are no third-party beneficiaries to these Terms.

</p>
<h3 className="font-semibold">Email Notices
</h3>
<p>Except as otherwise set forth herein, all notices under these Terms will be by email, although we may instead choose to provide notice to you through the Services (e.g., a platform notification). Notices to Avatalk will be sent to support@avatalk.com, except for legal notices, such as notices of termination or an indemnifiable claim, which must be sent to legal@avatalk.com. Notices will be deemed to have been duly given (a) the day after it is sent, in the case of notices through email, and (b) the same day, in the case of notices through the Services.

</p>
<h3 className="font-semibold">Modifications
</h3>
<p>As our business evolves, we may change these Terms and the other components of the Terms (except any Order Forms). If we make a material change to the Terms, we will provide you with reasonable notice prior to the change taking effect, either by emailing the email address associated with your account or by messaging you through the Services. You can review the most current version of the Terms at any time by visiting this page. The materially revised Terms will become effective on the date set forth in our notice, and all other changes will become effective upon posting of the change. If you access or use the Services after the effective date, that use will constitute your acceptance of any revised terms and conditions.

</p>
<h3 className="font-semibold">Waiver</h3>
<p>No failure or delay by either party in exercising any right under these Terms will constitute a waiver of that right. No waiver under these Terms will be effective unless made in writing and signed by an authorized representative of the party being deemed to have granted the waiver.

</p>
<h3 className="font-semibold">Severability
</h3>
<p>These Terms will be enforced to the fullest extent permitted under applicable law. If any provision of these Terms is held by a court of competent jurisdiction to be contrary to law, the provision will be modified by the court and interpreted so as to best accomplish the objectives of the original provision to the fullest extent permitted by law, and the remaining provisions of these Terms will remain in effect.

</p>
<h3 className="font-semibold">Assignment
</h3>
<p>Neither party may assign or delegate any of its rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of the other party (not to be unreasonably withheld). Notwithstanding the foregoing, either party may assign these Terms in their entirety (including all Order Forms), without consent of the other party, to a corporate affiliate or in connection with a merger, acquisition, corporate reorganization, or sale of all or substantially all of its assets. Any purported assignment in violation of this section is void. These Terms will bind and inure to the benefit of the parties, their respective successors, and permitted assigns.

</p>
<h3 className="font-semibold">Governing Law and Venue

</h3>
<p>The Contract, and any disputes arising out of or related to it, will be governed exclusively by the laws of the State of California, without regard to its conflicts of laws rules or the United Nations Convention on the International Sale of Goods. The courts located in Santa Clara County, California, will have exclusive jurisdiction to adjudicate any dispute arising out of or relating to the Contract or its formation, interpretation, or enforcement. Each party consents and submits to the exclusive jurisdiction of such courts. In any action or proceeding to enforce rights under the Contract, the prevailing party will be entitled to recover its reasonable costs and attorney’s fees.


</p>
<h3 className="font-semibold">Entire Agreement

</h3>
<p>The Contract, including these Terms and all referenced pages and Order Forms, constitutes the entire agreement between the parties and supersedes all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning its subject matter. No representation, undertaking, or promise shall be taken to have been given or be implied from anything said or written in negotiations between the parties prior to this Contract, except as expressly stated in this Contract. Without limiting the foregoing, the Contract supersedes the terms of any online agreement electronically accepted by you. However, to the extent of any conflict or inconsistency between the provisions in these Terms and any other documents or pages referenced in these Terms, the following order of precedence will apply: (1) the terms of any Order Form (if any), (2) the portions of the Customer-Specific Supplement that apply to you (if any), (3) these Terms, and (4) any other documents or pages referenced in these Terms. Notwithstanding any language to the contrary therein, no terms or conditions stated in a Customer purchase order, vendor onboarding process, web portal, or any other Customer order documentation (excluding Order Forms) will be incorporated into or form any part of the Contract, and all such terms or conditions will be null and void.


</p>
<h2 className="font-semibold text-lg">Contact Information
</h2>
<p>For any questions about these Terms, please contact us at:

</p>
<p>Avatalk, Inc.
Email: support@avatalk.com</p>
<p>By using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.

</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingTermsService