import React from "react";
import { Locale } from "../../../../../i18n-config";
import ClientForm from "./ClientForm";

const Page: React.FC<{ params: Promise<{ lang: Locale }> }> = async (props: {
  params: Promise<{ lang: Locale }>;
}) => {
  return <ClientForm />;
};

export default Page;
