'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { GiMedicalPack } from 'react-icons/gi';
import { IoIosFitness } from 'react-icons/io';
import { AiOutlineDown } from 'react-icons/ai';

import { BiHappyHeartEyes } from 'react-icons/bi';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { BsFillBookFill, BsFillHouseAddFill } from 'react-icons/bs';

import { menu } from './menu';
import MenuItems from './MenuItem';

export const categories = [
  {
    label: 'Personal Trainers',
    icon: IoIosFitness,
    description: 'Get health and fitness checkup',
  },
  {
    label: 'Professional Therapy',
    icon: GiMedicalPack,
    description: 'Get Medical advice from professionals',
  },
  {
    label: 'Gym Membership',
    icon: BiHappyHeartEyes,
    description: 'Get beauty treatments',
  },
  {
    label: 'Club Membership',
    icon: BsFillHouseAddFill,
    description: 'Household',
  },
  {
    label: 'Zumba',
    icon: BsFillBookFill,
    description: 'Join classes online/offline',
  },
  { label: 'Gp s', icon: RiPsychotherapyFill, description: 'Therapy' },
  { label: 'Dentists', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'Dental Surgery',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  {
    label: 'Medical Specialist',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  { label: 'Pet Grooming', icon: RiPsychotherapyFill, description: 'Therapy' },
  { label: 'Pet Sitting', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'Handyman Service',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  { label: 'Gardening', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'House Painting',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  {
    label: 'Repair Service',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },

  { label: 'Movers', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'Cleaing Service',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  {
    label: 'General Classes',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  {
    label: 'Tutoring Coaching',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  {
    label: 'Baking Classes',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  { label: 'Music Classes', icon: RiPsychotherapyFill, description: 'Therapy' },
  { label: 'Tution', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'Coaching Classes',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  { label: 'Hair Salon', icon: RiPsychotherapyFill, description: 'Therapy' },
  { label: 'Nail Salon', icon: RiPsychotherapyFill, description: 'Therapy' },
  {
    label: 'Massage Service',
    icon: RiPsychotherapyFill,
    description: 'Therapy',
  },
  { label: 'Spa', icon: RiPsychotherapyFill, description: 'Therapy' },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="w-full bg-[#72959A] sm:block hidden">
      <div className="flex w-full items-center justify-center gap-20  list-none py-4">
        {menu.map((men, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={men}
              key={index}
              depthLevel={depthLevel}
              selected={category === men.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
