"use client";

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation"
import { CustomButton } from ".";
import { updateSearchParams } from "@/utils";

const Showmore = ({pageNumber, isNext}: ShowMoreProps) => {

    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 8;
        const newPathName = updateSearchParams("limit", `${newLimit}`)

        router.push(newPathName)
    }

  return (
    <div className="w-full flex justify-center items-center gap-5 mt-10">
        <CustomButton
            title="Show More"
            containerStyles="bg-primary-blue text-white rounded-full hover:bg-white hover:text-primary-blue border-2 border-primary-blue transition duration-200 ease-in"
            btnType="button"
            handleClick={handleNavigation}
        />
    </div>
  )
}

export default Showmore