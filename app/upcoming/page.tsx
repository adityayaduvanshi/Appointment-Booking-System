import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '../ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';
import UpcomingClient from './UpcomingClient';

const Upcoming = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Bookings"
          subtitle="Looks like you havent reserved any service."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UpcomingClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Upcoming;
