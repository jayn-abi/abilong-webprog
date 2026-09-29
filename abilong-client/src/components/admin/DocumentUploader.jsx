import { useRef, useState } from 'react';
import { Alert, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { gradientButtonSx } from './adminTheme';
import { errorMessage } from './ImageUploader';
import { useMedia } from '../../context/MediaContext';
import { uploadToCloudinary, saveMedia, deleteMedia } from '../../services/MediaService';

const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary free-plan file limit

const formatSize = (bytes) => (bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

// A real PDF starts with "%PDF-", whatever its name or reported type says
const isPdf = async (file) => {
    const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    return String.fromCharCode(...head) === '%PDF-';
};

/*
 * Uploads one PDF (CV, transcript) for a media slot. Choosing a file only
 * stages it; "Save file" uploads it, and until then the saved file stays.
 * Removals take effect immediately. `fallbackHref` is the link used while
 * nothing is uploaded.
 */
const DocumentUploader = ({ slot, label, fallbackHref }) => {
    const { media, setSlot } = useMedia();
    const inputRef = useRef(null);
    const [pending, setPending] = useState(null);
    const [progress, setProgress] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const item = media[slot];

    const choose = async (file) => {
        if (!file) return;
        setError('');
        if (file.size > MAX_BYTES) return setError(`This PDF is ${formatSize(file.size)}. The limit is 10 MB.`);
        if (!(await isPdf(file))) return setError('Please choose a PDF file.');
        setPending(file);
    };

    const save = async () => {
        setError('');
        setBusy(true);
        setProgress(0);
        try {
            const uploaded = await uploadToCloudinary(slot, pending, setProgress);
            const { data } = await saveMedia(slot, {
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
                bytes: uploaded.bytes,
                fileName: pending.name,
            });
            setSlot(slot, data);
            setPending(null);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setBusy(false);
            setProgress(null);
        }
    };

    const remove = async () => {
        if (!window.confirm(`Remove the uploaded ${label}? This happens immediately${fallbackHref ? ' — the link below is used instead' : ''}.`)) return;
        setBusy(true);
        setError('');
        try {
            await deleteMedia(slot);
            setSlot(slot, null);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const status = pending
        ? { title: pending.name, sub: `${formatSize(pending.size)} · not saved yet`, tone: 'warning.main' }
        : item?.url
            ? { title: item.fileName || `${label}.pdf`, sub: [item.bytes && formatSize(item.bytes), item.updatedAt && `uploaded ${new Date(item.updatedAt).toLocaleDateString()}`].filter(Boolean).join(' · '), tone: 'success.main' }
            : { title: 'No PDF uploaded', sub: fallbackHref ? 'The link below is used instead' : 'Shown as “Available on request”', tone: 'text.secondary' };

    return (
        <Box sx={{ border: '1px solid', borderColor: pending ? 'warning.main' : 'rgba(15,15,26,0.12)', borderRadius: '12px', p: 2 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1.25 }}>{label}</Typography>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
                <PictureAsPdfOutlinedIcon sx={{ color: status.tone, flexShrink: 0 }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" noWrap>{status.title}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>{status.sub}</Typography>
                </Box>
            </Stack>
            {progress !== null && <LinearProgress variant="determinate" value={progress} sx={{ mt: 1.5, borderRadius: 1 }} />}
            {error && <Alert severity="error" sx={{ mt: 1.5 }} onClose={() => setError('')}>{error}</Alert>}
            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
                <input ref={inputRef} type="file" accept="application/pdf,.pdf" hidden onChange={(e) => { choose(e.target.files?.[0]); e.target.value = ''; }} />
                {pending ? (
                    <>
                        <Button size="small" variant="contained" startIcon={<SaveOutlinedIcon />} disabled={busy} onClick={save} sx={gradientButtonSx}>Save file</Button>
                        <Button size="small" disabled={busy} onClick={() => setPending(null)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button size="small" variant="contained" startIcon={<UploadFileOutlinedIcon />} disabled={busy} onClick={() => inputRef.current?.click()} sx={gradientButtonSx}>
                            {item?.url ? 'Replace PDF' : 'Upload PDF'}
                        </Button>
                        {item?.url && (
                            <>
                                <Button size="small" href={item.url} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNewIcon fontSize="small" />}>View</Button>
                                <Button size="small" color="error" startIcon={<DeleteOutlinedIcon />} disabled={busy} onClick={remove}>Remove</Button>
                            </>
                        )}
                    </>
                )}
            </Stack>
        </Box>
    );
};

export default DocumentUploader;
