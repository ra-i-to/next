import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = await res.json();
  const user = await getUser(userId);
  return res.status(200).json({ user: user });
}

async function getUser(userId: String) {
  const userInfo = prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });
  return userInfo;
}
