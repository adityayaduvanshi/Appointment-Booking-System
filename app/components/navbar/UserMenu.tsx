'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';

import MenuBox from './MenuBox';
import Avatar from '../Avatar';
import useSetupBusiness from '@/app/hooks/useSetupBusiness';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const businessModal = useSetupBusiness();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    businessModal.onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginModal, businessModal, currentUser]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => router.push('/')}
          className="cursor-pointer text-sm font-semibold hover:text-white"
        >
          Home
        </div>
        <div
          onClick={() => router.push('/about')}
          className="cursor-pointer text-sm font-semibold hover:text-white"
        >
          About
        </div>
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Your Bussiness
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={divRef}
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuBox
                  label="Upcoming"
                  onClick={() => router.push('/upcoming')}
                />
                <MenuBox
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuBox
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuBox
                  label="My business"
                  onClick={() => router.push('/business')}
                />
                <MenuBox
                  label="Create your business"
                  onClick={businessModal.onOpen}
                />
                <hr />
                <MenuBox label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuBox label="Login" onClick={loginModal.onOpen} />
                <MenuBox label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
