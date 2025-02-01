"use client";
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import axios from "axios";
import FormHeader from "./FormHeader";
import FormSubmitted from "./FormSubmitted";
import { schema, uischema } from "./formSchema";
import { useTranslations } from "@/providers/translations-provider.client";

const ClientForm: React.FC = () => {
  const [data, setData] = React.useState({});
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const { t } = useTranslations();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put("/api/leads", data);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <FormSubmitted t={t} />
      ) : (
        <>
          <FormHeader t={t} />
          <Container className="flex flex-col w-half p-10" maxWidth="sm">
            <Typography variant="h3" textAlign={"center"} typography={"bold"}>
              {t("submitCase.want-to-understand")}
            </Typography>
            <Typography variant="body">
              {t("submitCase.fill-out-form")}
            </Typography>
            <form
              onSubmit={handleSubmit}
              className={"flex flex-col items-center"}
            >
              <JsonForms
                schema={schema}
                uischema={uischema}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
                data={data}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Container>
        </>
      )}
    </div>
  );
};

export default ClientForm;
