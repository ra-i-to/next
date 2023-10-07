import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, accountId } = req.query;
  if (req.method === "GET") {
    let userRegistrationStatus;
    if (id) {
      userRegistrationStatus = await prisma.userRegistrationStatus.findUnique({
        where: { id: String(id) },
      });
    } else if (accountId) {
      userRegistrationStatus = await prisma.userRegistrationStatus.findUnique({
        where: { accountId: String(accountId) },
      });
    } else if (!id && !accountId) {
      // const userRegistrationStatuss = await prisma.userRegistrationStatus.findMany();
      // res.json(userRegistrationStatuss);
    }
    res.json(userRegistrationStatus);
  } else if (req.method === "POST") {
    const userRegistrationStatus = await prisma.userRegistrationStatus.create({
      data: req.body,
    });
    res.json(userRegistrationStatus);
  } else {
    res.status(405).end();
  }
}
