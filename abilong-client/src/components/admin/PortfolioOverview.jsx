import { Link } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { usePortfolioAdmin } from '../../context/PortfolioContext';
import { useMedia } from '../../context/MediaContext';

const Stat = ({ icon, label, value, sub, to, accent }) => (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ width: 38, height: 38, borderRadius: '10px', display: 'grid', placeItems: 'center', color: accent, bgcolor: `${accent}1a` }}>{icon}</Box>
            {to && (
                <Button component={Link} to={to} size="small" endIcon={<ArrowForwardIcon fontSize="small" />}>Edit</Button>
            )}
        </Stack>
        <Box>
            <Typography variant="h5" component="p">{value}</Typography>
            <Typography variant="body2" fontWeight={600}>{label}</Typography>
            {sub && <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>{sub}</Typography>}
        </Box>
    </Paper>
);

/* Dashboard summary of the portfolio content with shortcuts and to-dos. */
const PortfolioOverview = () => {
    const { content } = usePortfolioAdmin();
    const { media } = useMedia();
    const { projects, featuredProject, certifications, links } = content;

    const todo = [
        ...projects.filter((p) => !media[p.media.web]?.url).map((p) => ({ text: `Add a screenshot for ${p.name || 'an untitled project'}`, to: '/dashboard/projects' })),
        ...projects.filter((p) => !p.role).map((p) => ({ text: `Add your role on ${p.name || 'an untitled project'}`, to: '/dashboard/projects' })),
        !certifications.length && { text: 'Add your certifications', to: '/dashboard/certifications' },
        !links.video && { text: 'Add your video introduction link', to: '/dashboard/content' },
    ].filter(Boolean);

    return (
        <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
                Your portfolio
            </Typography>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' } }}>
                <Stat icon={<WorkOutlineIcon />} accent="#0891b2" label="Projects" value={projects.length} sub={featuredProject ? `Featured: ${featuredProject.name}` : 'None featured'} to="/dashboard/projects" />
                <Stat icon={<WorkspacePremiumOutlinedIcon />} accent="#a855f7" label="Certifications" value={certifications.length} sub={certifications.length ? 'Shown on the Skills page' : 'Learning track shown instead'} to="/dashboard/certifications" />
                <Stat icon={<PhotoLibraryOutlinedIcon />} accent="#10b981" label="Images uploaded" value={Object.keys(media).length} sub="Screenshots, logos & certificates" />
                <Stat icon={<EditNoteOutlinedIcon />} accent="#f59e0b" label="Site content" value="Edit" sub="Profile, about, skills, experience" to="/dashboard/content" />
            </Box>

            {todo.length > 0 && (
                <Paper variant="outlined" sx={{ mt: 2, p: 2.5, borderRadius: '16px' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.25 }}>
                        <WarningAmberRoundedIcon fontSize="small" sx={{ color: '#f59e0b' }} />
                        <Typography variant="body2" fontWeight={700}>To finish your portfolio</Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                        {todo.slice(0, 6).map((t) => (
                            <Button key={t.text} component={Link} to={t.to} size="small" color="inherit" endIcon={<ArrowForwardIcon fontSize="small" />} sx={{ justifyContent: 'space-between', fontWeight: 500, color: 'text.secondary' }}>
                                {t.text}
                            </Button>
                        ))}
                        {todo.length > 6 && <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>and {todo.length - 6} more…</Typography>}
                    </Stack>
                </Paper>
            )}
        </Box>
    );
};

export default PortfolioOverview;
