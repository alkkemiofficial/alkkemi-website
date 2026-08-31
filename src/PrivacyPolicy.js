import React from 'react';
import LegalLayout from './LegalLayout';

const h2 = 'text-xl font-semibold text-blue-600 mt-10 mb-4';
const p = 'mb-4';
const ol = 'list-decimal pl-6 mb-4 space-y-3';
const olAlpha = 'list-[lower-alpha] pl-6 mt-2 space-y-2';
const romanHeading = 'font-medium text-gray-800 mt-6 mb-2';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Alkkemi Privacy Policy">
      <p className={p}>
        This Privacy Policy (the "terms", "policy") is prepared by Alkkemi LLC (as "Alkkemi",
        "us", "we") as we are committed to protecting and preserving the privacy of our visitors
        when engaging with our website, mobile apps, and related services (as "products",
        "service") or communicating electronically with us.
      </p>
      <p className={p}>
        This policy sets out how we process any personal data we collect from you or that you
        provide to us through our products. By using the service, you agree with Alkkemi's
        collection, use, and sharing of your personal information in accordance with this Privacy
        Policy. Please read the following carefully to understand what happens to your personal
        data we collect when you visit our sites.
      </p>
      <p className={p}>
        Please note that Alkkemi is constantly testing and updating our product features. Some
        features described in this Privacy Policy may not be available to all users.
      </p>

      <h2 className={h2}>Types of information we may collect from you</h2>
      <p className={p}>
        We may collect, store and use the following kinds of personal information about
        individuals who visit and use our website and social media sites. Please note that some
        information is required for our products to work. Other information is optional but may
        affect the quality of your experience. You can manage your Alkkemi account and social
        logins from your Settings.
      </p>

      <h3 className={romanHeading}>I. Information you supply to us</h3>
      <ol className={ol}>
        <li>
          You may supply us with information about you by filling in forms on our website, mobile
          apps, and related services. This includes information you provide when you submit a
          contact/inquiry form.
          <ol className={olAlpha}>
            <li>
              When registering an account with us, we require you to provide your name, email
              address, password, age, gender, geographic data (country), and your language
              learning goals. We do not collect your exact location.
            </li>
            <li>
              Once you have established an account with us, you may provide additional user
              information like a username or profile picture.
            </li>
            <li>
              If you leave a comment on our website, we require you to provide your name and
              email address.
            </li>
          </ol>
        </li>
        <li>
          Automatically collected data
          <ol className={olAlpha}>
            <li>
              Audio data from your spoken responses using Alkkemi AI. Your voice is not stored but
              the information you provide is to train the AI over your likes and dislikes.
            </li>
          </ol>
        </li>
      </ol>

      <h3 className={romanHeading}>II. Usage data</h3>
      <p className={p}>
        This is data automatically generated or collected either by the use of the service or the
        service infrastructure. This includes but is not limited to the duration of a page visit,
        device information, and session duration.
      </p>

      <h3 className={romanHeading}>III. Engagement data</h3>
      <p className={p}>
        This is data reflecting the interactions with our services. This may include but is not
        limited to click-stream data, preferences, and other actions taken within our services.
      </p>

      <h3 className={romanHeading}>IV. Cookies and Trackers</h3>
      <p className={p}>
        Cookies are small data files stored on your device that help Alkkemi improve our services
        and your experiences, understand user activity, and enhance the effectiveness of our ads.
      </p>
      <ol className={ol}>
        <li>
          While you do not have to agree to the complete usage of cookies on our sites, there are
          essential cookies to the operations of our webpage and therefore not optional. You can
          opt-out of the optional cookies when creating an account or in settings on the webpage.
        </li>
        <li>
          When creating an account, you have the option to sign-up with third party websites such
          as Google, Facebook, or Apple accounts. Alkkemi does not share your personal data with
          these third party websites.
        </li>
      </ol>

      <h3 className={romanHeading}>V. Financial information</h3>
      <p className={p}>
        We collect and store information related to financial transactions to keep record of such
        transactions you have made and to make future transactions easier.
      </p>

      <h2 className={h2}>AI Use</h2>
      <p className={p}>
        We use Artificial Intelligence in aspects of our products including but not limited to the
        app's dictionary and AI talking features. We ensure security over information shared with
        our AI. Any information shared is not sold to other websites or businesses; we use this
        information solely to make your experience better.
      </p>
      <p className={p}>
        When using Alkkemi AI, we collect data about your daily life and interests via
        conversations with the AI. For safety reasons, do not provide personal information such as
        your social security number, home address, etc. We shall not be held responsible for this
        kind of information shared and if this information should be leaked. See Alkkemi Terms and
        Conditions for more information.
      </p>

      <h2 className={h2}>Data Retention</h2>
      <p className={p}>
        Under compliance with institutions in Indiana and the United States, we at Alkkemi will
        keep your information safe as long as you have an account with us. Under the 'Right to be
        Forgotten Law', you have the right for your personal information to be deleted from our
        system if you wish to cancel any subscription or account with our services. However some
        operating information may be kept longer if necessary or indefinitely to continue
        providing our services. This includes but is not limited to:
      </p>
      <ol className={olAlpha}>
        <li>Age;</li>
        <li>Gender;</li>
        <li>Geographic data.</li>
      </ol>

      <h2 className={h2}>Disclosure of your information</h2>
      <ol className={ol}>
        <li>
          Any information you provide to us will either be emailed directly to us or may be stored
          on a secure server.
        </li>
        <li>
          We do not rent, sell or share personal information about you with other people or
          non-affiliated companies unless obligated to on a legal basis. Any agreement with a third
          party will be promptly sent to all users and the Privacy and Terms and Conditions will be
          updated to show this change.
        </li>
        <li>
          We will use all reasonable efforts to ensure that your personal data is not disclosed to
          regional/national institutions and authorities unless required by law or other
          regulations.
        </li>
        <li>
          The transmission of information via the internet is not completely secure. Although we
          will do our best to protect your personal data, we cannot guarantee the security of your
          data transmitted to our site; any transmission is at your own risk. Once we have received
          your information, we will use strict procedures and security features to try to prevent
          unauthorized access.
        </li>
      </ol>

      <h2 className={h2}>Your rights – access to your personal data</h2>
      <p className={p}>
        You have the right to ensure that your personal data is being processed lawfully ("Subject
        Access Right"). Your subject access right can be exercised in accordance with data
        protection laws and regulations. Any subject access request must be made in writing to{' '}
        <a href="mailto:alkkemi.official@gmail.com" className="text-blue-600 hover:underline">
          alkkemi.official@gmail.com
        </a>
        . We will provide your personal data to you within the statutory time frames. To enable us
        to trace any of your personal data that we may be holding, we may need to request further
        information from you.
      </p>
      <p className={p}>
        If you have concerns about how we have used your information, you have the right to
        complain to the Information Commissioner's Office (ICO).
      </p>

      <h2 className={h2}>How long do we store your data?</h2>
      <ol className={ol}>
        <li>
          Unless otherwise stated, Alkkemi stores your data until you delete your account. This
          data includes all information used to create an account and some information told to
          Alkkemi AI.
        </li>
        <li>
          There are some essential pieces of information that are critical for the operations of
          the business. This helps us to continue to cater the services to users in ways that are
          most helpful to them. Such data that is stored includes but is not limited to:
          <ol className={olAlpha}>
            <li>Age, gender, and geographic data.</li>
          </ol>
        </li>
      </ol>

      <h2 className={h2}>Changes to our privacy policy</h2>
      <p className={p}>
        Any changes we may make to our privacy policy in the future will be posted on this page
        and, where appropriate, notified to you by e-mail. Please check back frequently to see any
        updates or changes to our privacy policy.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Questions, comments, and requests regarding this privacy policy are welcomed and should be
        addressed to Alkkemi through our website, social media, or directly through our email:{' '}
        <a href="mailto:alkkemi.official@gmail.com" className="text-blue-600 hover:underline">
          alkkemi.official@gmail.com
        </a>
        .
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
