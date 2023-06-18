import React from 'react';
import MenuItem from './MenuItem';

interface Submenu {
  title: string;
  url?: string;
  submenu?: Submenu[];
}

interface DropdownProps {
  submenus: Submenu[];
  dropdown: boolean;
  depthLevel: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  submenus,
  dropdown,
  depthLevel,
}) => {
  const updatedDepthLevel = depthLevel + 1;
  const dropdownClass = updatedDepthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul
      className={` shadow-lg dropdown hidden bg-white border-none rounded-md overflow-hidden  list-none min-w-[12rem] z-20 text-left absolute left-0  top-[1.6rem] text-normal   ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}
    >
      {submenus.map((submenu, index) => (
        <MenuItem items={submenu} key={index} depthLevel={updatedDepthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
