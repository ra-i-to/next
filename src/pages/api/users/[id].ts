import prisma from "../prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: accountId } = req.query;
  const { user: atuth0User } = await getSession(req, res);

  if (req.method === "GET") {
    let user;
    if (accountId) {
      user = await prisma.user.findUnique({
        where: { accountId: String(accountId) },
      });
    }
    res.json(user);
  } else if (req.method === "PUT") {
    if (!atuth0User.sub || atuth0User.sub !== accountId) {
      return res
        .status(403)
        .json({ error: "You can only access your own data." });
    }

    let user;
    if (accountId) {
      user = await prisma.user.update({
        where: { accountId: String(accountId) },
        data: req.body,
      });
    }
    res.json(user);
  } else if (req.method === "DELETE") {
    if (!atuth0User.sub || atuth0User.sub !== accountId) {
      return res
        .status(403)
        .json({ error: "You can only access your own data." });
    }

    let user;
    if (accountId) {
      user = await prisma.user.delete({
        where: { accountId: String(accountId) },
      });
    }
    res.json(user);
  } else {
    res.status(405).end();
  }
};

export default withApiAuthRequired(handle);
