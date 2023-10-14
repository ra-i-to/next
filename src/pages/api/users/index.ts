import prisma from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } else {
    res.status(405).end();
  }
};

export default withApiAuthRequired(handle);
