"use client";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BREAKPOINTS } from "@/constants";

const Layout: React.FC = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(
    window.innerWidth >= BREAKPOINTS.md
  );

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="p-5 bg-gray-200">
        <button onClick={handleMenu}>{t("Menu")}</button>
      </header>
      <nav
        className={`w-52 p-5 bg-gray-200 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <ul>
          <li>
            <a href="#link1">{t("Leads")}</a>
          </li>
          <li>
            <a href="#link2">{t("Settings")}</a>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col h-screen">
        <div style={{ display: "flex" }}>
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
      </main>
    </>
  );
};

export default Layout;
