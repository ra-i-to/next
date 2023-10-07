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
    let user;
    if (id) {
      user = await prisma.user.findUnique({
        where: { id: String(id) },
      });
    } else if (accountId) {
      user = await prisma.user.findUnique({
        where: { accountId: String(accountId) },
      });
    } else if (!id && !accountId) {
      // const users = await prisma.user.findMany();
      // res.json(users);
    }
    res.json(user);
  } else if (req.method === "POST") {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } else {
    res.status(405).end();
  }
}
