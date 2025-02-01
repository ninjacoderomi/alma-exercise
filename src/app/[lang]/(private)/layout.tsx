"use client";
import React, { ReactNode } from "react";
import { useState, useEffect } from "react";
import { BREAKPOINTS, LOGO_FULL } from "@/constants";
import MenuLink from "@/app/components/MenuLink";
import { useTranslations } from "@/providers/translations-provider.client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

const Layout: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { t } = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(
    window.innerWidth >= BREAKPOINTS.md
  );
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user?.email) {
      redirect("/api/auth/login");
    }
  }, [user, isLoading]);
  return (
    <main className="flex flex-row h-screen drop-shadow-[-100vh_-100vh_100px_rgba(255,255,0,0.35)]">
      <nav
        className={`w-52 p-5  ${
          isMenuOpen ? "block" : "hidden"
        } relative h-screen flex flex-col border-r border-gray-200`}
      >
        <div className="">
          <img src={LOGO_FULL} alt="logo" className="w-20 mb-10" />
        </div>
        <ul className="">
          <MenuLink href="/leads" label={t("Leads")} />
          <MenuLink href="/settings" label={t("Settings")} />
          <MenuLink
            href="/profile"
            label={user?.name || t("Profile")}
            className="absolute bottom-[1rem] overflow-hidden text-overflow-ellipsis whitespace-nowrap max-w-[100px] block font-bold"
          />
        </ul>
      </nav>
      <main className="w-full flex p-5">{children}</main>
    </main>
  );
};

export default Layout;
