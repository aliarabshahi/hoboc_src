// app/components/final-word/FinalWordBackground.tsx
"use client";

/** Decorative blurred gradient blob at the bottom of the section */
export default function FinalWordBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-20 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none sm:-bottom-28"
    >
      <div
        className="relative right-[calc(50%-rem)] aspect-[1400/678] w-[50rem] translate-x-1/2 rotate-[20deg] 
                   bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 
                   sm:right-[calc(50%-30rem)] sm:w-[80rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  );
}
