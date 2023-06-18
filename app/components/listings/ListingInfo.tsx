'use client';

import dynamic from 'next/dynamic';
import useCountries from '@/app/hooks/useCountries';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import { SafeUser } from '@/app/types';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  featureOne?: string | null;
  featureTwo?: string | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  locationValue,
  featureOne,
  featureTwo,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
        text-xl 
        font-semibold 
        flex 
        flex-row 
        items-center
        gap-2
      "
        >
          <div>Owner {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{featureOne}</div>
          <div>{featureTwo}</div>
        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
