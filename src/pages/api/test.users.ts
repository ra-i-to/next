import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "./prisma";

type UserHandlers = {
  GET: (req: NextRequest) => inferAsyncReturnType<typeof handleGet>;
  POST: (req: NextRequest) => inferAsyncReturnType<typeof handlePost>;
  PUT: (req: NextRequest) => inferAsyncReturnType<typeof handlePut>;
  DELETE: (req: NextRequest) => inferAsyncReturnType<typeof handleDelete>;
};

export default async function handler(req, res) {
  try {
    const data = await req.body;
    const user = await getUser(data.userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUser(accountId: string) {
  const userInfo = await prisma.user.findFirst({
    where: {
      accountId: accountId,
    },
  });
  console.log(userInfo);
  return userInfo;
}

async function createUser(
  accountId: string,
  name?: string,
  birth?: Date,
  profile?: string
) {
  return await prisma.user.create({
    data: {
      accountId,
      name,
      birth,
      profile,
    },
  });
}
