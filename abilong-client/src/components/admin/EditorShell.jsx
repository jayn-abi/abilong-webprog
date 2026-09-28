import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { Alert, Box, Button, Chip, CircularProgress, Paper, Snackbar, Stack, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useMedia } from '../../context/MediaContext';
import { usePortfolioAdmin } from '../../context/PortfolioContext';
import { deleteMedia } from '../../services/MediaService';
import { errorMessage } from './ImageUploader';
import { gradientButtonSx } from './adminTheme';

const clone = (v) => JSON.parse(JSON.stringify(v));

/*
 * Local draft of some portfolio sections.
 *   validate(draft)  → error message or null
 *   slotsOf(draft)   → image slots the draft uses; images of removed items
 *                      are deleted after a successful save
 *   toPayload(draft) → what to send (defaults to the draft itself)
 */
export const useDraft = (keys, { validate, slotsOf, toPayload } = {}) => {
    const { content, saveSections } = usePortfolioAdmin();
    const { media, setSlot } = useMedia();
    const pick = () => clone(Object.fromEntries(keys.map((k) => [k, content[k]])));
    const [draft, setDraft] = useState(pick);
    const [baseline, setBaseline] = useState(() => JSON.stringify(draft));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [justSaved, setJustSaved] = useState(false);

    const dirty = JSON.stringify(draft) !== baseline;

    const set = (key, value) =>
        setDraft((d) => ({ ...d, [key]: typeof value === 'function' ? value(d[key]) : value }));

    const save = async () => {
        const problem = validate?.(draft);
        if (problem) { setError(problem); return; }
        setSaving(true);
        setError('');
        try {
            await saveSections(toPayload ? toPayload(draft) : draft);
            if (slotsOf) {
                const keep = new Set(slotsOf(draft));
                const removed = slotsOf(JSON.parse(baseline)).filter((s) => s && !keep.has(s) && media[s]);
                await Promise.allSettled(removed.map((s) => deleteMedia(s).then(() => setSlot(s, null))));
            }
            setBaseline(JSON.stringify(draft));
            setJustSaved(true);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    const discard = () => {
        if (window.confirm('Discard all unsaved changes on this page?')) { setDraft(JSON.parse(baseline)); setError(''); }
    };

    return { draft, set, dirty, saving, error, setError, justSaved, setJustSaved, save, discard };
};

/* Page frame: sticky header with save/discard, and unsaved-changes protection. */
const EditorShell = ({ title, description, editor, viewHref = '/', children }) => {
    const { dirty, saving, error, setError, justSaved, setJustSaved, save, discard } = editor;

    // Warn before leaving with unsaved changes (tab close / in-app navigation)
    useEffect(() => {
        if (!dirty) return;
        const onBeforeUnload = (e) => { e.preventDefault(); e.returnValue = ''; };
        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, [dirty]);

    const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && currentLocation.pathname !== nextLocation.pathname);
    useEffect(() => {
        if (blocker.state !== 'blocked') return;
        if (window.confirm('You have unsaved changes. Leave without saving?')) blocker.proceed();
        else blocker.reset();
    }, [blocker]);

    // Ctrl/⌘ + S saves
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                if (dirty && !saving) save();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [dirty, saving, save]);

    return (
        <Box sx={{ maxWidth: 1100, mx: 'auto', pb: 8 }}>
            {/* Sticky header */}
            <Box
                sx={{
                    position: 'sticky', top: { xs: 56, sm: 64 }, zIndex: 5,
                    mx: { xs: -2, sm: -3 }, px: { xs: 2, sm: 3 }, py: 1.75, mb: 3,
                    bgcolor: 'rgba(245,245,250,0.92)', backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(15,15,26,0.07)',
                }}
            >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between' }}>
                    <Box sx={{ minWidth: 0 }}>
                        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                            <Typography variant="h5" component="h1">{title}</Typography>
                            {dirty
                                ? <Chip size="small" color="warning" label="Unsaved changes" />
                                : <Chip size="small" variant="outlined" icon={<CheckCircleOutlineIcon />} label="All changes saved" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'inline-flex' } }} />}
                        </Stack>
                        {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, maxWidth: 640 }}>{description}</Typography>}
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0, alignItems: 'center' }}>
                        <Button href={viewHref} target="_blank" endIcon={<OpenInNewIcon fontSize="small" />} color="primary">
                            View site
                        </Button>
                        <Button startIcon={<UndoOutlinedIcon />} disabled={!dirty || saving} onClick={discard} color="inherit" variant="outlined" sx={{ borderColor: 'rgba(15,15,26,0.18)' }}>
                            Discard
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveOutlinedIcon />}
                            disabled={!dirty || saving}
                            onClick={save}
                            sx={{ ...gradientButtonSx, px: 2.5 }}
                        >
                            {saving ? 'Saving…' : 'Save changes'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setError('')}>{error}</Alert>}

            {children}

            <Snackbar open={justSaved} autoHideDuration={3000} onClose={() => setJustSaved(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" variant="filled" onClose={() => setJustSaved(false)}>Saved — your portfolio is updated.</Alert>
            </Snackbar>
        </Box>
    );
};

export const SectionCard = ({ title, description, action, children }) => (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: '16px' }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h6" component="h2" sx={{ fontSize: 17 }}>{title}</Typography>
                {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>}
            </Box>
            {action}
        </Stack>
        <Box sx={{ mt: 2.5 }}>{children}</Box>
    </Paper>
);

// Labelled group of fields inside an item editor
export const FieldGroup = ({ title, children }) => (
    <Box>
        <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1, mb: 1.5 }}>
            {title}
        </Typography>
        <Stack spacing={2}>{children}</Stack>
    </Box>
);

// Waits for saved content before an editor mounts, so drafts start from it
export const WhenLoaded = ({ children }) => {
    const { loaded } = usePortfolioAdmin();
    const { loaded: mediaLoaded } = useMedia();
    return loaded && mediaLoaded
        ? children
        : <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress size={28} /></Box>;
};

export const newId = (prefix) => `${prefix}-${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(2, 6)}`;

export const Grid2 = ({ children }) => (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>{children}</Box>
);

export default EditorShell;
