import { Suspense } from "react";

import { LocaleSwitcher, ThemeSwitcher } from "@/widgets";

import RevalidatorButton, { UpdateButton } from "./revalidatorButton";
import UserData from "./UserData";
import UserDataHydrator from "./userData-hydrator";

export const Header = () => {
  return (
    <header className="top-0 flex w-full items-center justify-center gap-2 bg-white p-2 py-8">
      <Suspense fallback={<div className="rounded-b-lg bg-gray-50 px-3">Laoding...</div>}>
        <UserDataHydrator>
          <UserData />
        </UserDataHydrator>
      </Suspense>
      <ThemeSwitcher />
      <LocaleSwitcher />
      <RevalidatorButton tag="test" />

      <UpdateButton tag="test" />
      <div className="flex items-center gap-2">
        <span>component</span>
        <RevalidatorButton tag="component" />

        <UpdateButton tag="component" />
      </div>
      <div className="flex items-center gap-2">
        <span>Fetch</span>
        <RevalidatorButton tag="fetch-tag" />

        <UpdateButton tag="fetch-tag" />
      </div>
    </header>
  );
};
