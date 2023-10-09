import Link from "next/link";
import { NextPageContext } from "next";

type ErrorProps = {
  statusCode: number | null;
};

const ErrorPage = ({ statusCode }: ErrorProps) => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>エラーが発生しました</h1>

    {statusCode
      ? `サーバーエラーが発生しました。エラーコード: ${statusCode}`
      : "クライアントエラーが発生しました。ページの読み込みに失敗しました。"}

    <div style={{ marginTop: "20px" }}>
      <Link href="/">
        <a>ホームページに戻る</a>
      </Link>
    </div>
  </div>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
