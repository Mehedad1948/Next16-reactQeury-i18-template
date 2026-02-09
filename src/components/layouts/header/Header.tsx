import { LocaleSwitcher, ThemeSwitcher } from "@/widgets";
import UserData from './UserData';
import { Suspense } from 'react';
import UserDataHydrator from './userData-hydrator';

export const Header = () => {
  return (
    <header className="flex fixed w-full top-0 p-2 bg-white items-center justify-center gap-2 py-8">
      <Suspense fallback={<div className=' px-3 bg-gray-50 rounded-b-lg'>Laoding...</div>}>
        <UserDataHydrator>
          <UserData />
        </UserDataHydrator>
      </Suspense>
      <ThemeSwitcher />
      <LocaleSwitcher />
    </header>
  );
};
