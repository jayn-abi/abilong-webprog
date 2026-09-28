import { useState } from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Chip,
    IconButton, Paper, Stack, Tooltip, Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const move = (list, from, to) => {
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
};

/*
 * Ordered list editor.
 *   renderItem(item, update, index) — the item's fields; update(patch) merges changes
 *   itemTitle(item, index)          — label used in the header and confirmations
 *   collapsible + renderSummary     — show each item as a collapsible row with a
 *                                     summary: { avatar, subtitle, chips: [{ label, color }] }
 */
const RepeatableList = ({
    items = [], onChange, newItem, renderItem, itemTitle,
    addLabel = 'Add item', emptyText = 'Nothing here yet.',
    collapsible = false, renderSummary,
}) => {
    const keyOf = (item, index) => item.id ?? `i-${index}`;
    const [expanded, setExpanded] = useState(() => new Set());

    const update = (index) => (patch) =>
        onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

    const remove = (index) => {
        if (window.confirm(`Remove "${itemTitle(items[index], index)}"? This takes effect when you save.`)) {
            onChange(items.filter((_, i) => i !== index));
        }
    };

    const add = () => {
        const item = newItem();
        onChange([...items, item]);
        setExpanded((prev) => new Set(prev).add(keyOf(item, items.length)));
    };

    const toggle = (key) => setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key); else next.add(key);
        return next;
    });

    const controls = (index) => (
        <Stack direction="row" spacing={0.25} onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()} sx={{ flexShrink: 0 }}>
            <Tooltip title="Move up">
                <span><IconButton size="small" disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} aria-label="Move up"><ArrowUpwardIcon fontSize="small" /></IconButton></span>
            </Tooltip>
            <Tooltip title="Move down">
                <span><IconButton size="small" disabled={index === items.length - 1} onClick={() => onChange(move(items, index, index + 1))} aria-label="Move down"><ArrowDownwardIcon fontSize="small" /></IconButton></span>
            </Tooltip>
            <Tooltip title="Remove">
                <IconButton size="small" color="error" onClick={() => remove(index)} aria-label="Remove"><DeleteOutlinedIcon fontSize="small" /></IconButton>
            </Tooltip>
        </Stack>
    );

    return (
        <Stack spacing={1.5}>
            {items.length === 0 && (
                <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', borderStyle: 'dashed', borderRadius: '14px', bgcolor: 'transparent' }}>
                    <Typography variant="body2" color="text.secondary">{emptyText}</Typography>
                </Paper>
            )}

            {items.map((item, index) => {
                const key = keyOf(item, index);
                const title = itemTitle(item, index);

                if (!collapsible) {
                    return (
                        <Paper key={key} variant="outlined" sx={{ p: 2, borderRadius: '12px' }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                                <Typography variant="body2" fontWeight={600} sx={{ flex: 1, minWidth: 0 }} noWrap>{title}</Typography>
                                {controls(index)}
                            </Stack>
                            {renderItem(item, update(index), index)}
                        </Paper>
                    );
                }

                const summary = renderSummary?.(item, index) ?? {};
                return (
                    <Accordion key={key} expanded={expanded.has(key)} onChange={() => toggle(key)} slotProps={{ transition: { unmountOnExit: true } }}>
                        <AccordionSummary component="div" expandIcon={<ExpandMoreIcon />} sx={{ px: 2, '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5, minWidth: 0, my: 1.25 } }}>
                            {summary.avatar !== undefined && (
                                <Avatar variant="rounded" src={summary.avatar || undefined} sx={{ width: 40, height: 40, bgcolor: summary.avatar ? '#fff' : 'secondary.main', border: '1px solid rgba(15,15,26,0.1)', '& img': { objectFit: 'contain' } }}>
                                    {(title || '?').charAt(0).toUpperCase()}
                                </Avatar>
                            )}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography fontWeight={600} noWrap>{title}</Typography>
                                {summary.subtitle && <Typography variant="body2" color="text.secondary" noWrap>{summary.subtitle}</Typography>}
                            </Box>
                            <Stack direction="row" spacing={0.75} sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0 }}>
                                {(summary.chips ?? []).map((c) => <Chip key={c.label} size="small" icon={c.icon} label={c.label} color={c.color ?? 'default'} variant={c.variant ?? 'outlined'} />)}
                            </Stack>
                            {controls(index)}
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: { xs: 2, sm: 3 }, pb: 3, pt: 2, borderTop: '1px solid rgba(15,15,26,0.06)' }}>
                            {renderItem(item, update(index), index)}
                        </AccordionDetails>
                    </Accordion>
                );
            })}

            <Box>
                <Button startIcon={<AddIcon />} variant="outlined" onClick={add}>
                    {addLabel}
                </Button>
            </Box>
        </Stack>
    );
};

export default RepeatableList;
