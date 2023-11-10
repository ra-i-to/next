import UserInfoContext from "@/src/contexts/UserInfoContext";
import { UserInfo } from "@/src/model/UserInfo";
import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ExifParser from "exif-parser";
import { useCreatePost } from "@/src/hooks/post/createPost";

type Props = {};

const home: NextPage = (props: Props) => {
  const context = useContext(UserInfoContext);
  const { auth0User, user, loading: contextLoading }: UserInfo = context;
  const [accountId, setAccountId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (contextLoading === false) {
      if (!auth0User || !user) {
        router.push("/api/auth/login");
      }
      const sub = auth0User?.sub;
      if (sub) {
        setAccountId(sub);
      }
    }
  }, [contextLoading]);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [cameraMaker, setCameraMaker] = useState<string>("");
  const [cameraModel, setCameraModel] = useState<string>("");
  const [lensMaker, setLensMaker] = useState("");
  const [lensModel, setLensModel] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [exposureTime, setExposureTime] = useState<string>("");
  const [fNumber, setFNumber] = useState<string>("");
  const [iso, setISO] = useState<string>("");
  const [focalLength, setFocalLength] = useState<string>("");
  const [shotDate, setShotDate] = useState<Date | null>();
  const [shotLocation, setShotLocation] = useState<string>("");

  const { postNewPost } = useCreatePost();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);

      const buffer = await e.target.files[0].arrayBuffer();
      const parser = ExifParser.create(buffer);
      const result = parser.parse();
      console.log(result);
      setCameraMaker(result.tags.Make || "");
      setCameraModel(result.tags.Model || "");
      setLensMaker(result.tags.LensMake || "");
      setLensModel(result.tags.LensModel || "");
      setExposureTime(result.tags.ExposureTime || "");
      setFNumber(result.tags.FNumber || "");
      setISO(result.tags.ISO || "");
      setFocalLength(result.tags.FocalLength || "");
      setShotDate(new Date(result.tags.DateTimeOriginal * 1000) || null);

      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  };

  const handlePost = async () => {
    if (!accountId) return;
    if (!file) return;
    if (!shotDate) {
      setShotDate(null);
    }

    const result = await postNewPost(
      accountId,
      file,
      cameraMaker,
      cameraModel,
      lensMaker,
      lensModel,
      exposureTime,
      fNumber,
      iso,
      focalLength,
      shotDate,
      shotLocation
    );

    console.log(result);

    router.push("/home");
  };

  return (
    <>
      <main>
        <div>
          <h2>Post Create</h2>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            value={fileName}
            onClick={() => document.getElementById("image-input")?.click()}
            readOnly
            placeholder="画像を選択またはドラッグ＆ドロップ"
          />
          <input
            id="image-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="プレビュー"
                style={{ width: "100%", marginBottom: "20px" }}
              />
            )}
          </div>
          <TextField
            label="カメラメーカー"
            fullWidth
            variant="outlined"
            margin="normal"
            value={cameraMaker}
            onChange={(e) => setCameraMaker(e.target.value)}
          />
          <TextField
            label="カメラモデル"
            fullWidth
            variant="outlined"
            margin="normal"
            value={cameraModel}
            onChange={(e) => setCameraModel(e.target.value)}
          />
          <TextField
            label="レンズメーカー"
            fullWidth
            variant="outlined"
            margin="normal"
            value={lensMaker}
            onChange={(e) => setLensMaker(e.target.value)}
          />
          <TextField
            label="レンズモデル"
            fullWidth
            variant="outlined"
            margin="normal"
            value={lensModel}
            onChange={(e) => setLensModel(e.target.value)}
          />

          <TextField
            label="シャッタースピード"
            fullWidth
            variant="outlined"
            margin="normal"
            value={exposureTime}
            onChange={(e) => setExposureTime(e.target.value)}
          />
          <TextField
            label="F値"
            fullWidth
            variant="outlined"
            margin="normal"
            value={fNumber}
            onChange={(e) => setFNumber(e.target.value)}
          />
          <TextField
            label="ISO感度"
            fullWidth
            variant="outlined"
            margin="normal"
            value={iso}
            onChange={(e) => setISO(e.target.value)}
          />
          <TextField
            label="焦点距離"
            fullWidth
            variant="outlined"
            margin="normal"
            value={focalLength}
            onChange={(e) => setFocalLength(e.target.value)}
          />
          <TextField
            label="撮影日時"
            fullWidth
            variant="outlined"
            margin="normal"
            value={shotDate}
            onChange={(e) => setShotDate(e.target.value)}
          />
          <TextField
            label="撮影場所"
            fullWidth
            variant="outlined"
            margin="normal"
            value={shotLocation}
            onChange={(e) => setShotLocation(e.target.value)}
          />

          <Button onClick={handlePost} variant="contained" color="primary">
            投稿
          </Button>
        </div>
      </main>
    </>
  );
};

export default home;
