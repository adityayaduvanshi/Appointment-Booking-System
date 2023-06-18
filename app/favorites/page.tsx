import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '../ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavourites';
import FavoritesClient from './FavouritesClient';

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
