'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/app/hooks/useSearchModal';

import Modal from './Modal';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import Heading from '../Heading';
import Input from '../inputs/Input';

enum STEPS {
  LOCATION = 0,
  // CATEGORY = 1,
  // INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const params = useSearchParams();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [category, setCategory] = useState('');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.LOCATION) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      // category,
    };
    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, location, router, searchModal, onNext, params]);

  const actionLabel = useMemo(() => {
    // if (step === STEPS.LOCATION) {
    //   return 'Search';
    // }
    return 'Search';
  }, []);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find services in your location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      actionLabel={actionLabel}
      body={bodyContent}
      // secondaryActionLabel={secondaryActionLabel}
      // secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
