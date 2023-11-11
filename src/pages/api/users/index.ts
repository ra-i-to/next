import prisma from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } else if (req.method === "PUT") {
    const { id,userData } = req.body;
    if (!id) {
      res.status(400).json({ error: 'Missing user ID' });
      return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: userData,
    });
    res.json(updatedUser);

  } else {
    res.status(405).end();
  }
}

export default withApiAuthRequired(handle);
