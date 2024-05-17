import CircularProgress from '@components/CircularProgress';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import apiClient from '@src/http/http';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Sponsor = {
    id: number;
    email: string;
    name: string;
    thing: string;
    comment: string;
};

interface Setting {
    ads: {
        ad4: {
            title: string;
            content: string;
        };
    };
}

const SponsorPage = () => {
    const [sponsors, setSponsors] = useState<Sponsor[] | null>(null);
    const [setting, setSetting] = useState<Setting | null>(null);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await apiClient.get('/v4/public/info/sponsor');
                const responseSetting = await apiClient.get<Setting>('/v4/public/info/setting');
                setSetting(responseSetting.data);
                setSponsors(response.data);
            } catch (error) {
                console.error('Error fetching sponsors:', error);
            }
        };

        fetchSponsors().then();
    }, []);
    if (!sponsors || !setting) {
        // handle loading state here
        return (
                <Container maxWidth="lg">
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress/>
                    </Box>
                </Container>
        );
    }
    return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card elevation={3} style={{padding: '20px', height: '100%', marginBottom: '20px'}}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                赞助我们
                            </Typography>
                            <Grid container alignItems="center" marginBottom="10px">
                                <Grid item xs={12} sm={6}>
                                    <Image src="/assets/alipay.jpg" alt="支付宝" width={250} height={375}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Image src="/assets/wechat.jpg" alt="微信支付" width={250} height={375}/>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" gutterBottom>我是一个中学生，自费购买了海外大带宽服务器作为内网穿透节点，但是因为经费紧缺(学生党懂得都懂)，没多余的流动资金部署国内节点，我需要你们的帮助！</Typography>
                            <Typography variant="body1" gutterBottom>不过请放心，有几个节点会一直启用直至Cyan-Frp停止运营</Typography>
                            <Typography variant="body1" gutterBottom>常驻机：北美A区1机，北美A区2机(即将上线)，北美B区1机(即将上线)，南美A区1机(即将上线)，南美B区2机(即将上线)</Typography>
                            <Typography variant="body1" gutterBottom>不要忘记备注您的用户名、邮箱和留言哦！我将在7日内在给您酌情充值等量时间的赞助FVIP</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card elevation={3} style={{padding: '20px', height: '100%', marginBottom: '20px'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">{setting.ads.ad4.title}</Typography>
                            <br/>
                            <Markdown remarkPlugins={[remarkGfm]}>{setting.ads.ad4.content}</Markdown>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={24}>
                    <Card elevation={3} style={{padding: '20px', marginBottom: '20px'}}>
                        <Typography variant="h5" gutterBottom>
                            赞助者列表
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>姓名</TableCell>
                                        <TableCell>邮箱</TableCell>
                                        <TableCell>赞助事项</TableCell>
                                        <TableCell>留言</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sponsors ? sponsors.map((sponsor) => (
                                        <TableRow key={sponsor.id}>
                                            <TableCell>{sponsor.name}</TableCell>
                                            <TableCell>{sponsor.email}</TableCell>
                                            <TableCell>{sponsor.thing}</TableCell>
                                            <TableCell>{sponsor.comment}</TableCell>
                                        </TableRow>
                                    )) : null}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
    );
};

export default SponsorPage;
