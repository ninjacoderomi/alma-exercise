import React from "react";
import { Typography } from "@mui/material";
import { LOGO_FULL } from "@/constants";

const FormHeader: React.FC<{ t: any }> = ({ t }) => {
  return (
    <header className="flex flex-row items-center w-full h-1/2 m-0 p-0 bg-[#d9dea5] opacity-90">
      <div className="h-[100%] hidden sm:block">
        <img src={"/header.png"} alt="icon" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-full h-full p-10 ">
        <div>
          <img src={LOGO_FULL} alt="logo" className="w-10 " />
        </div>
        <Typography variant="h4" className="w-30 t-10">
          {t("submitCase.title")}
        </Typography>
      </div>
    </header>
  );
};

export default FormHeader;
