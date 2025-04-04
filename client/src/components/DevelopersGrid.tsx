import { Developer } from '../types/developer';

const DeveloperCard: React.FC<Developer> = ({ name, role, image, facebook = '#' }) => {
  return (
    <a
      href={facebook}
      className="relative block rounded-2xl overflow-hidden aspect-[3/4] transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
    >
      <div className="relative h-full w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background: 'linear-gradient(to top, rgba(48, 24, 100, 0.9) 20%, rgba(48, 24, 100, 0.4) 70%, transparent 100%)'
          }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h2 className="text-xl font-bold text-center mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {name}
        </h2>
        <p className="text-base text-center font-medium text-secondary-200 opacity-95">
          {role}
        </p>
      </div>
    </a>
  );
};

const DevelopersGrid: React.FC<{ developers: Developer[] }> = ({ developers }) => {
  return (
    <div 
      className="min-h-screen py-16 px-8"
      style={{
        background: 'linear-gradient(135deg, #24124b 0%, #180c32 100%)'
      }}
    >
      <h1 
        className="text-center text-4xl font-bold mb-16 mx-auto max-w-7xl"
        style={{
          backgroundImage: 'linear-gradient(135deg, #9364fa 0%, #783DF9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Meet the developers who made our website possible
      </h1>

      <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto md:grid-cols-2 sm:grid-cols-1 sm:max-w-md">
        {developers.map((developer, index) => (
          <DeveloperCard key={index} {...developer} />
        ))}
      </div>
    </div>
  );
};

export default DevelopersGrid;