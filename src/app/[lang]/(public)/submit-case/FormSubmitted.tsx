import React from "react";
import { Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const FormSubmitted: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="flex flex-col items-center m-auto w-1/2 pt-10 gap-4">
      <InfoIcon color="primary" fontSize="large" />
      <Typography variant="h4" textAlign={"center"}>
        {t("submitCase.thank-you")}
      </Typography>
      <Typography variant="body" textAlign={"center"}>
        {t("submitCase.submitted")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/" // Go to home page
      >
        {t("submitCase.back-to-home")}
      </Button>
    </div>
  );
};

export default FormSubmitted;
