import prisma from '@/app/libs/prismadb';

export interface IlistingsParams {
  userId?: string;
  startDate?: string;
  category?: string;
  startTime?: string;
  locationValue?: string;
}

export default async function getListings(params: IlistingsParams) {
  try {
    const {
      userId,
      startTime,
      locationValue,
      startDate,

      category,
    } = params;

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

    // if (startDate) {
    //   query.NOT = {
    //     reservations: {
    //       some: {
    //         OR: [
    //           {
    //             startDate: { lte: startDate },
    //           },
    //           {
    //             startDate: { lte: startDate },
    //           },
    //         ],
    //       },
    //     },
    //   };
    // }

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
