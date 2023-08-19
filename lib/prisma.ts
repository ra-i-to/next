// PrismaClientをインポート
import { PrismaClient } from '@prisma/client';

// PrismaClientインスタンスを初期化
let prisma: PrismaClient;

// NODE_ENVが'production'かを確認
if (process.env.NODE_ENV === 'production') {
  // プロダクション環境の場合、新しいPrismaClientインスタンス作成
//   prisma = new PrismaClient();
} else {
  // 開発環境の場合、グローバルなPrismaClientインスタンスが存在するかを確認
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;