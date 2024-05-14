import Layout from '@components/Layout';
import Message from "@components/Message";
import { NoSsr } from '@mui/base';
import { Button, ButtonGroup, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function DownloadPage() {
    const sourceUrls = [
        {
            link: 'https://追光.丹青.cn/dloadlink/',
            name: '(国内)追光极速直链',
        }
        {
            link: 'https://方舟.丹青.cn/dloadlink/',
            name: '(海外)方舟稳定直链',
        }
    ];

    const files = [
        {
            name: '青缘.湘鲸(推荐)',
            architecture: 'Docker Container',
            system: '全系统',
            type: 'DOCKER',
            description: 'Docker 一键脚本',
            link: 'Frp_d',
        },
        {
            name: '青缘.视窗',
            architecture: '架构自适应',
            system: 'Windows',
            type: 'CLI',
            description: 'Windows CLI 一键脚本',
            link: 'Frp_w',
        },

        {
            name: '青缘.企鹅',
            architecture: '架构自适应',
            system: 'Linux',
            type: 'CLI',
            description: 'Linux CLI 一键脚本',
            link: 'Frp_l',
        }
    ];
    const [selectedSource, setSelectedSource] = useState(sourceUrls[0].link);
    const [selectedLauncher, setSelectedLauncher] = useState('');
    const [selectedSystem, setSelectedSystem] = useState('');
    const [selectedArchitecture, setSelectedArchitecture] = useState('');


    const handleCopyLink = (link: string) => {
        navigator.clipboard.writeText(link).then(() => {
            Message.success({content: "复制成功!", duration: 1000})
        }, (err) => {
            console.error('Async: Could not copy text: ', err);
        });
    };

    const filteredFiles = files.filter((file) => {
        if (!selectedSystem || file.system === selectedSystem) {
            if (!selectedArchitecture || file.architecture === selectedArchitecture) {
                if (!selectedLauncher || file.type === selectedLauncher) {
                    return true;
                }
            }
        }
        return false;
    });

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                下载中心
                            </Typography>
                            <TextField
                                select
                                label="下载源"
                                value={selectedSource}
                                onChange={(e) => setSelectedSource(e.target.value)}
                                fullWidth
                                sx={{marginBottom: '1rem'}}
                            >
                                {sourceUrls.map((source, index) => (
                                    <MenuItem key={index} value={source.link}>
                                        {source.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="启动器类型"
                                value={selectedLauncher}
                                onChange={(e) => setSelectedLauncher(e.target.value)}
                                fullWidth
                                sx={{marginBottom: '1rem'}}
                            >
                                <MenuItem value="DOCKER">码头工人</MenuItem>
                                <MenuItem value="CLI">控制台</MenuItem>
                                {/* 其他启动器类型选项 */}
                            </TextField>
                            <TextField
                                select
                                label="系统"
                                value={selectedSystem}
                                onChange={(e) => setSelectedSystem(e.target.value)}
                                fullWidth
                                sx={{marginBottom: '1rem'}}
                            >
                                <MenuItem value="Windows">Windows</MenuItem>
                                <MenuItem value="Linux">Linux</MenuItem>
                                {/* 其他系统选项 */}
                            </TextField>
                            <TextField
                                select
                                label="架构"
                                value={selectedArchitecture}
                                onChange={(e) => setSelectedArchitecture(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="架构自适应">自适应</MenuItem>
                                <MenuItem value="Docker container">码头.容器</MenuItem>
                                {/* 其他架构选项 */}
                            </TextField>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                可用文件列表
                            </Typography>
                            <NoSsr>
                                {filteredFiles.map((file, index) => (
                                    <Card elevation={3} key={index} sx={{marginBottom: '1rem'}}>
                                        <CardContent>
                                            <Typography variant="subtitle1">{file.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                系统架构: {file.architecture}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                系统名称: {file.system}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                启动器类型: {file.type}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                描述: {file.description}
                                            </Typography>
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Button
                                                    href={selectedSource + file.link}
                                                    variant="contained"
                                                    sx={{marginTop: '1rem'}}
                                                >
                                                    下载
                                                </Button>
                                                <Button
                                                    onClick={() => handleCopyLink(selectedSource + file.link)}
                                                    variant="contained"
                                                    sx={{marginTop: '1rem'}}
                                                >
                                                    复制链接
                                                </Button>
                                            </ButtonGroup>
                                        </CardContent>
                                    </Card>
                                ))}
                            </NoSsr>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
};
