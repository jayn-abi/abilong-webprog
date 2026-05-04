import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CustomButton from '../components/Button';
import { useEffect } from 'react';

const drawerWidth = 240;
const miniWidth = 56;

const NAV_ITEMS = [
    { label: 'Dashboard', title: 'Dashboard', to: '/dashboard',         icon: DashboardIcon },
    { label: 'Reports',   title: 'Reports',   to: '/dashboard/reports', icon: AssessmentIcon },
    { label: 'Users',     title: 'Users',     to: '/dashboard/users',   icon: PeopleIcon },
];

/* ── Drawer animations ── */
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `${miniWidth}px`,
});

/* ── Styled components ── */
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(15, 15, 26, 0.07)',
    boxShadow: '0 1px 20px rgba(0, 0, 0, 0.05)',
    color: '#0f0f1a',
    marginLeft: `${miniWidth}px`,
    width: `calc(100% - ${miniWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
            ...openedMixin(theme),
            backgroundColor: '#ffffff',
            borderRight: '1px solid rgba(15, 15, 26, 0.07)',
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)',
        },
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
            ...closedMixin(theme),
            backgroundColor: '#ffffff',
            borderRight: '1px solid rgba(15, 15, 26, 0.07)',
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)',
        },
    }),
}));

/* ── Component ── */
const DashLayout = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pageTitle = NAV_ITEMS.find((item) => item.to === location.pathname)?.title ?? 'Dashboard';

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* ── Top AppBar ── */}
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {/* Brand */}
                    <Typography
                        component={Link}
                        to="/dashboard"
                        variant="h6"
                        noWrap
                        sx={{
                            textDecoration: 'none',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                        }}
                    >
                        <span className="gradient-text">Dashboard</span>
                    </Typography>

                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CustomButton variant="primary" to="/auth/signin">Logout</CustomButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* ── Side Drawer ── */}
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ justifyContent: open ? 'flex-start' : 'center', gap: 1 }}>
                    <IconButton
                        onClick={() => setOpen((v) => !v)}
                        sx={{ color: '#0f0f1a' }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                    {open && (
                        <Typography
                            component={Link}
                            to="/dashboard"
                            variant="subtitle1"
                            noWrap
                            sx={{
                                textDecoration: 'none',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            <span className="gradient-text">Dashboard</span>
                        </Typography>
                    )}
                </DrawerHeader>

                <Divider sx={{ borderColor: 'rgba(15,15,26,0.06)' }} />

                <List sx={{ px: 1, pt: 1.5 }}>
                    {NAV_ITEMS.map(({ label, to, icon: NavIcon }) => {
                        const active = location.pathname === to;
                        return (
                            <ListItem key={label} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                <ListItemButton
                                    component={Link}
                                    to={to}
                                    selected={active}
                                    sx={{
                                        minHeight: 44,
                                        px: open ? 2 : 1,
                                        justifyContent: open ? 'initial' : 'center',
                                        borderRadius: '0.75rem',
                                        transition: 'all 0.15s ease',
                                        '&.Mui-selected': {
                                            background: 'linear-gradient(135deg, rgba(0,212,255,0.13) 0%, rgba(168,85,247,0.09) 100%)',
                                            color: '#00b8d9',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, rgba(0,212,255,0.20) 0%, rgba(168,85,247,0.14) 100%)',
                                            },
                                            '& .MuiListItemIcon-root': { color: '#00b8d9' },
                                        },
                                        '&:hover:not(.Mui-selected)': {
                                            bgcolor: 'rgba(15, 15, 26, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 2.5 : 0,
                                            justifyContent: 'center',
                                            color: active ? '#00b8d9' : 'rgba(15,15,26,0.42)',
                                            transition: 'color 0.15s ease',
                                        }}
                                    >
                                        <NavIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{
                                            fontWeight: active ? 600 : 500,
                                            fontSize: 13.5,
                                            color: active ? '#00b8d9' : '#0f0f1a',
                                        }}
                                        sx={{ display: open ? 'block' : 'none' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>

           
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    minHeight: '100vh',
                    backgroundColor: '#f5f5fa',
                    color: '#0f0f1a',
                }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashLayout;
