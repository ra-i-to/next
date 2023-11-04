import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  selectedPost;
  isDialogOpen;
  handleDialogClose;
};

const PostDialog = (props: Props) => {
  return (
    <>
      <Dialog open={props.isDialogOpen} onClose={props.handleDialogClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {props.selectedPost && (
            <Box>
              <img
                src={props.selectedPost.photos[0].url}
                alt=""
                style={{ width: "100%" }}
              />
              {/* 他の投稿情報表示 */}
              <Box>
                {/* 投稿ユーザー情報（ユーザー名、アイコンなど） */}
                <Box></Box>
                {/* 投稿詳細情報 */}
                <Box>
                  {/* <Typography variant="subtitle1" gutterBottom>
                    投稿情報
                  </Typography> */}
                  {/* コメント */}
                  {/* 投稿日時 */}
                  {/* いいね関係情報 */}
                </Box>
                {/* 写真詳細情報 */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    撮影情報
                  </Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>カメラメーカー</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].cameraMaker}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>カメラモデル</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].cameraModel}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>レンズメーカー</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].lensMaker}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>レンズモデル</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].lensModel}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>シャッタースピード</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].exposureTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>F値</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].fNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ISO感度</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].iso}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>焦点距離</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].focalLength}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>撮影日時</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].shotDate}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>撮影場所</TableCell>
                        <TableCell>
                          {props.selectedPost.photos[0].shotLocation}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialog;
