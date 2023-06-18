import { create } from 'zustand';

interface SetupBusinessStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSetupBusiness = create<SetupBusinessStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSetupBusiness;
