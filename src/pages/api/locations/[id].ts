import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const location = await prisma.location.findUnique({
      where: { id: String(id) },
    });
    res.json(location);
  } else if (req.method === "PUT") {
    const location = await prisma.location.update({
      where: { id: String(id) },
      data: req.body,
    });
    res.json(location);
  } else if (req.method === "DELETE") {
    const location = await prisma.location.delete({
      where: { id: String(id) },
    });
    res.json(location);
  } else {
    res.status(405).end();
  }
}
