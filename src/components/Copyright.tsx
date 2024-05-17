import { Link as MuiLink, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://丹青.cn/">
      Dan_Qing
      </MuiLink>{' '}
      2021-{new Date().getFullYear()}.
    <br />
    <MuiLink color="inherit" href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=1E5NqsJHntGR5DWTs1ebzZ98oJB-E79L&authKey=s0IkH6FiyQ19QV0FDJue1SAzkk%2BJNNko2hQYQSTIxKO2%2BVKNU%2Bj5AM%2FtbYBDLxMJ&noverify=0&group_code=834034070">
    Cyan-Frp交流群
      </MuiLink>
      <br />
              <MuiLink color="inherit" href="https://beian.miit.gov.cn">海外服务器，无备案，域名已实名</MuiLink>
              <br />
              下一站，银河
    </Typography>
  );
}
