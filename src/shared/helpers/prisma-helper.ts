import { Prisma } from '@prisma/client';

enum ERRORS_TRANSLATES {
  'P2002' = 'There is a unique constraint violation',
  'P2003' = 'Key invalid',
}

const cathPrismaClient = (e) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const message = ERRORS_TRANSLATES[e.code] || e.message;

    return {
      statusCode: 400,
      error: e.code,
      message,
      meta: e.meta,
    };
  }
  throw e;
};

export const prismaHelper = {
  cathPrismaClient,
};
