'use client';

import { SafeUser } from '@/app/types';
import Image from 'next/image';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';

import { signOut } from 'next-auth/react';
import Avatar from '../Avatar';
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
        {/* <div className="hidden sm:flex  flex-row  justify-between items-center gap-x-3">
          {navBarItems.map((item) => (
            <Link className={`hover:text-white`} key={item.id} href={item.link}>
              {item.name}
            </Link>
          ))}
          <button onClick={onBusiness}>Bussiness Login</button>
          {currentUser ? (
            <>
              <AiOutlineHeart size={25} />
              <AiOutlineShoppingCart size={25} />
              <Avatar src={currentUser?.image} />
              <div className="cursor-pointer" onClick={() => signOut()}>
                Sign Out
              </div>
            </>
          ) : (
            <>
              <button className="cursor-pointer" onClick={loginModal.onOpen}>
                Login
              </button>
              <button
                className="bg-[#EA8933] rounded-sm text-white py-[6px] px-[12px] outline-none border-none
"
                onClick={registerModal.onOpen}
              >
                Sign Up
              </button>
            </>
          )}
        </div> */}
        <UserMenu currentUser={currentUser} />
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
