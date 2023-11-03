import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import prisma from "../prisma";

// multer設定
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
  }),
});

const router = createRouter();

router.use(upload.single("file"));

router.post(async (req, res) => {
  try {
    const { accountId, metadata } = JSON.parse(req.body.data);
    const fileUrl = req.file.path.replace("public", "");

    const post = await prisma.post.create({
      data: {
        accountId: accountId,
      },
    });

    const photo = await prisma.photo.create({
      data: {
        postId: post.id,
        url: fileUrl,
        ...metadata,
      },
    });

    console.log(post, photo);

    res.status(201).json({
      post: post,
      photo: photo,
    });
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler();
