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
    let user;
    if (id) {
      user = await prisma.user.findUnique({
        where: { id: String(id) },
      });
    } else if (accountId) {
      user = await prisma.user.findUnique({
        where: { accountId: String(accountId) },
      });
    }
    res.json(user);
  } else if (req.method === "PUT") {
    const user = await prisma.user.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(user);
  } else if (req.method === "DELETE") {
    const user = await prisma.user.delete({
      where: { id: String(id) },
    });
    res.json(user);
  } else {
    res.status(405).end();
  }
}
