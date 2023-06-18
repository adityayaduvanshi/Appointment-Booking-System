'use client';

import { SafeUser } from '../types';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavourite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 cursor-pointer transition"
    >
      <AiOutlineHeart
        size={28}
        className=" absolute fill-white -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={28}
        className={hasFavorited ? 'fill-rose-500' : ' fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
