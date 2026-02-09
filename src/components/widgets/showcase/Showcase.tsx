

import UpdateNameForm from '@/components/layouts/header/UpdateNameForm';
import UserData from '@/components/layouts/header/UserData';
import { getTranslations } from 'next-intl/server';
import { connection } from 'next/server';

export async function Showcase() {
  await connection()
  const t = await getTranslations("Showcase");

  return (
    <section className="container w-full max-w-5xl py-16">
      <div className='text-center font-semibold mx-auto'>
        {new Date().getSeconds()}
      </div>
      <div className="mb-6 space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <UpdateNameForm />
      <UserData />
    </section>
  );
}
