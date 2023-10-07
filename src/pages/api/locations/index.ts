import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } else if (req.method === "POST") {
    const location = await prisma.location.create({
      data: req.body,
    });
    res.json(location);
  } else {
    res.status(405).end();
  }
}
