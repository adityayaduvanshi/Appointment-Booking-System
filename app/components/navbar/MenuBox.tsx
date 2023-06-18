'use client';

interface MenuBoxProps {
  onClick: () => void;
  label: string;
}

const MenuBox: React.FC<MenuBoxProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      "
    >
      {label}
    </div>
  );
};

export default MenuBox;
