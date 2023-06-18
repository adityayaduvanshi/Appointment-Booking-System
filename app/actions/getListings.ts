import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
  startDate?: string;
  startTime?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { category, userId, startDate, locationValue } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: startDate },
              },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
