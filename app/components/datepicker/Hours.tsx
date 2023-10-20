'use client';

import { format, isSameMinute, parseISO } from 'date-fns';
// import { CheckCircle2 } from 'lucide-react';
import React, { memo, useMemo, useState } from 'react';
import { cn } from './libs/utils';

interface AvailableHoursProps {
  freeTimes: Date[];
  onTimeSelect: (time: Date | undefined) => void;
}

// eslint-disable-next-line react/display-name
const AvailableHours: React.FC<AvailableHoursProps> = memo(
  ({ freeTimes, onTimeSelect }) => {
    const [selectedTime, setSelectedTime] = useState<Date>();

    const handleTimeClick = (time: Date) => {
      setSelectedTime(time);
      onTimeSelect(time); 
    };

    return (
      <div className="flex flex-col items-center gap-2 mt-4 p-4">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6  text-md gap-2">
          {freeTimes.map((hour, hourIdx) => (
            <div key={hourIdx}>
              <button
                type="button"
                className={cn(
                  'bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]',
                  selectedTime &&
                    isSameMinute(selectedTime, hour) &&
                    'bg-green-400 text-gray-800'
                )}
                onClick={() => handleTimeClick(hour)}
              >
                {format(hour, 'HH:mm')}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default AvailableHours;
