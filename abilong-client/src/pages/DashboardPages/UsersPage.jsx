import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import userSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(userSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users from src/assets/users.json. Please ensure the file exists and contains valid JSON data.',
        };
    }
};

const seed = loadUsers();


const filterFieldSx = (minWidth = 130) => ({
    minWidth,
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        transition: 'box-shadow 0.15s ease',
        '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' },
        '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.22)' },
        '&.Mui-focused fieldset': { borderColor: '#2563eb' },
    },
    '& .MuiSelect-icon': { color: '#94a3b8', fontSize: 20 },
});

const UserPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(seed.users);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const resetForm = () => { setForm({ ...blankForm }); setError({}); };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : blankForm);
        setError({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, type, checked } }) => {
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validate = () => {
        const nextError = {};
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        [
            ['firstName', 'First name '],
            ['lastName', 'Last name '],
            ['age', 'Age '],
            ['gender', 'Gender '],
            ['contactNumber', 'Contact number '],
            ['email', 'Email '],
            ['role', 'Role '],
            ['username', 'Username '],
            ['password', 'Password '],
            ['address', 'Address '],
        ].forEach(([key, label]) => {
            if (!String(form[key] ?? '').trim()) nextError[key] = `${label}is required`;
        });

        if (!nextError.age && !/^\d+$/.test(form.age.trim()))
            nextError.age = 'Age must be a number only';
        if (!nextError.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim()))
            nextError.contactNumber = 'Contact number must be exactly 11 digits';
        if (!nextError.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            nextError.email = 'Enter a valid email address';
        if (!nextError.email && users.some((u) => u.id !== modal.id && u.email === email))
            nextError.email = 'Email already exists';
        if (!nextError.username && /\s/.test(form.username))
            nextError.username = 'Username must not contain spaces';
        if (!nextError.username && users.some((u) => u.id !== modal.id && u.username === username))
            nextError.username = 'Username already exists';
        if (!nextError.password && form.password.length < 8)
            nextError.password = 'Password must be at least 8 characters';

        return nextError;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextError = validate();
        if (Object.keys(nextError).length) { setError(nextError); return; }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            role: form.role.trim(),
            username: form.username.trim().toLowerCase(),
            password: form.password.trim(),
            address: form.address.trim(),
            isActive: form.isActive,
        };

        setUsers((prev) =>
            modal.id
                ? prev.map((u) => (u.id === modal.id ? { ...u, ...nextUser, id: modal.id } : u))
                : [...prev, { id: prev.reduce((max, u) => Math.max(max, u.id), 0) + 1, ...nextUser }]
        );
        closeModal();
    };

    const toggleStatus = (id) =>
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));

    const filteredUsers = users.filter((u) => {
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
            !q ||
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q);
        const matchesRole = !filterRole || u.role === filterRole;
        const matchesGender = !filterGender || u.gender === filterGender;
        const matchesStatus =
            filterStatus === '' || (filterStatus === 'active' ? u.isActive : !u.isActive);
        return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    const fieldProps = (name, label, extra = {}) => ({
        name, label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(error[name]),
        helperText: error[name],
        fullWidth: true,
        ...extra,
    });

   
    const roleBadge = (role) => ({
        admin:  { color: '#1e40af', bgcolor: '#dbeafe' },
        editor: { color: '#92400e', bgcolor: '#fef3c7' },
        viewer: { color: '#374151', bgcolor: '#f1f5f9' },
    }[role] ?? { color: '#374151', bgcolor: '#f1f5f9' });

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 200,
            valueGetter: (value, row) => `${row.firstName} ${row.lastName}`.trim(),
            renderCell: ({ row }) => {
                const name = `${row.firstName} ${row.lastName}`.trim();
                return (
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#0f0f1a', lineHeight: 1.4 }}>
                            {name}
                        </Typography>
                        <Typography variant="caption" noWrap sx={{ color: '#94a3b8', lineHeight: 1.2, display: 'block' }}>
                            @{row.username}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: 'age', headerName: 'Age', width: 65 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 95,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact No.', minWidth: 140 },
        { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 200 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 100,
            renderCell: ({ row }) => {
                const { color, bgcolor } = roleBadge(row.role);
                return (
                    <Chip
                        size="small"
                        label={labelize(row.role)}
                        sx={{
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: 11.5,
                            height: 22,
                            border: 'none',
                            color,
                            bgcolor,
                        }}
                    />
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.75} sx={{ height: '100%', alignItems: 'center' }}>
                    {row.isActive && (
                        <Box
                            sx={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                bgcolor: '#16a34a',
                                flexShrink: 0,
                                '@keyframes statusPulse': {
                                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                    '50%': { opacity: 0.35, transform: 'scale(0.75)' },
                                },
                                animation: 'statusPulse 2.5s ease-in-out infinite',
                            }}
                        />
                    )}
                    <Chip
                        size="small"
                        label={row.isActive ? 'Active' : 'Inactive'}
                        sx={{
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: 11.5,
                            height: 22,
                            border: 'none',
                            color: row.isActive ? '#166534' : '#6b7280',
                            bgcolor: row.isActive ? '#dcfce7' : '#f3f4f6',
                        }}
                    />
                </Stack>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 210,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => openModal(row)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '20px',
                            fontSize: 12,
                            px: 2,
                            py: 0.5,
                            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                            boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
                            transition: 'all 0.15s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                                boxShadow: '0 4px 12px rgba(37,99,235,0.40)',
                                transform: 'translateY(-1px)',
                            },
                            '&:active': { transform: 'translateY(0)', boxShadow: '0 1px 4px rgba(37,99,235,0.25)' },
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => toggleStatus(row.id)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '20px',
                            fontSize: 12,
                            px: 2,
                            py: 0.5,
                            transition: 'all 0.15s ease',
                            ...(row.isActive
                                ? {
                                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                                      boxShadow: '0 2px 8px rgba(220,38,38,0.28)',
                                      '&:hover': {
                                          background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
                                          boxShadow: '0 4px 12px rgba(220,38,38,0.40)',
                                          transform: 'translateY(-1px)',
                                      },
                                      '&:active': { transform: 'translateY(0)' },
                                  }
                                : {
                                      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                                      boxShadow: '0 2px 8px rgba(22,163,74,0.28)',
                                      '&:hover': {
                                          background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
                                          boxShadow: '0 4px 12px rgba(22,163,74,0.40)',
                                          transform: 'translateY(-1px)',
                                      },
                                      '&:active': { transform: 'translateY(0)' },
                                  }),
                        }}
                    >
                        {row.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>

            
            <Paper
                elevation={0}
                sx={{
                    px: 3.5,
                    pt: 3,
                    pb: 2.75,
                    mb: 2.5,
                    border: '1px solid rgba(15,15,26,0.07)',
                    borderRadius: 2.5,
                    bgcolor: '#fff',
                    boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
                }}
            >
                <Stack direction="row" alignItems="center" gap={2}>
                    <Typography
                        variant="h5"
                        sx={{ flex: 1, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}
                    >
                        Users
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<PersonAddOutlinedIcon />}
                        onClick={() => openModal()}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: '50px',
                            px: 3,
                            py: 1,
                            fontSize: 14,
                            flexShrink: 0,
                            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                            boxShadow: '0 4px 14px rgba(37,99,235,0.28)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                                boxShadow: '0 6px 20px rgba(37,99,235,0.42)',
                                transform: 'translateY(-1px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                                boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
                            },
                        }}
                    >
                        Add User
                    </Button>
                </Stack>
                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>
                    Manage team members, roles, and account access.
                </Typography>
            </Paper>

            {seed.error ? (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{seed.error}</Alert>
            ) : null}

            
            <Paper
                elevation={0}
                sx={{
                    px: 2.5,
                    py: 2,
                    mb: 2,
                    border: '1px solid rgba(15,15,26,0.07)',
                    borderRadius: 2.5,
                    bgcolor: '#fff',
                    boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
                }}
            >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" useFlexGap>
                    <TextField
                        placeholder="Search by name, email, or username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="small"
                        sx={{
                            flex: '1 1 220px',
                            minWidth: 220,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                transition: 'box-shadow 0.15s ease',
                                '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' },
                                '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.22)' },
                                '&.Mui-focused fieldset': { borderColor: '#2563eb' },
                                '&.Mui-focused': {
                                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05), 0 0 0 3px rgba(37,99,235,0.08)',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {[
                        {
                            label: 'Role', value: filterRole,
                            onChange: (e) => setFilterRole(e.target.value),
                            items: [['', 'All Roles'], ...roles.map((r) => [r, labelize(r)])],
                        },
                        {
                            label: 'Gender', value: filterGender,
                            onChange: (e) => setFilterGender(e.target.value),
                            items: [['', 'All Genders'], ...genders.map((g) => [g, labelize(g)])],
                        },
                        {
                            label: 'Status', value: filterStatus,
                            onChange: (e) => setFilterStatus(e.target.value),
                            items: [['', 'All Status'], ['active', 'Active'], ['inactive', 'Inactive']],
                        },
                    ].map(({ label, value, onChange, items }) => (
                        <TextField
                            key={label}
                            select
                            label={label}
                            value={value}
                            onChange={onChange}
                            size="small"
                            sx={filterFieldSx()}
                            SelectProps={{ IconComponent: ExpandMoreIcon }}
                        >
                            {items.map(([val, text]) => (
                                <MenuItem key={val} value={val}>{text}</MenuItem>
                            ))}
                        </TextField>
                    ))}
                </Stack>
            </Paper>

         
            <Paper
                elevation={0}
                sx={{
                    border: '1px solid rgba(15,15,26,0.07)',
                    borderRadius: 2.5,
                    overflow: 'hidden',
                    boxShadow: '0 1px 4px rgba(15,15,26,0.04)',
                }}
            >
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        borderBottom: '1px solid rgba(15,15,26,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: '#fafbfc',
                    }}
                >
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                        {filteredUsers.length}{' '}
                        {filteredUsers.length === 1 ? 'result' : 'results'}
                    </Typography>
                </Box>

                {users.length ? (
                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        disableRowSelectionOnClick
                        rowHeight={62}
                        pageSizeOptions={[5, 10]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5, page: 0 } },
                        }}
                        getRowClassName={(params) => {
                            const idx = params.indexRelativeToCurrentPage;
                            return `${idx % 2 === 0 ? 'row-even' : 'row-odd'} row-idx-${Math.min(idx, 9)}`;
                        }}
                        sx={{
                            border: 'none',
                            fontSize: 13.5,

                            /* ── Staggered fade-in ── */
                            '@keyframes fadeSlideIn': {
                                from: { opacity: 0, transform: 'translateY(6px)' },
                                to:   { opacity: 1, transform: 'translateY(0)' },
                            },
                            '& .MuiDataGrid-row': { animation: 'fadeSlideIn 0.28s ease both' },
                            '& .row-idx-0': { animationDelay: '0ms' },
                            '& .row-idx-1': { animationDelay: '45ms' },
                            '& .row-idx-2': { animationDelay: '90ms' },
                            '& .row-idx-3': { animationDelay: '135ms' },
                            '& .row-idx-4': { animationDelay: '180ms' },
                            '& .row-idx-5': { animationDelay: '225ms' },
                            '& .row-idx-6': { animationDelay: '270ms' },
                            '& .row-idx-7': { animationDelay: '315ms' },
                            '& .row-idx-8': { animationDelay: '360ms' },
                            '& .row-idx-9': { animationDelay: '405ms' },

                            /* ── Column headers ── */
                            '& .MuiDataGrid-columnHeaders': {
                                bgcolor: '#f8fafc',
                                borderBottom: '1px solid #e8edf2',
                            },
                            '& .MuiDataGrid-columnSeparator': { display: 'none' },
                            '& .MuiDataGrid-columnHeader': {
                                px: 2,
                                '&:focus, &:focus-within': { outline: 'none' },
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 700,
                                fontSize: 11,
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                            },
                            '& .MuiDataGrid-sortIcon': { color: '#94a3b8' },
                            '& .MuiDataGrid-menuIconButton': { color: '#94a3b8' },

                            
                            '& .MuiDataGrid-cell': {
                                px: 2,
                                display: 'flex',
                                alignItems: 'center',
                                outline: 'none',
                                borderBottom: '1px solid rgba(15,15,26,0.05)',
                                color: '#1e293b',
                                '&:focus, &:focus-within': { outline: 'none' },
                            },

                           
                            '& .row-even': { bgcolor: '#ffffff' },
                            '& .row-odd':  { bgcolor: '#fafbfc' },

                            
                            '& .MuiDataGrid-row:hover': { bgcolor: '#f5f7fa !important' },

                            /* ── Footer / Pagination ── */
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: '1px solid #e8edf2',
                                bgcolor: '#f8fafc',
                                minHeight: 52,
                                px: 1,
                            },
                            '& .MuiTablePagination-root': { color: '#64748b', fontSize: 13 },
                            '& .MuiTablePagination-actions .MuiIconButton-root': {
                                borderRadius: '8px',
                                '&:hover': { bgcolor: '#f1f5f9' },
                            },
                            '& .MuiTablePagination-select': { borderRadius: '8px' },
                        }}
                    />
                ) : (
                    <Box sx={{ p: 3 }}>
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                            No users found. Use Add User to create your first record.
                        </Alert>
                    </Box>
                )}
            </Paper>

          
            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                fullScreen={isMobile}
                maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: { xs: 0, sm: 3 },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    },
                }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle sx={{ p: 0, background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)' }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 3.5, py: 2.5 }}>
                            <Box
                                sx={{
                                    width: 42, height: 42,
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.15)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <PersonAddOutlinedIcon sx={{ color: '#fff', fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography fontWeight={700} fontSize="1.05rem" sx={{ color: '#fff', lineHeight: 1.3 }}>
                                    {modal.id ? 'Edit User' : 'Add New User'}
                                </Typography>
                                <Typography fontSize={12.5} sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>
                                    {modal.id ? 'Update the user account details below.' : 'Fill in the details to create a new account.'}
                                </Typography>
                            </Box>
                        </Stack>
                    </DialogTitle>

                    <DialogContent
                        sx={{
                            px: { xs: 2.5, sm: 3.5 },
                            pt: '24px !important',
                            pb: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                backgroundColor: '#f8fafc',
                                transition: 'background-color 0.15s ease',
                                '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' },
                                '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.25)' },
                                '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: '1.5px' },
                                '&.Mui-focused': { backgroundColor: '#fff' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
                            '& .MuiFormHelperText-root': { marginLeft: 0, marginTop: '4px' },
                        }}
                    >
                        
                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
                            Personal Information
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                            <TextField {...fieldProps('firstName', 'First Name')} />
                            <TextField {...fieldProps('lastName', 'Last Name')} />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 2.5 }}>
                            <TextField {...fieldProps('age', 'Age')} />
                            <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                {genders.map((g) => (
                                    <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <TextField
                            sx={{ mt: 2.5 }}
                            {...fieldProps('address', 'Address', { multiline: true, minRows: 2 })}
                        />

                        <Divider sx={{ my: 3, borderColor: 'rgba(15,15,26,0.06)' }} />

                    
                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
                            Contact & Access
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                            <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                            <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 2.5 }}>
                            <TextField {...fieldProps('role', 'Role', { select: true })}>
                                {roles.map((r) => (
                                    <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
                                ))}
                            </TextField>
                            <TextField {...fieldProps('username', 'Username')} />
                        </Stack>

                        <Divider sx={{ my: 3, borderColor: 'rgba(15,15,26,0.06)' }} />

                        {/* ── Security ── */}
                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>
                            Security
                        </Typography>
                        <TextField
                            {...fieldProps('password', 'Password', {
                                type: showPassword ? 'text' : 'password',
                                slotProps: {
                                    Input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => setShowPassword((p) => !p)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                },
                            })}
                        />
                        <Box
                            sx={{
                                mt: 2.5,
                                px: 2.5,
                                py: 1.75,
                                borderRadius: '10px',
                                border: '1px solid rgba(15,15,26,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor: form.isActive ? '#f0fdf4' : '#f8fafc',
                                transition: 'background-color 0.2s ease',
                            }}
                        >
                            <Box>
                                <Typography fontSize={13.5} fontWeight={600} sx={{ color: form.isActive ? '#15803d' : '#374151', lineHeight: 1.3 }}>
                                    {form.isActive ? 'Account Active' : 'Account Inactive'}
                                </Typography>
                                <Typography fontSize={12} sx={{ color: '#94a3b8', lineHeight: 1.4 }}>
                                    {form.isActive ? 'User can log in and access the system.' : 'User access is currently disabled.'}
                                </Typography>
                            </Box>
                            <Switch name="isActive" checked={form.isActive} onChange={handleChange} color="success" />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: 3.5, py: 2.25, borderTop: '1px solid rgba(15,15,26,0.07)', gap: 1 }}>
                        <Button
                            variant="outlined"
                            onClick={closeModal}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 500,
                                borderRadius: '50px',
                                px: 2.5,
                                borderColor: 'rgba(15,15,26,0.2)',
                                color: '#374151',
                                '&:hover': { bgcolor: '#f3f4f6', borderColor: 'rgba(15,15,26,0.35)' },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '50px',
                                px: 3.5,
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                                boxShadow: '0 4px 12px rgba(37,99,235,0.28)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                                    boxShadow: '0 6px 18px rgba(37,99,235,0.42)',
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            {modal.id ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UserPage;
