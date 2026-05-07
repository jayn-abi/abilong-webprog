import { useEffect, useState } from 'react';
import {
    Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, IconButton, InputAdornment, MenuItem, Paper, Stack, Switch,
    TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const TYPES   = ['admin', 'editor', 'viewer'];
const GENDERS = ['male', 'female', 'other'];

const blankForm = {
    firstName: '', lastName: '', age: '', gender: '', contactNumber: '',
    email: '', type: 'editor', username: '', password: '', address: '', isActive: true,
};

const labelize = (v) => (v ? `${v.charAt(0).toUpperCase()}${v.slice(1)}` : '');

const filterFieldSx = (minWidth = 130) => ({
    minWidth,
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' },
        '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.22)' },
        '&.Mui-focused fieldset': { borderColor: '#2563eb' },
    },
    '& .MuiSelect-icon': { color: '#94a3b8', fontSize: 20 },
});

const UserPage = () => {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [users,         setUsers]         = useState([]);
    const [loading,       setLoading]       = useState(true);
    const [apiError,      setApiError]      = useState('');
    const [modal,         setModal]         = useState({ open: false, id: null });
    const [form,          setForm]          = useState(blankForm);
    const [showPassword,  setShowPassword]  = useState(false);
    const [error,         setError]         = useState({});
    const [searchQuery,   setSearchQuery]   = useState('');
    const [filterType,    setFilterType]    = useState('');
    const [filterGender,  setFilterGender]  = useState('');
    const [filterStatus,  setFilterStatus]  = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            setApiError('');
            const { data } = await fetchUsers();
            setUsers(data.users);
        } catch (err) {
            setApiError(err.response?.data?.message || 'Failed to load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const resetForm = () => { setForm({ ...blankForm }); setError({}); };

    const openModal = (user) => {
        setModal({ open: true, id: user?._id ?? null });
        setForm(user ? { ...blankForm, ...user, password: '' } : blankForm);
        setError({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, type, checked } }) =>
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    const validate = () => {
        const next = {};
        const isEditing = Boolean(modal.id);
        const email    = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        const required = [
            ['firstName',     'First name '],
            ['lastName',      'Last name '],
            ['age',           'Age '],
            ['gender',        'Gender '],
            ['contactNumber', 'Contact number '],
            ['email',         'Email '],
            ['type',          'Type '],
            ['username',      'Username '],
            ['address',       'Address '],
        ];
        if (!isEditing) required.push(['password', 'Password ']);
        required.forEach(([k, label]) => {
            if (!String(form[k] ?? '').trim()) next[k] = `${label}is required`;
        });

        if (!next.age           && !/^\d+$/.test(form.age.trim()))
            next.age = 'Age must be a number only';
        if (!next.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim()))
            next.contactNumber = 'Must be exactly 11 digits';
        if (!next.email         && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            next.email = 'Enter a valid email address';
        if (!next.email         && users.some((u) => u._id !== modal.id && u.email === email))
            next.email = 'Email already exists';
        if (!next.username      && /\s/.test(form.username))
            next.username = 'Username must not contain spaces';
        if (!next.username      && users.some((u) => u._id !== modal.id && u.username === username))
            next.username = 'Username already exists';
        if (!isEditing && !next.password && form.password.length < 8)
            next.password = 'Password must be at least 8 characters';
        if (isEditing  && form.password && form.password.length < 8)
            next.password = 'Password must be at least 8 characters';

        return next;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setError(errs); return; }

        const payload = {
            firstName:     form.firstName.trim(),
            lastName:      form.lastName.trim(),
            age:           form.age.trim(),
            gender:        form.gender.trim(),
            contactNumber: form.contactNumber.trim(),
            email:         form.email.trim().toLowerCase(),
            type:          form.type.trim(),
            username:      form.username.trim().toLowerCase(),
            address:       form.address.trim(),
            isActive:      form.isActive,
        };
        if (form.password) payload.password = form.password;

        try {
            if (modal.id) { await updateUser(modal.id, payload); }
            else           { await createUser(payload); }
            await loadUsers();
            closeModal();
        } catch (err) {
            setError({ submit: err.response?.data?.message || 'Failed to save user.' });
        }
    };

    const toggleStatus = async (id, isActive) => {
        try {
            await updateUser(id, { isActive: !isActive });
            await loadUsers();
        } catch (err) {
            console.error('Toggle status error:', err);
        }
    };

    const filteredUsers = users.filter((u) => {
        const q = searchQuery.trim().toLowerCase();
        const matchSearch  = !q || [u.firstName, u.lastName, u.email, u.username]
            .some((s) => s?.toLowerCase().includes(q));
        const matchType    = !filterType   || u.type   === filterType;
        const matchGender  = !filterGender || u.gender === filterGender;
        const matchStatus  = filterStatus === '' ||
            (filterStatus === 'active' ? u.isActive : !u.isActive);
        return matchSearch && matchType && matchGender && matchStatus;
    });

    const fieldProps = (name, label, extra = {}) => ({
        name, label,
        value:      form[name] ?? '',
        onChange:   handleChange,
        error:      Boolean(error[name]),
        helperText: error[name],
        fullWidth:  true,
        ...extra,
    });

    const typeBadge = (type) => ({
        admin:  { color: '#1e40af', bgcolor: '#dbeafe' },
        editor: { color: '#92400e', bgcolor: '#fef3c7' },
        viewer: { color: '#374151', bgcolor: '#f1f5f9' },
    }[type] ?? { color: '#374151', bgcolor: '#f1f5f9' });

    const columns = [
        {
            field: 'fullName', headerName: 'Full Name', flex: 1, minWidth: 200,
            valueGetter: (_v, row) => `${row.firstName} ${row.lastName}`.trim(),
            renderCell: ({ row }) => (
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#0f0f1a', lineHeight: 1.4 }}>
                        {`${row.firstName} ${row.lastName}`.trim()}
                    </Typography>
                    <Typography variant="caption" noWrap sx={{ color: '#94a3b8', lineHeight: 1.2, display: 'block' }}>
                        @{row.username}
                    </Typography>
                </Box>
            ),
        },
        { field: 'age', headerName: 'Age', width: 65 },
        { field: 'gender', headerName: 'Gender', minWidth: 95,
            valueGetter: (_v, row) => labelize(row.gender) },
        { field: 'contactNumber', headerName: 'Contact No.', minWidth: 140 },
        { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 200 },
        {
            field: 'type', headerName: 'Type', minWidth: 100,
            renderCell: ({ row }) => {
                const { color, bgcolor } = typeBadge(row.type);
                return (
                    <Chip size="small" label={labelize(row.type)} sx={{
                        borderRadius: '50px', fontWeight: 600, fontSize: 11.5,
                        height: 22, border: 'none', color, bgcolor,
                    }} />
                );
            },
        },
        {
            field: 'status', headerName: 'Status', width: 120, sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.75} sx={{ height: '100%', alignItems: 'center' }}>
                    {row.isActive && (
                        <Box sx={{
                            width: 7, height: 7, borderRadius: '50%', bgcolor: '#16a34a', flexShrink: 0,
                            '@keyframes pulse': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.35, transform: 'scale(0.75)' } },
                            animation: 'pulse 2.5s ease-in-out infinite',
                        }} />
                    )}
                    <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} sx={{
                        borderRadius: '50px', fontWeight: 600, fontSize: 11.5, height: 22, border: 'none',
                        color: row.isActive ? '#166534' : '#6b7280',
                        bgcolor: row.isActive ? '#dcfce7' : '#f3f4f6',
                    }} />
                </Stack>
            ),
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 210, sortable: false, filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
                    <Button size="small" variant="contained" onClick={() => openModal(row)} sx={{
                        textTransform: 'none', fontWeight: 500, borderRadius: '20px', fontSize: 12, px: 2, py: 0.5,
                        background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
                        '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' },
                    }}>Edit</Button>
                    <Button size="small" variant="contained" onClick={() => toggleStatus(row._id, row.isActive)} sx={{
                        textTransform: 'none', fontWeight: 500, borderRadius: '20px', fontSize: 12, px: 2, py: 0.5,
                        ...(row.isActive
                            ? { background: 'linear-gradient(135deg,#dc2626,#ef4444)', boxShadow: '0 2px 8px rgba(220,38,38,0.28)', '&:hover': { background: 'linear-gradient(135deg,#b91c1c,#dc2626)', transform: 'translateY(-1px)' } }
                            : { background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: '0 2px 8px rgba(22,163,74,0.28)', '&:hover': { background: 'linear-gradient(135deg,#15803d,#16a34a)', transform: 'translateY(-1px)' } }),
                    }}>{row.isActive ? 'Deactivate' : 'Activate'}</Button>
                </Stack>
            ),
        },
    ];

    const gridSx = {
        border: 'none', fontSize: 13.5,
        '@keyframes fadeSlideIn': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        '& .MuiDataGrid-row': { animation: 'fadeSlideIn 0.28s ease both' },
        ...Object.fromEntries([0,1,2,3,4,5,6,7,8,9].map((i) => [`& .row-idx-${i}`, { animationDelay: `${i*45}ms` }])),
        '& .MuiDataGrid-columnHeaders': { bgcolor: '#f8fafc', borderBottom: '1px solid #e8edf2' },
        '& .MuiDataGrid-columnSeparator': { display: 'none' },
        '& .MuiDataGrid-columnHeader': { px: 2, '&:focus,&:focus-within': { outline: 'none' } },
        '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' },
        '& .MuiDataGrid-cell': { px: 2, display: 'flex', alignItems: 'center', outline: 'none', borderBottom: '1px solid rgba(15,15,26,0.05)', color: '#1e293b', '&:focus,&:focus-within': { outline: 'none' } },
        '& .row-even': { bgcolor: '#fff' }, '& .row-odd': { bgcolor: '#fafbfc' },
        '& .MuiDataGrid-row:hover': { bgcolor: '#f5f7fa !important' },
        '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e8edf2', bgcolor: '#f8fafc', minHeight: 52, px: 1 },
        '& .MuiTablePagination-root': { color: '#64748b', fontSize: 13 },
    };

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
            {/* Header */}
            <Paper elevation={0} sx={{ px: 3.5, pt: 3, pb: 2.75, mb: 2.5, border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Stack direction="row" alignItems="center" gap={2}>
                    <Typography variant="h5" sx={{ flex: 1, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}>Users</Typography>
                    <Button variant="contained" startIcon={<PersonAddOutlinedIcon />} onClick={() => openModal()} sx={{
                        textTransform: 'none', fontWeight: 600, borderRadius: '50px', px: 3, py: 1, fontSize: 14, flexShrink: 0,
                        background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 4px 14px rgba(37,99,235,0.28)',
                        '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' },
                    }}>Add User</Button>
                </Stack>
                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>Manage team members, types, and account access.</Typography>
            </Paper>

            {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

            {/* Filters */}
            <Paper elevation={0} sx={{ px: 2.5, py: 2, mb: 2, border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" useFlexGap>
                    <TextField
                        placeholder="Search by name, email, or username…"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        size="small"
                        sx={{ flex: '1 1 220px', minWidth: 220, '& .MuiOutlinedInput-root': { borderRadius: '12px', '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.22)' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                    />
                    {[
                        { label: 'Type',   value: filterType,   onChange: (e) => setFilterType(e.target.value),   items: [['','All Types'],   ...TYPES.map((t) => [t, labelize(t)])] },
                        { label: 'Gender', value: filterGender, onChange: (e) => setFilterGender(e.target.value), items: [['','All Genders'], ...GENDERS.map((g) => [g, labelize(g)])] },
                        { label: 'Status', value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), items: [['','All Status'], ['active','Active'], ['inactive','Inactive']] },
                    ].map(({ label, value, onChange, items }) => (
                        <TextField key={label} select label={label} value={value} onChange={onChange} size="small" sx={filterFieldSx()} SelectProps={{ IconComponent: ExpandMoreIcon }}>
                            {items.map(([val, text]) => <MenuItem key={val} value={val}>{text}</MenuItem>)}
                        </TextField>
                    ))}
                </Stack>
            </Paper>

            {/* Table */}
            <Paper elevation={0} sx={{ border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, overflow: 'hidden', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(15,15,26,0.06)', bgcolor: '#fafbfc' }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                        {filteredUsers.length} {filteredUsers.length === 1 ? 'result' : 'results'}
                    </Typography>
                </Box>
                <DataGrid
                    rows={filteredUsers} columns={columns}
                    getRowId={(row) => row._id}
                    loading={loading}
                    disableRowSelectionOnClick rowHeight={62}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                    getRowClassName={(p) => {
                        const i = p.indexRelativeToCurrentPage;
                        return `${i % 2 === 0 ? 'row-even' : 'row-odd'} row-idx-${Math.min(i, 9)}`;
                    }}
                    sx={gridSx}
                />
            </Paper>

            {/* Dialog */}
            <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md"
                PaperProps={{ sx: { borderRadius: { xs: 0, sm: 3 }, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' } }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle sx={{ p: 0, background: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)' }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 3.5, py: 2.5 }}>
                            <Box sx={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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

                    <DialogContent sx={{
                        px: { xs: 2.5, sm: 3.5 }, pt: '24px !important', pb: 2,
                        '& .MuiOutlinedInput-root': { borderRadius: '10px', backgroundColor: '#f8fafc', '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.25)' }, '&.Mui-focused fieldset': { borderColor: '#2563eb', borderWidth: '1.5px' }, '&.Mui-focused': { backgroundColor: '#fff' } },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' },
                        '& .MuiFormHelperText-root': { marginLeft: 0, marginTop: '4px' },
                    }}>
                        {error.submit && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error.submit}</Alert>}

                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>Personal Information</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                            <TextField {...fieldProps('firstName', 'First Name')} />
                            <TextField {...fieldProps('lastName',  'Last Name')} />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 2.5 }}>
                            <TextField {...fieldProps('age', 'Age')} />
                            <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                {GENDERS.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                            </TextField>
                        </Stack>
                        <TextField sx={{ mt: 2.5 }} {...fieldProps('address', 'Address', { multiline: true, minRows: 2 })} />

                        <Divider sx={{ my: 3, borderColor: 'rgba(15,15,26,0.06)' }} />

                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>Contact & Access</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
                            <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                            <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 2.5 }}>
                            <TextField {...fieldProps('type', 'Type', { select: true })}>
                                {TYPES.map((t) => <MenuItem key={t} value={t}>{labelize(t)}</MenuItem>)}
                            </TextField>
                            <TextField {...fieldProps('username', 'Username')} />
                        </Stack>

                        <Divider sx={{ my: 3, borderColor: 'rgba(15,15,26,0.06)' }} />

                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>Security</Typography>
                        <TextField {...fieldProps('password',
                            modal.id ? 'New Password (leave blank to keep current)' : 'Password',
                            {
                                type: showPassword ? 'text' : 'password',
                                slotProps: { Input: { endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => setShowPassword((p) => !p)} onMouseDown={(e) => e.preventDefault()}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )}},
                            }
                        )} />
                        <Box sx={{ mt: 2.5, px: 2.5, py: 1.75, borderRadius: '10px', border: '1px solid rgba(15,15,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: form.isActive ? '#f0fdf4' : '#f8fafc', transition: 'background-color 0.2s ease' }}>
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
                        <Button variant="outlined" onClick={closeModal} sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '50px', px: 2.5, borderColor: 'rgba(15,15,26,0.2)', color: '#374151', '&:hover': { bgcolor: '#f3f4f6' } }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '50px', px: 3.5, background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 4px 12px rgba(37,99,235,0.28)', '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' } }}>
                            {modal.id ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UserPage;
