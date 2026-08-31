import React from 'react';
import LegalLayout from './LegalLayout';

const h2 = 'text-xl font-semibold text-blue-600 mt-10 mb-4';
const p = 'mb-4';
const ol = 'list-decimal pl-6 mb-4 space-y-3';
const olAlpha = 'list-[lower-alpha] pl-6 mt-2 space-y-2';

const TermsConditions = () => {
  return (
    <LegalLayout title="Alkkemi Terms of Service" lastUpdated="12/3/2025">
      <p className={p}>
        Please read this document before using our Service or Premium Service.
      </p>

      <h2 className={h2}>1. Introduction</h2>
      <p className={p}>
        These Terms of service (the "terms") apply to the use of the website alkkemi.com (the
        "website") and the app Alkkemi (the "app"), and the use of the language-learning service
        provided through them (together, the "service").
      </p>
      <p className={p}>
        The service is owned and operated by Alkkemi LLC (as "Alkkemi", "we", "us") registered in
        Indiana, USA with company number 202509161927032 with a registered office at 517 E
        Kirkwood Avenue, Bloomington, IN, 47408, USA.
      </p>
      <p className={p}>
        By accessing or using the Alkkemi website or app service, you confirm that you accept and
        agree to comply with these terms. Only by agreeing to comply can you use our Services. You
        also confirm that you are at least 13 years old. If you are not, then a parent/guardian has
        provided their email to confirm you, the user, is able to use our Services.
      </p>
      <p className={p}>
        These terms may be updated from time to time by Alkkemi to continue to provide up-to-date
        information to you, the user. You will be notified of any changes.
      </p>

      <h2 className={h2}>2. Website and Service</h2>
      <ol className={ol}>
        <li>
          The website is accessible to the public for those interested in who we are as a company
          and/or resource for learning a language. You can learn more about who we are, what we
          do, and important company information. This information is not to be taken advantage of
          by imitating or forging Alkkemi.
        </li>
        <li>
          The Alkkemi app is accessible to the public as a language learning resource for people
          wanting to expand their vocabulary and make real progress in their proficiencies.
        </li>
      </ol>

      <h2 className={h2}>3. User Profile and Registration</h2>
      <ol className={ol}>
        <li>
          In order to use all Alkkemi app services, you must have a valid Alkkemi account. You
          must provide your name, email address, and other information we record for the better
          function of our service. You will also have to set a password that you are responsible
          for creating and remembering.
        </li>
        <li>
          You are responsible for your account and therefore must protect it from unauthorized and
          fraudulent use. Please notify Alkkemi as soon as possible at{' '}
          <a href="mailto:alkkemi.official@gmail.com" className="text-blue-600 hover:underline">
            alkkemi.official@gmail.com
          </a>{' '}
          if you suspect any unauthorized or fraudulent use of your services or if your account is
          at risk.
        </li>
        <li>
          Alkkemi has the right to close or cancel the account of any user in the event of any
          unauthorized or fraudulent use of their account. If that unauthorized or fraudulent use
          was caused by your breach of these terms, any amounts paid by you for any premium
          services will not be refunded.
        </li>
      </ol>

      <h2 className={h2}>4. Free and Paid Services</h2>
      <ol className={ol}>
        <li>
          Alkkemi provides both free and paid versions of the services ("free services" and "paid
          services"). The free services provide the user with limited or conditional access to
          learning functionalities and content. You have the option of subscribing to paid
          services to access additional features and learning material for a set fee under a set
          recurrence. You are responsible for paying that fee within that time period. We have the
          right to demand payment; see (7. Indemnification of Alkkemi).
        </li>
        <li>
          Membership subscriptions can be made in-app at the then-current prices as an in-app
          purchase. These are automatically renewed unless cancelled. Make sure in the case of
          account deletion that any paid service subscriptions have been cancelled.
        </li>
        <li>
          We have the right to modify prices of paid services at any given time without notifying
          the user under reasonable increases. With all other changes, we will notify you of said
          changes. Any price modifications does not apply to Beta users.
        </li>
      </ol>

      <h2 className={h2}>5. In-App Purchases</h2>
      <ol className={ol}>
        <li>The purchase of membership subscriptions.</li>
        <li>
          In the service, you may purchase non-refundable and non-transferable items solely for
          use in the service and not in any other way whether you use them or not. The resale of
          such items is prohibited.
        </li>
        <li>
          There are certain purchases that come with a trial period. Unless you cancel within 24
          hours of the trial ending, you will automatically become a recurring subscriber until
          you cancel payment. Any amount paid until the cancellation is non-refundable.
        </li>
      </ol>

      <h2 className={h2}>6. User Responsibilities</h2>
      <ol className={ol}>
        <li>
          You are responsible for obtaining and maintaining both free and paid services under your
          account.
        </li>
        <li>
          Any information, data, text, software, music, sound, photographs, videos, and other
          materials posted or emailed to any media within Alkkemi is the user's responsibility and
          Alkkemi claims no responsibility for the misuse of those materials.
        </li>
      </ol>

      <h2 className={h2}>7. Indemnification of Alkkemi</h2>
      <ol className={ol}>
        <li>
          All financial transactions in connection with our service will be processed in
          accordance with your payment service provider. Alkkemi will not be responsible for the
          actions or inaction of third party payment service providers.
        </li>
        <li>
          If your subscription fees remain outstanding for more than 3 months, Alkkemi has the
          right to suspend your access to any paid services. You will only have access to the free
          services until you have paid that outstanding amount.
        </li>
        <li>
          Alkkemi will not be held responsible for misuse of payment for any trial periods or
          forgotten paid services.
        </li>
        <li>
          Alkkemi does not regulate nor monitor uploads by users to the service. We are not
          responsible for the misuse of these features. If we become aware of inappropriate
          content uploaded, we have the right to refuse, move, or delete any user content uploaded
          or suspend user accounts.
        </li>
      </ol>

      <h2 className={h2}>8. Limitation of Liability</h2>
      <ol className={ol}>
        <li>
          Alkkemi shall not be held responsible for damages resulting from a breach of contract of
          non-material obligations through simple negligence of Alkkemi, its legal representatives
          or vicarious agents.
        </li>
        <li>
          In the event of a breach of a material obligation, Alkkemi shall only be responsible for
          the foreseeable, typical contractual damage. This limitation also applies to breaches of
          duty by Alkkemi's legal representatives or vicarious agents. The personal liability of
          Alkkemi's legal representatives, vicarious agents and employees for damages caused by
          them due to slight negligence is excluded.
        </li>
        <li>
          Alkkemi shall be liable for loss of data only up to the amount of typical recovery costs
          that would have been incurred had proper and regular data backup measures been taken by
          you.
        </li>
        <li>
          Alkkemi will not be held responsible for:
          <ol className={olAlpha}>
            <li>
              Death or personal injury caused by our negligence or the negligence of our
              employees, legal representatives, or vicarious agents;
            </li>
            <li>Fraud or fraudulent misrepresentation;</li>
            <li>Disputes between users on the site, app, or using any Alkkemi service;</li>
            <li>
              Any matter in respect of which it would be unlawful for us to exclude or restrict
              liability.
            </li>
          </ol>
        </li>
        <li>
          Alkkemi does not guarantee, represent, or warrant any specific language learning
          progress or success will be achieved by you through the use of the services.
        </li>
      </ol>

      <h2 className={h2}>9. Third-Party Links, Sites, and Services</h2>
      <p className={p}>
        By agreeing to these Terms and Conditions and our Privacy Policy, you agree and understand
        the service may contain links to third-party websites or advertisers that are not
        controlled by Alkkemi. We do not assume responsibility for such third-party websites or
        advertisers.
      </p>

      <h2 className={h2}>10. Data Privacy</h2>
      <p className={p}>
        The processing and use of personal data by Alkkemi is described in our{' '}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">
          privacy policy
        </a>
        , which can be accessed on our website or through this link.
      </p>

      <h2 className={h2}>11. Governing Law</h2>
      <p className={p}>
        Alkkemi does business in accordance with Indiana and United States' laws and regulations.
        These are outlined in our Privacy Policy which can be accessed through our website or
        through this link.
      </p>

      <h2 className={h2}>12. Contact</h2>
      <p className={p}>
        Please contact us for any questions you might have or to report any breaches of these
        terms at{' '}
        <a href="mailto:alkkemi.official@gmail.com" className="text-blue-600 hover:underline">
          alkkemi.official@gmail.com
        </a>
        .
      </p>
    </LegalLayout>
  );
};

export default TermsConditions;
