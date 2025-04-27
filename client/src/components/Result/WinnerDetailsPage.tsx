"use client";

import { FiAward, FiUser, FiHome } from "react-icons/fi";

interface Winner {
  id: string;
  name: string;
  institution: string;
  image?: string;
  wins: {
    segment: string;
    prize: 1 | 2 | 3;
  }[];
}

const WinnerDetailsPage = ({ winner }: { winner: Winner }) => {
  const prizeColors = {
    1: "bg-primary-350 text-primary-650",
    2: "bg-secondary-300 text-primary-650",
    3: "bg-primary-250 text-primary-650"
  };

  const prizeLabels = {
    1: {
      full: "1st Prize Winner",
      short: "1st"
    },
    2: {
      full: "2nd Prize Winner",
      short: "2nd"
    },
    3: {
      full: "3rd Prize Winner",
      short: "3rd"
    }
  };
  

  return (
    <div className="min-h-screen bg-primary-650 py-12 px-4 sm:px-6 lg:px-8  ">
      <div className="max-w-4xl mx-auto">
        <div className="my-5 text-center">
          <div className="text-xl font-medium text-primary-150 mb-2">
            Achievement Recognized
          </div>
          <div className="text-primary-200 max-w-2xl mx-auto">
            {winner.wins.length > 1
              ? "Honoring excellence across multiple competition segments"
              : "Celebrating outstanding performance in the competition"}
          </div>
        </div>
        <div className="bg-primary-600 rounded-2xl shadow-lg overflow-hidden border border-primary-550">

          <div className="bg-primary-550 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">

            <div className="relative">

              <div className="h-28 w-28 rounded-full border-4 border-primary-400 bg-primary-500 flex items-center justify-center overflow-hidden">
                {winner.image ? (
                  <img
                    src={winner.image}
                    alt={winner.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="h-16 w-16 text-primary-200" />
                )}
              </div>
            </div>


            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-primary-150">
                {winner.name}
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 text-primary-200">
                <FiHome className="mr-2" />
                <div>{winner.institution}</div>
              </div>
            </div>
          </div>


          <div className="p-3 md:p-8">
            <div className="text-lg font-semibold text-primary-150 mb-6 pb-2 border-b border-primary-550">
              Winning Segments
            </div>

            <div className="grid gap-4">
              {winner.wins.map((win, index) => (
                <div
                  key={index}
                  className="bg-primary-600 border border-primary-500 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="text-primary-150">
                    {win.segment}
                  </div>
                  <div className={`${prizeColors[win.prize]} px-4 py-2 rounded-full font-semibold flex items-center`}>
                    <FiAward className="mr-2" />
                    <>
                      <span className="hidden sm:inline">{prizeLabels[win.prize].full}</span>
                      <span className="inline sm:hidden">{prizeLabels[win.prize].short}</span>
                    </>

                  </div>
                </div>

              ))}
            </div>


            <div className="mt-8 pt-6 border-t border-primary-550">
              <div className="flex justify-between items-center">
                <div className="text-primary-200">Total Segments Won:</div>
                <div className="bg-primary-500 text-primary-150 px-4 py-2 rounded-full font-bold">
                  {winner.wins.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDetailsPage;