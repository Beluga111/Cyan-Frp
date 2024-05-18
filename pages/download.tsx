import Layout from '@components/Layout';
import Message from "@components/Message";
import { NoSsr } from '@mui/base';
import { Button, ButtonGroup, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function DownloadPage() {
    const sourceUrls = [
        {
            link: '#',
            name: '(国内)追光极速直链(敬请期待)',
        },
        {
            link: 'https://海外接口.insky.top/翡翠/Cyan-Frp/',
            name: '(海外)方舟稳定直链',
        }
    ];

    const files = [
        {
            name: '青缘.视窗amd64',
            architecture: 'amd64',
            system: 'Windows',
            type: 'CLI',
            description: 'Windows CLI 客户端',
            link: 'CyanEdge_windows_amd64/cyan_map_engine',
        },

        {
            name: '青缘.企鹅amd64',
            architecture: 'amd64',
            system: 'Linux',
            type: 'CLI',
            description: 'Linux CLI 客户端',
            link: 'CyanEdge_linux_amd64/cyan_map_engine',
        },
        {
            name: '青缘.苹果amd64',
            architecture: 'amd64',
            system: 'Darwin',
            type: 'CLI',
            description: 'MacOS CLI 客户端',
            link: 'CyanEdge_darwin_amd64/cyan_map_engine',
        },
        {
            name: '青缘.企鹅arm64',
            architecture: 'arm64',
            system: 'Linux',
            type: 'CLI',
            description: 'Linux CLI 客户端',
            link: 'CyanEdge_linux_arm64/cyan_map_engine',
        },
        {
            name: '青缘.苹果arm64',
            architecture: 'arm64',
            system: 'Darwin',
            type: 'CLI',
            description: 'MacOS CLI 客户端',
            link: 'CyanEdge_darwin_arm64/cyan_map_engine', 
        },
        {
            name: '青缘.企鹅arm32',
            architecture: 'arm32',
            system: 'Linux',
            type: 'CLI',
            description: 'Linux CLI 客户端',
            link: 'CyanEdge_linux_arm32/cyan_map_engine',
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
                                <MenuItem value="Darwin">MacOS</MenuItem>
                                {/* 其他系统选项 */}
                            </TextField>
                            <TextField
                                select
                                label="架构"
                                value={selectedArchitecture}
                                onChange={(e) => setSelectedArchitecture(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="amd64">64位AMD</MenuItem>
                                <MenuItem value="arm64">64位ARM</MenuItem>
                                <MenuItem value="arm32">32位ARM</MenuItem>
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
