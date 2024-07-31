import React from "react";

const PrevInit = () => {
  return (
    <div className="GradBGDark bg-opacity-15 py-10">
      <div className="container">
        <h2 className="title title-top">PREVIOUS INIT </h2>
        <div className="flex flex-col gap-10">
          <div className="grad-card w-full max-w-[450px] overflow-hidden rounded-xl shadow-md">
            <img className="h-[250px] w-full" src="/about.jpg " alt="" />
            <div className="m-8">
              <div className="flex items-center gap-3">
                <h2 className="Bebas text-4xl text-primary-150">INIT 4.0</h2>{" "}
                <div className="-mt-1 rounded-full bg-primary-450 px-3 py-1 text-base font-semibold">
                  2018
                </div>
              </div>
              <p className="mb-2 mt-2 border-l-4 border-primary-450 pl-4 text-white/65">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
                maiores nostrum, ducimus asperiores vitae inventore perferendis
                ad itaque praesentium laudantium et alias ipsa, ut, sint dolorem
                blanditiis placeat? Tempora aperiam voluptatum praesentium?
                Consequuntur perspiciatis dolorem nemo corporis ipsum possimus,
                pariatur impedit? Dolor eius
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevInit;
