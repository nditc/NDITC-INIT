import ExtendedColors from "../../../color.config";
import { Spotlight } from "../../components/ui/Spotlight/Spotlight";
import reqs from "@/api/requests";
import ImagesCont from "@/components/Gallery/ImagesCont";
import "@/styles/gallery.css";

const page = async () => {
  const imagesFetch = await fetch(reqs.ALL_GALLERY_IMG, { cache: "no-store" });
  const imagesJSON = await imagesFetch.json();

  if (!imagesJSON.succeed) {
    alert("Error");
  }

  const images = imagesJSON.result;

  return (
    <main className="">
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-primary-650 antialiased md:mb-10 md:items-center md:justify-center">
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
          <h1 className="Inter GradText xl:mb-02xl:text-8xl mb-10 text-center text-5xl font-extrabold md:text-7xl">
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

      <ImagesCont images={images} />
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
