import { Button } from "symphony-ui";
import { Outlet, useNavigate } from "react-router-dom";

const SettingPrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`Carbon-ChatDetails-container `}>
        <Outlet></Outlet>
        <div className="flex px-6 items-center space-x-4 absolute  top-8">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            theme={`Carbon-back`}
          >
            <div className={`Carbon-back-Button-vector`}></div>
          </Button>
          <p className={`Carbon-ChatDetails-title`}>Privacy Policy</p>
        </div>

        <div className="flex flex-col gap-y-5 h-dvh px-6 mt-[66px] overflow-y-scroll  pb-[250px] pt-[16px]">
          <div>
            <div className="px-6 mt-24  Carbon-Setting-CardContainer text-sm font-normal leading-[21px] text-justify space-y-1 ">
              <h3 className="font-semibold">Privacy Policy Introduction</h3>
              <p>
                Welcome to Avatalk’s Privacy Policy. At Avatalk, we prioritize
                your privacy and are committed to protecting your personal data.
                This Privacy Policy outlines in detail how we collect, use, and
                safeguard your data when you use our services. By accessing or
                using Avatalk, you agree to the terms of this Privacy Policy.
                Please read this document carefully to understand our practices
                regarding your personal data. If you have any questions or
                concerns, please contact us at support@avatalk.com.
              </p>
              <h3 className="font-semibold">Who We Are</h3>
              <p>
                Avatalk represents a quantum leap in the concept of electronic
                business cards. We don’t merely store your contact information
                but act as an AI-driven networking assistant. This advanced tool
                leverages your professional profile to create a persona that
                shares your details and engages with others on your behalf,
                ensuring a unique and memorable interaction every time. Avatalk
                is always on, ready to connect, share, and engage with your
                network, whether you are physically present or not. We operate
                on various platforms, including embedded integration on websites
                or through NFC, making your details instantly accessible.
              </p>
              <h3 className="font-semibold">Definitions</h3>
              <ul className="list-disc pl-4">
                <li>
                  Personal Data: Any information relating to an identified or
                  identifiable natural person.
                </li>
                <li>
                  Processing: Any operation or set of operations performed on
                  personal data, such as collection, storage, use, or
                  disclosure.
                </li>
                <li>
                  Controller: The entity that determines the purposes and means
                  of processing personal data.
                </li>
                <li>
                  Processor: The entity that processes personal data on behalf
                  of the controller.
                </li>
                <li>
                  Data Subject: The individual to whom the personal data
                  relates.
                </li>
                <li>
                  Consent: Freely given, specific, informed, and unambiguous
                  indication of the data subject’s wishes.
                </li>
              </ul>
              <h3 className="font-semibold">What Information We Collect</h3>
              <h3 className="font-semibold">Personal Data</h3>
              We collect personal data that you provide to us directly, such as:
              <ul className="list-disc pl-4">
                <li>
                  Identity Data: First name, last name, username, or similar
                  identifier.
                </li>
                <li>
                  Contact Data: Billing address, email address, and telephone
                  numbers.
                </li>
                <li>Financial Data: Bank account and payment card details.</li>
                <li>
                  Transaction Data: Details of payments and services purchased.
                </li>
                <li>
                  Commercial Data: Company name, business purpose, and
                  requirements for AI persona interactions.
                </li>
                <li>
                  Profile Data: Username, password, preferences, feedback, and
                  survey responses.
                </li>
                <li>
                  Usage Data: Information about how our website, products, and
                  services are used.
                </li>
                <li>
                  Marketing Data: Marketing and communication preferences.
                </li>
                <li>
                  Audio/Video Data: Content uploaded for AI persona
                  customization.
                </li>
                <li>
                  Technical Data: Internet protocol (IP) address, login data,
                  browser type, time zone setting and location, and operating
                  system used for access.
                </li>
                <li>
                  Other Information: Any other information you choose to
                  provide.
                </li>
              </ul>
              <h3 className="font-semibold">Non-Personal Data</h3>
              We also collect non-personal data, which cannot be used to
              identify you:
              <ul className="list-disc pl-4">
                <li>Aggregated Data: Statistical or demographic data.</li>
                <li>
                  Anonymized Data: Data that has been stripped of personally
                  identifiable information.
                </li>
              </ul>
              <h3>How We Collect Your Information</h3>
              <h3>Direct Interactions</h3>
              You may provide personal data when you:
              <ul className="list-disc pl-4">
                <li>Register for an account.</li>
                <li>Subscribe to our services.</li>
                <li>Contact us for support.</li>
                <li>Participate in surveys or provide feedback.</li>
                <li>Engage with our AI persona.</li>
              </ul>
              <h3 className="font-semibold">Automated Technologies</h3>
              We collect data automatically through:
              <ul className="list-disc pl-4">
                <li>
                  Cookies: Small files stored on your device to track and
                  personalize your experience.
                </li>
                <li>
                  Web Beacons: Electronic files that track how you interact with
                  our emails or website.
                </li>
                <li>
                  Log Files: Records of your interactions with our services,
                  including your IP address and browser type.
                </li>
              </ul>
              <h3 className="font-semibold">Third-Party Sources</h3>
              We may receive personal data from third-party sources, such as:
              <ul>
                <li>Social media platforms when you connect your account.</li>
                <li>Payment processors when you make a purchase.</li>
                <li>
                  Marketing partners who provide us with your contact
                  information.
                </li>
              </ul>
              <h3 className="font-semibold">How We Use Your Information</h3>
              We process your personal data for various purposes, including:
              <h3 className="font-semibold">Service Provision</h3>
              <ul className="list-disc pl-4">
                <li>
                  Account Management: Creating and managing your Avatalk
                  account.
                </li>
                <li>
                  Service Delivery: Providing you with our products and
                  services.
                </li>
                <li>
                  Customer Support: Responding to your inquiries and resolving
                  issues.
                </li>
              </ul>
              <h3 className="text-semibold">Personalization</h3>
              <ul className="list-disc pl-4">
                <li>
                  User Experience: Tailoring our services to your preferences.
                </li>
                <li>
                  Content Delivery: Providing personalized content and
                  recommendations.
                </li>
              </ul>
              <h3 className="text-semibold">Communication</h3>
              <ul className="list-disc pl-4">
                <li>Updates: Sending you updates about our services.</li>
                <li>
                  Marketing: Sending promotional materials and offers (with your
                  consent).
                </li>
              </ul>
              <h3 className="text-semibold">Analysis and Improvement</h3>
              <ul className="list-disc pl-4">
                <li>
                  Performance Monitoring: Analyzing usage data to improve our
                  services.
                </li>
                <li>
                  Research: Conducting research to develop new features and
                  products.
                </li>
              </ul>
              <h3 className="text-semibold">Legal Compliance</h3>
              <ul className="list-disc pl-4">
                <li>
                  Regulatory Compliance: Complying with legal obligations and
                  protecting our rights.
                </li>
              </ul>
              <h3 className="text-semibold">Legal Basis for Processing</h3>
              We process your personal data based on:
              <ul className="list-disc pl-4">
                <li>
                  Consent: You have given explicit consent for a specific
                  purpose.
                </li>
                <li>
                  Contract: Processing is necessary for the performance of a
                  contract with you.
                </li>
                <li>
                  Legal Obligation: Processing is necessary to comply with legal
                  requirements.
                </li>
                <li>
                  Legitimate Interest: Processing is necessary for our
                  legitimate interests, such as improving our services.
                </li>
              </ul>
              <h3 className="font-semibold">Sharing Your Information</h3>
              We do not sell your personal information. However, we may share
              your data with:
              <h3 className="font-semibold">Service Providers</h3>
              Third-Party Providers: Companies that provide services on our
              behalf, such as payment processors and email service providers.
              <h3 className="font-semibold">Legal Authorities</h3>
              Compliance: Authorities when required by law or to protect our
              rights.
              <h3 className="font-semibold">Business Transfers</h3>
              Corporate Transactions: During mergers, acquisitions, or sales of
              assets.
              <h3 className="font-semibold">Data Security</h3>
              We implement robust security measures to protect your data from
              unauthorized access, use, or disclosure. These measures include:
              <ul className="pl-4 list-disc">
                <li>Encryption: Securing data in transit and at rest.</li>
                <li>
                  Access Controls: Limiting access to personal data to
                  authorized personnel only.
                </li>
                <li>
                  Monitoring: Regularly monitoring our systems for
                  vulnerabilities and breaches.
                </li>
                <li>
                  Incident Response: Having a response plan in place for
                  potential data breaches.
                </li>
              </ul>
              However, no security system is completely foolproof. In the event
              of a data breach, we will notify affected users and relevant
              authorities promptly.
              <h3 className="font-semibold">Data Retention</h3>
              We retain your personal data for as long as necessary to fulfill
              the purposes for which it was collected, including legal,
              accounting, or reporting requirements. After this period, we
              securely delete or anonymize your data. Our retention periods are
              as follows:
              <ul className="list-disc pl-4">
                <li>
                  Account Data: Retained for the duration of your account’s
                  existence.
                </li>
                <li>
                  Transaction Data: Retained for a minimum of 7 years for
                  financial compliance.
                </li>
                <li>
                  Communication Data: Retained for up to 1 year after your last
                  interaction with us.
                </li>
                <li>
                  Technical Data: Retained for up to 6 months to ensure system
                  integrity and security.
                </li>
              </ul>
              <h3 className="font-semibold">Children's Privacy</h3>
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal data from children under 13. If
              we become aware that a child has provided us with personal data,
              we will delete it promptly. Parents or guardians who believe that
              their child has provided us with personal data should contact us
              at support@avatalk.com.
              <h3 className="font-semibold">
                Cookies and Tracking Technologies
              </h3>
              We use cookies and similar technologies to enhance your
              experience, analyze usage, and deliver personalized content. The
              types of cookies we use include:
              <ul className="list-disc pl-4">
                <li>
                  Essential Cookies: Necessary for the operation of our website.
                </li>
                <li>
                  Analytical Cookies: Help us understand how our website is
                  used.
                </li>
                <li>
                  Functional Cookies: Allow us to remember your preferences.
                </li>
                <li>
                  Targeting Cookies: Used to deliver relevant advertisements.
                </li>
              </ul>
              You can control cookies through your browser settings. However,
              disabling cookies may affect your ability to use certain features
              of our services.
              <h3 className="font-semibold">Managing Cookies</h3>
              To manage your cookie preferences, you can:
              <ul className="list-disc pl-4">
                <li>
                  Browser Settings: Adjust your browser settings to refuse
                  cookies or alert you when cookies are being used.
                </li>
                <li>
                  Opt-Out Tools: Use available opt-out tools provided by
                  third-party analytics services.
                </li>
              </ul>
              <h3 className="font-semibold">Third-Party Services</h3>
              We partner with third-party services to enhance our offerings.
              These partners include:
              <ul className="list-disc pl-4">
                <li>
                  Google Analytics: To analyze website usage and improve our
                  services.
                </li>
                <li>Payment Processors: To handle transactions securely.</li>
                <li>Marketing Partners: To deliver targeted advertisements.</li>
              </ul>
              These third parties have their own privacy policies and are
              responsible for their practices. We ensure that any third-party
              service providers we work with implement adequate security
              measures to protect your data.
              <h3 className="font-semibold">International Data Transfers</h3>
              We may transfer your data to countries outside the European
              Economic Area (EEA) with appropriate safeguards in place to
              protect your information. These safeguards include:
              <ul className="list-disc pl-4">
                <li>
                  Standard Contractual Clauses: Approved by the European
                  Commission.
                </li>
                <li>
                  Privacy Shield: For transfers to the United States, where
                  applicable.
                </li>
                <li>
                  Binding Corporate Rules: For intra-group transfers within our
                  company.
                </li>
              </ul>
              <h3 className="font-semibold">Your Rights</h3>
              You have the right to:
              <ul className="list-disc pl-4">
                <li>Access: Request access to your personal data.</li>
                <li>Rectify: Correct inaccurate or incomplete data.</li>
                <li>Erase: Request the deletion of your data.</li>
                <li>Restrict: Limit the processing of your data.</li>
                <li>Object: Object to the processing of your data.</li>
                <li>
                  Portability: Transfer your data to another service provider.
                </li>
                <li>Withdraw Consent: Withdraw consent at any time.</li>
              </ul>
              <h3 className="font-semibold">Exercising Your Rights
</h3>
To exercise these rights, contact us at support@avatalk.com. We will respond to your request within one month. In certain circumstances, we may require additional information to verify your identity before processing your request.

<h3 className="font-semibold">Right to Lodge a Complaint
</h3>
If you believe that we have infringed your privacy rights, you have the right to lodge a complaint with a supervisory authority. For EU residents, this is the data protection authority in your country of residence.


<h3 className="font-semibold">Changes to This Privacy Policy
</h3>
We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The latest version will be available on our website. Significant changes will be communicated to you through appropriate channels, such as email or in-app notifications.


<h3 className="font-semibold">Effective Date
</h3>
This Privacy Policy is effective as of 9/16/2024. Your continued use of our services after the effective date constitutes your acceptance of the updated Privacy Policy.

<h3 className="font-semibold">Contact Us
</h3>
<div className="space-y-6">
<p>For any questions or concerns about this Privacy Policy or our data practices, please contact us at:

</p>
<p>Avatalk Email: support@avatalk.com 

</p>
<p>This Privacy Policy outlines the comprehensive approach Avatalk takes to ensure the privacy and security of your personal data. By using our services, you agree to the terms outlined in this document. Thank you for trusting Avatalk with your personal information.

</p>
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingPrivacyPolicy;
