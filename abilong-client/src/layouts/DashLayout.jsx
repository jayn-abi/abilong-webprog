import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
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
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import adminTheme from '../components/admin/adminTheme';
import { useEffect } from 'react';

const drawerWidth = 240;
const miniWidth = 56;

const ALL_NAV_ITEMS = [
    { group: 'Overview',  label: 'Dashboard',      title: 'Dashboard',      to: '/dashboard',                icon: DashboardIcon,                types: ['admin', 'editor'] },
    { group: 'Portfolio', label: 'Site content',   title: 'Site content',   to: '/dashboard/content',        icon: EditNoteOutlinedIcon,         types: ['admin'] },
    { group: 'Portfolio', label: 'Projects',       title: 'Projects',       to: '/dashboard/projects',       icon: WorkOutlineIcon,              types: ['admin'] },
    { group: 'Portfolio', label: 'Certifications', title: 'Certifications', to: '/dashboard/certifications', icon: WorkspacePremiumOutlinedIcon, types: ['admin'] },
    { group: 'Manage',    label: 'Articles',       title: 'Articles',       to: '/dashboard/articles',       icon: ArticleOutlinedIcon,          types: ['admin', 'editor'] },
    { group: 'Manage',    label: 'Reports',        title: 'Reports',        to: '/dashboard/reports',        icon: AssessmentIcon,               types: ['admin', 'editor'] },
    { group: 'Manage',    label: 'Users',          title: 'Users',          to: '/dashboard/users',          icon: PeopleIcon,                   types: ['admin'] },
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
    const navigate = useNavigate();
    const userType  = localStorage.getItem('type') ?? '';
    const NAV_ITEMS = ALL_NAV_ITEMS.filter((item) => item.types.includes(userType));
    const groups = [...new Set(NAV_ITEMS.map((item) => item.group))];
    const firstName = localStorage.getItem('firstName') ?? '';
    const pageTitle = `${NAV_ITEMS.find((item) => item.to === location.pathname)?.title ?? 'Dashboard'} — Admin`;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('type');
        navigate('/auth/signin');
    };

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <ThemeProvider theme={adminTheme}>
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
                        {firstName && <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>Hi, {firstName}</Typography>}
                        <Button size="small" href="/" target="_blank" endIcon={<OpenInNewIcon fontSize="small" />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                            View site
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<LogoutIcon fontSize="small" />}
                            onClick={handleLogout}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '50px',
                                px: 2,
                                borderColor: 'rgba(15,15,26,0.2)',
                                color: '#374151',
                                '&:hover': {
                                    borderColor: '#ef4444',
                                    color: '#ef4444',
                                    bgcolor: 'rgba(239,68,68,0.05)',
                                },
                            }}
                        >
                            Logout
                        </Button>
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

                {groups.map((group, gi) => (
                <List key={group} sx={{ px: 1, pt: gi === 0 ? 1.5 : 0.5 }}>
                    {open
                        ? <Typography sx={{ px: 1.5, pt: gi === 0 ? 0 : 1, pb: 0.75, fontSize: 11, fontWeight: 700, color: 'rgba(15,15,26,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group}</Typography>
                        : gi > 0 && <Divider sx={{ mx: 1, mb: 1, borderColor: 'rgba(15,15,26,0.08)' }} />}
                    {NAV_ITEMS.filter((item) => item.group === group).map((item) => {
                        const NavIcon = item.icon;
                        const { label, to } = item;
                        const active = location.pathname === to;
                        return (
                            <ListItem key={label} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                <Tooltip title={open ? '' : label} placement="right">
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
                                            color: '#0891b2',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, rgba(0,212,255,0.20) 0%, rgba(168,85,247,0.14) 100%)',
                                            },
                                            '& .MuiListItemIcon-root': { color: '#0891b2' },
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
                                            color: active ? '#0891b2' : 'rgba(15,15,26,0.42)',
                                            transition: 'color 0.15s ease',
                                        }}
                                    >
                                        <NavIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        slotProps={{ primary: { sx: {
                                            fontWeight: active ? 600 : 500,
                                            fontSize: 13.5,
                                            color: active ? '#0891b2' : '#0f0f1a',
                                        } } }}
                                        sx={{ display: open ? 'block' : 'none' }}
                                    />
                                </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        );
                    })}
                </List>
                ))}
            </Drawer>

           
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    minWidth: 0,
                    minHeight: '100vh',
                    backgroundColor: '#f5f5fa',
                    color: '#0f0f1a',
                }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
        </ThemeProvider>
    );
};

export default DashLayout;
