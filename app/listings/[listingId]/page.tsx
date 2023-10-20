import ClientOnly from '@/app/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingbyID from '@/app/actions/getListingbyID';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingbyID(params);
  const currentUser = await getCurrentUser();
  const reserved = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        //  reservations={reserved}
        reserved={reserved}
      />
    </ClientOnly>
  );
};

export default ListingPage;
