// import { lightColor } from "../../../color.config";
import GalleryImage from "@/components/Gallery/GalleryImage";
import ExtendedColors from "../../../color.config";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";
import reqs, { reqImgWrapper } from "@/app/data/requests";
import { AnimatedModalDemo } from "@/components/ui/Modal";
import { ModalProvider } from "@/components/ui/Modal/animated-modal";

const page = async () => {
  const imagesFetch = await fetch(reqs.ALL_GALLERY_IMG);
  const imagesJSON = await imagesFetch.json();

  if (!imagesJSON.succeed) {
    alert("Error");
  }

  const images = imagesJSON.result;

  return (
    <main className="">
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white antialiased dark:bg-[#141028] md:mb-10 md:items-center md:justify-center">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill={ExtendedColors.primary["200"]}
        />
        <section className="mt-36 flex w-[90%] flex-col items-center justify-evenly xl:mt-0 xl:flex-row">
          <img
            className="mb-20 hidden h-[481px] w-80 rounded-xl xl:block"
            src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/444483006_1098666241651573_800566798330672681_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MR-hIk7ya20Q7kNvgGUkP9_&_nc_ht=scontent.fdac155-1.fna&oh=00_AYBixcAmTlTfvVRnt5oAD4ME9vbAuhmT783YiMOHozwphQ&oe=66B9167A"
            alt=""
          />
          <h1 className="Inter GradText mb-10 text-center text-5xl font-extrabold md:text-7xl xl:mb-0 xl:text-8xl">
            OUR
            <br />
            TECH
            <br />
            JOURNEY
          </h1>
          <img
            className="mt-20 hidden h-[481px] w-80 flex-wrap rounded-xl xl:block"
            src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/441582958_1098667051651492_4716625926671468195_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ga0fdA4sbUcQ7kNvgGm90Jt&_nc_ht=scontent.fdac155-1.fna&oh=00_AYD9zl4PsZECegwcDwMgHintg8WX4MkCOZ9L-obwQhRxmw&oe=66B90B4E"
            alt=""
          />
          <div className="mb-20 flex w-full justify-evenly xl:hidden">
            <img
              className="h-[250px] w-40 rounded-xl md:h-[481px] md:w-80"
              src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/444483006_1098666241651573_800566798330672681_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MR-hIk7ya20Q7kNvgGUkP9_&_nc_ht=scontent.fdac155-1.fna&oh=00_AYBixcAmTlTfvVRnt5oAD4ME9vbAuhmT783YiMOHozwphQ&oe=66B9167A"
              alt=""
            />
            <img
              className="mt-10 h-[241px] w-40 rounded-xl md:h-[481px] md:w-80"
              src="https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/441582958_1098667051651492_4716625926671468195_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ga0fdA4sbUcQ7kNvgGm90Jt&_nc_ht=scontent.fdac155-1.fna&oh=00_AYD9zl4PsZECegwcDwMgHintg8WX4MkCOZ9L-obwQhRxmw&oe=66B90B4E"
              alt=""
            />
          </div>
        </section>
      </section>

      <section className="gallery grid-gallery px-1 md:px-10">
        <div className="intro">
          <img
            src={reqImgWrapper(images[0].BigImage)?.toString()}
            className="h-full w-full"
            alt=""
          />
        </div>

        {images.map((item: any, key: number) => {
          if (key != 0) {
            return <GalleryImage keyVal={key} key={key} item={item} />;
          }
        })}
      </section>

      <AnimatedModalDemo />
    </main>
  );
};

export default page;

/*<div key={key} className="image">
                  <span>
                    <img
                      loading="lazy"
                      alt={"gallery image"}
                      width={"100%"}
                      height={"100%"}
                      style={{
                        objectFit: "cover",
                        transition: "0.3s all ease-in-out",
                      }}
                      className="rounded-xl"
                      src={reqImgWrapper(item.BigImage)?.toString()}
                    />
                  </span>
                </div>*/
