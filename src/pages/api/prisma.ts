import { PrismaClient } from "@prisma/client";

// グローバルにPrismaのインスタンスを生成する
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // 開発環境ではグローバル変数を使ってPrismaのインスタンスを再利用する
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;