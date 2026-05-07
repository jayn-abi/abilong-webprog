import { useState } from 'react';
import {
    Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, MenuItem, Paper, Stack, Switch, TextField, Typography, useMediaQuery,
    InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useArticles } from '../../context/ArticleContext';

const TAGS = ['General', 'Technology', 'Leadership', 'Research', 'Development', 'Design'];

const blankForm = { title: '', content: '', author: '', tag: 'General', image: '', isPublished: true };

const toSlug = (title = '') =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const countParagraphs = (content = '') => {
    if (!content.trim()) return 0;
    const blocks = content.split('\n\n').filter((p) => p.trim());
    return blocks.length > 1 ? blocks.length : content.split('\n').filter((p) => p.trim()).length;
};

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

const DashArticleListPage = () => {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { articles, addArticle, editArticle, deleteArticle } = useArticles();

    const [modal,         setModal]         = useState({ open: false, id: null });
    const [form,          setForm]          = useState(blankForm);
    const [error,         setError]         = useState({});
    const [searchQuery,   setSearchQuery]   = useState('');
    const [filterTag,     setFilterTag]     = useState('');
    const [filterStatus,  setFilterStatus]  = useState('');

    const openModal = (article) => {
        setModal({ open: true, id: article?._id ?? null });
        setForm(article ? { ...blankForm, ...article } : blankForm);
        setError({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setForm(blankForm);
        setError({});
    };

    const handleChange = ({ target: { name, value, type, checked } }) =>
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    const validate = () => {
        const next = {};
        if (!form.title.trim())   next.title   = 'Title is required';
        if (!form.content.trim()) next.content  = 'Content is required';
        if (!form.author.trim())  next.author   = 'Author is required';
        return next;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setError(errs); return; }

        const payload = {
            title:       form.title.trim(),
            content:     form.content.trim(),
            author:      form.author.trim(),
            tag:         form.tag || 'General',
            image:       (form.image ?? '').trim(),
            isPublished: form.isPublished,
        };

        if (modal.id) { editArticle(modal.id, payload); }
        else           { addArticle(payload); }
        closeModal();
    };

    const togglePublished = (id, isPublished) => {
        editArticle(id, { isPublished: !isPublished });
    };

    const filtered = articles.filter((a) => {
        const q = searchQuery.trim().toLowerCase();
        const matchSearch  = !q || a.title?.toLowerCase().includes(q) || a.author?.toLowerCase().includes(q);
        const matchTag     = !filterTag    || a.tag === filterTag;
        const matchStatus  = filterStatus === '' || (filterStatus === 'published' ? a.isPublished : !a.isPublished);
        return matchSearch && matchTag && matchStatus;
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

    const columns = [
        {
            field: '_id', headerName: 'ID', width: 100,
            renderCell: ({ row }) => (
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748b', fontSize: 11 }}>
                    {row._id?.startsWith('seed-') ? `#${row._id.split('-')[1]}` : row._id?.slice(-6)}
                </Typography>
            ),
        },
        {
            field: 'slug', headerName: 'Slug', flex: 1, minWidth: 160,
            valueGetter: (_, row) => toSlug(row.title),
            renderCell: ({ row }) => (
                <Typography variant="caption" sx={{
                    fontFamily: 'monospace', color: '#475569', fontSize: 11,
                    bgcolor: '#f1f5f9', px: 0.75, py: 0.25, borderRadius: '4px', display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                    {toSlug(row.title)}
                </Typography>
            ),
        },
        {
            field: 'title', headerName: 'Title', flex: 2, minWidth: 180,
            renderCell: ({ row }) => (
                <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#0f0f1a', lineHeight: 1.4 }}>
                    {row.title}
                </Typography>
            ),
        },
        {
            field: 'paragraphs', headerName: 'Paragraphs', width: 115, sortable: false,
            renderCell: ({ row }) => (
                <Chip size="small" label={countParagraphs(row.content)} sx={{
                    borderRadius: '6px', fontWeight: 700, fontSize: 12,
                    bgcolor: '#f0f9ff', color: '#0369a1', border: 'none',
                }} />
            ),
        },
        {
            field: 'preview', headerName: 'Preview', flex: 2, minWidth: 200, sortable: false,
            renderCell: ({ row }) => (
                <Typography variant="caption" noWrap sx={{ color: '#64748b', maxWidth: '100%' }}>
                    {row.content?.slice(0, 100)}{(row.content?.length ?? 0) > 100 ? '…' : ''}
                </Typography>
            ),
        },
        {
            field: 'status', headerName: 'Status', width: 130, sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.75} sx={{ height: '100%', alignItems: 'center' }}>
                    {row.isPublished && (
                        <Box sx={{
                            width: 7, height: 7, borderRadius: '50%', bgcolor: '#16a34a', flexShrink: 0,
                            '@keyframes pulse': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.35, transform: 'scale(0.75)' } },
                            animation: 'pulse 2.5s ease-in-out infinite',
                        }} />
                    )}
                    <Chip size="small" label={row.isPublished ? 'Enabled' : 'Disabled'} sx={{
                        borderRadius: '50px', fontWeight: 600, fontSize: 11.5, height: 22, border: 'none',
                        color: row.isPublished ? '#166534' : '#6b7280',
                        bgcolor: row.isPublished ? '#dcfce7' : '#f3f4f6',
                    }} />
                </Stack>
            ),
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 280, sortable: false, filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
                    <Button size="small" variant="contained" onClick={() => openModal(row)} sx={{
                        textTransform: 'none', fontWeight: 500, borderRadius: '20px', fontSize: 12, px: 2, py: 0.5,
                        background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 2px 8px rgba(37,99,235,0.28)',
                        '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' },
                    }}>Edit</Button>
                    <Button size="small" variant="contained" onClick={() => togglePublished(row._id, row.isPublished)} sx={{
                        textTransform: 'none', fontWeight: 500, borderRadius: '20px', fontSize: 12, px: 2, py: 0.5,
                        ...(row.isPublished
                            ? { background: 'linear-gradient(135deg,#dc2626,#ef4444)', boxShadow: '0 2px 8px rgba(220,38,38,0.28)', '&:hover': { background: 'linear-gradient(135deg,#b91c1c,#dc2626)', transform: 'translateY(-1px)' } }
                            : { background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: '0 2px 8px rgba(22,163,74,0.28)', '&:hover': { background: 'linear-gradient(135deg,#15803d,#16a34a)', transform: 'translateY(-1px)' } }),
                    }}>{row.isPublished ? 'Disable' : 'Enable'}</Button>
                    <Button size="small" variant="outlined" onClick={() => deleteArticle(row._id)} sx={{
                        textTransform: 'none', fontWeight: 500, borderRadius: '20px', fontSize: 12, px: 2, py: 0.5,
                        borderColor: 'rgba(220,38,38,0.4)', color: '#dc2626',
                        '&:hover': { borderColor: '#dc2626', bgcolor: 'rgba(220,38,38,0.06)', transform: 'translateY(-1px)' },
                    }}>Delete</Button>
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
                    <Typography variant="h5" sx={{ flex: 1, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.5px' }}>Articles</Typography>
                    <Button variant="contained" startIcon={<ArticleOutlinedIcon />} onClick={() => openModal()} sx={{
                        textTransform: 'none', fontWeight: 600, borderRadius: '50px', px: 3, py: 1, fontSize: 14, flexShrink: 0,
                        background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 4px 14px rgba(37,99,235,0.28)',
                        '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' },
                    }}>Add Article</Button>
                </Stack>
                <Typography sx={{ mt: 0.75, color: '#94a3b8', fontSize: 13.5 }}>Manage articles published on the public site.</Typography>
            </Paper>

            {/* Filters */}
            <Paper elevation={0} sx={{ px: 2.5, py: 2, mb: 2, border: '1px solid rgba(15,15,26,0.07)', borderRadius: 2.5, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(15,15,26,0.04)' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" useFlexGap>
                    <TextField
                        placeholder="Search by title or author…"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        size="small"
                        sx={{ flex: '1 1 220px', minWidth: 220, '& .MuiOutlinedInput-root': { borderRadius: '12px', '& fieldset': { borderColor: 'rgba(15,15,26,0.1)' }, '&:hover fieldset': { borderColor: 'rgba(15,15,26,0.22)' }, '&.Mui-focused fieldset': { borderColor: '#2563eb' } } }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                    />
                    {[
                        { label: 'Tag',    value: filterTag,    onChange: (e) => setFilterTag(e.target.value),    items: [['','All Tags'],    ...TAGS.map((t) => [t, t])] },
                        { label: 'Status', value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), items: [['','All Status'], ['published','Enabled'], ['draft','Disabled']] },
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
                        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                    </Typography>
                </Box>
                <DataGrid
                    rows={filtered} columns={columns}
                    getRowId={(row) => row._id}
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
                                <ArticleOutlinedIcon sx={{ color: '#fff', fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography fontWeight={700} fontSize="1.05rem" sx={{ color: '#fff', lineHeight: 1.3 }}>
                                    {modal.id ? 'Edit Article' : 'Add New Article'}
                                </Typography>
                                <Typography fontSize={12.5} sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>
                                    {modal.id ? 'Update the article details below.' : 'Fill in the details to add a new article.'}
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

                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>Article Details</Typography>
                        <TextField {...fieldProps('title', 'Title')} />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mt: 2.5 }}>
                            <TextField {...fieldProps('author', 'Author')} />
                            <TextField {...fieldProps('tag', 'Tag', { select: true })}>
                                {TAGS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                            </TextField>
                        </Stack>
                        <TextField sx={{ mt: 2.5 }} {...fieldProps('content', 'Content', { multiline: true, minRows: 5 })} />

                        <Divider sx={{ my: 3, borderColor: 'rgba(15,15,26,0.06)' }} />

                        <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>Media & Settings</Typography>
                        <TextField {...fieldProps('image', 'Image URL (optional)', { placeholder: 'https://…' })} />
                        <Box sx={{ mt: 2.5, px: 2.5, py: 1.75, borderRadius: '10px', border: '1px solid rgba(15,15,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: form.isPublished ? '#f0fdf4' : '#f8fafc', transition: 'background-color 0.2s ease' }}>
                            <Box>
                                <Typography fontSize={13.5} fontWeight={600} sx={{ color: form.isPublished ? '#15803d' : '#374151', lineHeight: 1.3 }}>
                                    {form.isPublished ? 'Enabled' : 'Disabled'}
                                </Typography>
                                <Typography fontSize={12} sx={{ color: '#94a3b8', lineHeight: 1.4 }}>
                                    {form.isPublished ? 'Visible on the public articles page.' : 'Hidden from the public site.'}
                                </Typography>
                            </Box>
                            <Switch name="isPublished" checked={form.isPublished} onChange={handleChange} color="success" />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: 3.5, py: 2.25, borderTop: '1px solid rgba(15,15,26,0.07)', gap: 1 }}>
                        <Button variant="outlined" onClick={closeModal} sx={{ textTransform: 'none', fontWeight: 500, borderRadius: '50px', px: 2.5, borderColor: 'rgba(15,15,26,0.2)', color: '#374151', '&:hover': { bgcolor: '#f3f4f6' } }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '50px', px: 3.5, background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', boxShadow: '0 4px 12px rgba(37,99,235,0.28)', '&:hover': { background: 'linear-gradient(135deg,#1e40af,#1d4ed8)', transform: 'translateY(-1px)' } }}>
                            {modal.id ? 'Update Article' : 'Save Article'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default DashArticleListPage;
