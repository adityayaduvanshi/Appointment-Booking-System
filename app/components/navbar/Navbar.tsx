'use client';

import { SafeUser } from '@/app/types';
import Image from 'next/image';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Categories from './Categories';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useSetupBusiness from '@/app/hooks/useSetupBusiness';
import UserMenu from './UserMenu';
import Search from './Search';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const bussinessModal = useSetupBusiness();
  const loginModal = useLoginModal();
  const navBarItems = [
    { id: 0, name: 'Home', link: '/' },
    { id: 1, name: 'About', link: '/about' },
    { id: 2, name: 'Contact', link: '/contact' },
  ];

  const onBusiness = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    bussinessModal.onOpen();
  }, [currentUser, loginModal, bussinessModal]);

  return (
    <div className="w-full z-10 fixed border-none  outline-none  text-gray-400 shadow-sm ">
      <div className="flex flex-row justify-between items-center py-3 px-4 sm:px-20 bg-[#2C2C2C]">
        <div className="cursor-pointer" onClick={() => router.push('/')}>
          <Image
            onClick={() => router.push('/')}
            className="hidden md:block cursor-pointer"
            src="/images/companylogo.png"
            height="200"
            width="200"
            alt="Logo"
          />
        </div>
        <div>
          <Search />
        </div>

        <UserMenu currentUser={currentUser} />
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
