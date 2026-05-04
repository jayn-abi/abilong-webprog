import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../../components/Button';
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
        <div className="pb-10">

           
            <div className="glass-card rounded-[1.25rem] p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: '#0f0f1a' }}>Dashboard</h1>
                    <p className="text-sm mt-1" style={{ color: 'rgba(15,15,26,0.45)' }}>{today}</p>
                </div>
            </div>

            {/* KPI Cards */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(15,15,26,0.45)' }}>
                Key Metrics
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {statCards.map(({ label, value, icon, accent }) => (
                    <div
                        key={label}
                        className="glass-card card-lift rounded-[1.25rem] p-5"
                        style={{ borderTop: `2px solid ${accent}55` }}
                    >
                        <div style={{ color: accent }}>{icon}</div>
                        <p className="text-4xl font-bold mt-3" style={{ color: accent }}>{value}</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(15,15,26,0.45)' }}>
                            {label}
                        </p>
                    </div>
                ))}
            </div>

           
            <div className="flex items-end justify-between gap-4 mb-4 flex-wrap">
                <div>
                    
                    <h2 className="mt-1 text-xl font-bold" style={{ color: '#0f0f1a' }}>Location Map</h2>
                    <p className="mt-0.5 text-sm" style={{ color: 'rgba(15,15,26,0.45)' }}>
                        National University — Manila, 551 F Jhocson St, Sampaloc
                    </p>
                </div>
               
            </div>
            <div className="glass-card rounded-[1.25rem] overflow-hidden" style={{ height: '420px' }}>
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
            </div>

        </div>
    );
}

export default DashboardPage;