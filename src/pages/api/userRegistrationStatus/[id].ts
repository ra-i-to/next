import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, accountId } = req.query;
  console.log(req.query);
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
    }
    res.json(userRegistrationStatus);
  } else if (req.method === "PUT") {
    const userRegistrationStatus = await prisma.userRegistrationStatus.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(userRegistrationStatus);
  } else if (req.method === "DELETE") {
    const userRegistrationStatus = await prisma.userRegistrationStatus.delete({
      where: { id: String(id) },
    });
    res.json(userRegistrationStatus);
  } else {
    res.status(405).end();
  }
}
