import { Developer } from "@/types/developer";
import developersData from "@/data/developers.json";
import { FaCodeCommit } from "react-icons/fa6";
import { IoIosCode } from "react-icons/io";

const DeveloperCard: React.FC<Developer> = ({
  name,
  post,
  image,
  facebook = "#",
  role,
}) => {
  return (
    <a
      href={facebook}
      className="relative block h-[320px] w-full max-w-[250px] overflow-hidden rounded-2xl transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
    >
      <div className="relative h-full w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(48, 24, 100, 0.9) 20%, rgba(48, 24, 100, 0.4) 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <h2 className="mb-2 text-center text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {name}
        </h2>
        <p className="text-center text-base font-medium text-secondary-200 opacity-95">
          {post}
        </p>

        <p className="text-center text-base font-medium text-white/50 opacity-95">
          {role}
        </p>
      </div>
    </a>
  );
};

const DevelopersGrid: React.FC = () => {
  return (
    <div className="container-c min-h-screen px-8 pb-16 pt-36">
      <div className="mb-12 text-center">
        <h2 className="title Bebas my-2 pb-1 text-center text-4xl md:text-5xl lg:mb-0 lg:mt-0">
          <IoIosCode className="icn-inline text-primary-300" /> DEVELOPERS
        </h2>
        <p className="text-white/50">
          The site developers are a passionate team dedicated to creating a
          dynamic and user-friendly platform, constantly innovating to enhance
          functionality and design.
        </p>
      </div>
      {Object.keys(developersData).map((type) => (
        <>
          <h3
            className="mx-auto mb-8 max-w-7xl text-center text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #9364fa 0%, #783DF9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {type}
          </h3>

          <div className="mx-auto mb-12 flex w-full flex-wrap justify-center gap-8">
            {(developersData as any)[type].map((developer: any, index: any) => (
              <DeveloperCard key={index} {...developer} />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default DevelopersGrid;
