import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ElderlyIcon from '@mui/icons-material/Elderly';

const rows = [
    { id: 1, lastName: 'Snow',       firstName: 'Jon',      age: 35  },
    { id: 2, lastName: 'Lannister',  firstName: 'Cersei',   age: 42  },
    { id: 3, lastName: 'Lannister',  firstName: 'Jaime',    age: 45  },
    { id: 4, lastName: 'Stark',      firstName: 'Arya',     age: 16  },
    { id: 5, lastName: 'Targaryen',  firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null,        age: 150 },
    { id: 7, lastName: 'Clifford',   firstName: 'Ferrara',  age: 44  },
    { id: 8, lastName: 'Frances',    firstName: 'Rossini',  age: 36  },
    { id: 9, lastName: 'Roxie',      firstName: 'Harvey',   age: 65  },
];

const validAges   = rows.filter((r) => r.age !== null);
const totalUsers  = rows.length;
const avgAge      = (validAges.reduce((s, r) => s + r.age, 0) / validAges.length).toFixed(1);
const youngestAge = Math.min(...validAges.map((r) => r.age));
const oldestAge   = Math.max(...validAges.map((r) => r.age));

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

const statCards = [
    { label: 'Total Users', value: totalUsers,           icon: <PeopleAltIcon  />, accent: '#00d4ff' },
    { label: 'Average Age', value: avgAge,               icon: <QueryStatsIcon />, accent: '#a855f7' },
    { label: 'Youngest',    value: `${youngestAge} yrs`, icon: <ChildCareIcon  />, accent: '#22d3a5' },
    { label: 'Oldest',      value: `${oldestAge} yrs`,   icon: <ElderlyIcon    />, accent: '#f59e0b' },
];

function DashboardPage() {
    return (
        <Box sx={{ pb: 5, width: '100%', minWidth: 0 }}>

            {/* Header */}
            <Paper elevation={0} sx={{ px: 3.5, pt: 3, pb: 2.75, mb: 2.5, border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Stack direction="row" alignItems="center" gap={2}>
                    <Typography variant="h5" sx={{ flex: 1, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}>Dashboard</Typography>
                </Stack>
                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>{today}</Typography>
            </Paper>

            {/* KPI Cards */}
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
                Key Metrics
            </Typography>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }, mb: 4 }}>
                {statCards.map(({ label, value, icon, accent }) => (
                    <Paper key={label} elevation={0} sx={{
                        p: 2.5, borderRadius: 2.5,
                        border: '1px solid rgba(15,15,26,0.07)',
                        borderTop: `2px solid ${accent}55`,
                        boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
                    }}>
                        <Box sx={{ color: accent }}>{icon}</Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, color: accent }}>{value}</Typography>
                        <Typography sx={{ mt: 0.75, fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {label}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Map */}
            <Paper elevation={0} sx={{ px: 3.5, pt: 3, pb: 2.75, mb: 2, border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}>Location Map</Typography>
                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>
                    National University — Manila, 551 F Jhocson St, Sampaloc
                </Typography>
            </Paper>
            <Paper elevation={0} sx={{ border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, overflow: 'hidden', height: 420 }}>
                <MapContainer
                    center={[14.604253, 120.994314]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[14.604253, 120.994314]}>
                        <Popup>
                            <strong>National University-Manila</strong><br />
                            551 F Jhocson St, Sampaloc, Manila
                        </Popup>
                    </Marker>
                </MapContainer>
            </Paper>

        </Box>
    );
}

export default DashboardPage;
