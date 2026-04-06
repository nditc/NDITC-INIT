import Contact from "@/components/Home/Contact";
import { Spotlight } from "@/components/ui/Spotlight/Spotlight";
import ExtendedColors from "../../../color.config";
import { FaPhone, FaEnvelope, FaUser, FaBriefcase } from "react-icons/fa";

interface ContactInfo {
  name: string;
  designation: string;
  phone: string;
  email: string;
  note?: string;
}

const contacts: ContactInfo[] = [
  {
    name: "Muksifur Rahman",
    designation: "President, Department of Administration",
    phone: "+880 1410-920703",
    note: "(Whatsapp Only)",
    email: "rahman@muksifur.com",
  },
  {
    name: "Luran Meahda Ramiz Rafin",
    designation: "Organizer",
    phone: "+880 1552-428308",
    email: "lightofeducation999@gmail.com",
  },
  {
    name: "Md Ikramul Hasan",
    designation: "Organizer",
    phone: "+880 1715-313114",
    email: "mdikramulhasanfardin@gmail.com",
  },
  {
    name: "Azmain Saif",
    designation: "Organizer",
    phone: "+880 1876-679065",
    email: "saifazmain08@gmail.com",
  },
];

const ContactCard = ({ contact }: { contact: ContactInfo }) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-secondary-600 p-8 shadow-xl transition-all hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500">
          <FaUser className="text-xl text-primary-150" />
        </div>
        <div>
          <h3 className="Bebas text-2xl tracking-wide text-white">
            {contact.name}
          </h3>
          <div className="flex items-center gap-2 text-primary-150/80">
            <FaBriefcase className="text-sm" />
            <p className="text-sm font-medium">{contact.designation}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-white/80 transition-colors hover:text-primary-150">
          <FaPhone className="text-primary-300" />
          <div className="flex items-baseline gap-2">
            <a href={`tel:${contact.phone}`} className="Inter text-base">
              {contact.phone}
            </a>
            {contact.note && (
              <span className="Inter text-[14px] font-medium opacity-50">
                {contact.note}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-white/80 transition-colors hover:text-primary-150">
          <FaEnvelope className="text-primary-300" />
          <a href={`mailto:${contact.email}`} className="Inter text-base">
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
};

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
            CONTACTS
          </h1>
          <p className="Inter mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Have questions about INIT 6.0? Reach out to our team members for
            event-specific information or general inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {contacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="container-c text-center">
          <h2 className="title Bebas text-4xl tracking-wider">
            GET IN TOUCH
          </h2>
          <p className="Inter mx-auto -mt-6 mb-8 max-w-lg text-white/60">
            Have a specific inquiry or need further clarification? Feel free to
            message us directly using the form below.
          </p>
        </div>
        <Contact />
      </div>
    </main>
  );
}

