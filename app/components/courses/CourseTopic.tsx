import React from "react";
import Image from "next/image";
import { Topic } from "@/app/types/course";

type Props = {
  topic: Topic;
};

const CourseTopic = ({ topic }: Props) => {
  const isLocalhostImage = topic.image?.includes("localhost");

  return (
    <div className="flex flex-col items-center justify-center text-center border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-100 pb-2 transition-all duration-200">
      <Image
        src={topic.image}
        alt={topic.title}
        width={48}
        height={48}
        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
        unoptimized={isLocalhostImage}
      />
      <span className="text-xs sm:text-sm md:text-base font-medium mt-1">
        {topic.title}
      </span>
    </div>
  );
};

export default CourseTopic;
