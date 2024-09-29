import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { CounterForm } from '@/components/CounterForm';
import { CurrentCount } from '@/components/CurrentCount';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Counter',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Counter = () => {
  const t = useTranslations('Counter');

  return (
    <>
      <CounterForm />

      <div className="mt-3">
        <Suspense fallback={<p>{t('loading_counter')}</p>}>
          <CurrentCount />
        </Suspense>
      </div>
    </>
  );
};

export const dynamic = 'force-dynamic';

export default Counter;
