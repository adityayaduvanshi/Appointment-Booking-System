'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
  GiMedicalPack,
  GiCupcake,
  GiGardeningShears,
  GiHairStrands,
  GiMedicalPackAlt,
  GiSittingDog,
  GiAutoRepair,
} from 'react-icons/gi';
import { IoIosFitness } from 'react-icons/io';
import { AiOutlineFormatPainter } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { GrYoga } from 'react-icons/gr';
import {
  MdCleaningServices,
  MdRememberMe,
  MdOutlineHandyman,
  MdOutlineMan3,
  MdOutlineMusicNote,
} from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { TbDental, TbMassage, TbHandThreeFingers, TbDog } from 'react-icons/tb';
import { RiPsychotherapyFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { FaBookReader } from 'react-icons/fa';

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
    icon: RiPsychotherapyFill,
    description: 'Professional Therapy',
  },
  {
    label: 'Gym Membership',
    icon: CgGym,
    description: 'Gym Membership',
  },
  {
    label: 'Club Membership',
    icon: MdRememberMe,
    description: 'Club Membership',
  },
  {
    label: 'Zumba',
    icon: GrYoga,
    description: 'Zumba',
  },
  { label: 'Gp s', icon: RiPsychotherapyFill, description: 'Therapy' },
  { label: 'Dentists', icon: TbDental, description: 'Dentists' },
  {
    label: 'Dental Surgery',
    icon: TbDental,
    description: 'Dental Surgery',
  },
  {
    label: 'Medical Specialist',
    icon: GiMedicalPackAlt,
    description: 'Medical Specialist',
  },
  { label: 'Pet Grooming', icon: TbDog, description: 'Pet grooming' },
  { label: 'Pet Sitting', icon: GiSittingDog, description: 'Pet sitting' },
  {
    label: 'Handyman Service',
    icon: MdOutlineHandyman,
    description: 'Therapy',
  },
  { label: 'Gardening', icon: GiGardeningShears, description: 'Gardening' },
  {
    label: 'House Painting',
    icon: AiOutlineFormatPainter,
    description: 'House Painting',
  },
  {
    label: 'Repair Service',
    icon: GiAutoRepair,
    description: 'Repair',
  },

  { label: 'Movers', icon: MdOutlineMan3, description: 'Movers' },
  {
    label: 'Cleaing Service',
    icon: MdCleaningServices,
    description: 'Cleaing Service',
  },
  {
    label: 'General Classes',
    icon: BsFillBookFill,
    description: 'General Classes',
  },
  {
    label: 'Tutoring Coaching',
    icon: BsFillBookFill,
    description: 'Tutoring Coaching',
  },
  {
    label: 'Baking Classes',
    icon: GiCupcake,
    description: 'Therapy',
  },
  {
    label: 'Coaching Classes',
    icon: SiGoogleclassroom,
    description: 'Coaching Class',
  },
  { label: 'Music Classes', icon: MdOutlineMusicNote, description: 'Music' },
  { label: 'Tution', icon: FaBookReader, description: 'Tution' },
  { label: 'Hair Salon', icon: GiHairStrands, description: 'Hair Salon' },
  { label: 'Nail Salon', icon: TbHandThreeFingers, description: 'Nail' },
  {
    label: 'Massage Service',
    icon: TbMassage,
    description: 'Massage Service',
  },
  { label: 'Spa', icon: TbMassage, description: 'Spa' },
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
