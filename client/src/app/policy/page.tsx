import Contact from "@/components/Home/Contact";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { FaPhone, FaEnvelope, FaUser, FaBriefcase } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-primary-650">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <div className="container-c pb-8 pt-36">
        <div className="mb-12 text-center">
          <h1 className="title Bebas text-5xl md:text-6xl lg:text-7xl">
            PRIVACY and POLICY
          </h1>
        </div>
        </div>

      <div className="mt-8 mb-16">
        <div className="container-c space-y-6">
          <section>
            <h2 className="text-3xl">Privacy Policy</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              Welcome to the INIT website. We respect your privacy and are committed to protecting the personal information you share with us when registering for events, participating in activities, or using our platform.
            </p>
          </section>

          <section>
            <h3 className="text-2xl">Information We Collect</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Contact details such as name, email address, phone number, and institution.</li>
              <li>Event participation details, including registrations, team information, and competition entries.</li>
              <li>Usage data from how you interact with the website and features.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl">How We Use Your Information</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>To manage event registration, communication, and scheduling.</li>
              <li>To send important updates, reminders, and event-related announcements.</li>
              <li>To improve the site experience and provide support for participants and organizers.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl">Data Sharing & Security</h3>
            <p className="mt-4 text-base leading-8 text-slate-200">
              We do not sell your personal information. We may share data with authorized event organizers or service providers only when necessary to support event operations. We protect your information with appropriate security measures and limit access to authorized personnel.
            </p>
          </section>

          <section>
            <h3 className="text-2xl">Your Rights</h3>
            <p className="mt-4 text-base leading-8 text-slate-200">
              You can contact us to review, update, or delete your personal information. We also support requests to correct any inaccurate data and will honor reasonable privacy requests in accordance with applicable laws.
            </p>
          </section>

          <section >
            <h2 className="text-3xl">Campus Ambassador and Club Partner Policies</h2>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-200">
              <li>Campus Ambassadors and Club Partners must represent the festival professionally and follow official branding guidelines.</li>
              <li>They should not create unauthorized groups or pages using the festival logo or name.</li>
              <li>Personal information collected for ambassador or partner coordination will only be used for event communication and management.</li>
              <li>All promotional activities should maintain respect for participants, organizers, and partner institutions.</li>
            </ul>
          </section>
        </div>
        <Contact />
      </div>
    </main>
  );
}

