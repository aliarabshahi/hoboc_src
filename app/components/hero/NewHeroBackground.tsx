'use client';

type NewHeroBackgroundProps = {
  fromColor?: string;
  toColor?: string;
};

//   fromColor = '#ff80b5',
//   toColor = '#9089fc',
export default function NewHeroBackground({
fromColor = '#1F9ECD',
toColor = '#3ddbd9',
}: NewHeroBackgroundProps) {
  return (
    <>
      {/* Top background blob */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] 
            -translate-x-1/2 rotate-[30deg] opacity-30 
            sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            backgroundImage: `linear-gradient(to top right, ${fromColor}, ${toColor})`,
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Bottom background blob */}
      <div
        className="absolute inset-x-0 top-[calc(100%-8rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-25rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[24.125rem] 
            -translate-x-1/2 opacity-20 
            sm:left-[calc(50%+30rem)] sm:w-[48.1875rem]"
          style={{
            backgroundImage: `linear-gradient(to top right, ${fromColor}, ${toColor})`,
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </>
  );
}
