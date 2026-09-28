import { useState } from 'react';
import { Autocomplete, Chip, MenuItem, TextField } from '@mui/material';
import { safeHref } from '../../context/PortfolioContext';

export const Text = ({ value, onChange, ...props }) => (
    <TextField
        size="small"
        fullWidth
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        {...props}
    />
);

export const UrlField = ({ value, onChange, helperText, ...props }) => {
    const invalid = Boolean(value?.trim()) && !safeHref(value);
    return (
        <Text
            value={value}
            onChange={onChange}
            error={invalid}
            helperText={invalid ? 'Use a full link starting with https:// (or a site path like /file.pdf)' : helperText}
            {...props}
        />
    );
};

export const SelectField = ({ value, onChange, options, ...props }) => (
    <Text value={value} onChange={onChange} select {...props}>
        {options.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
    </Text>
);

// Type a value and press Enter (or leave the field) to add it as a tag
export const TagsField = ({ label, value, onChange, helperText, placeholder = 'Type and press Enter' }) => (
    <Autocomplete
        multiple
        freeSolo
        autoSelect
        options={[]}
        value={value ?? []}
        onChange={(_, next) => onChange([...new Set(next.map((s) => s.trim()).filter(Boolean))])}
        renderValue={(tags, getItemProps) =>
            tags.map((tag, index) => {
                const { key, ...itemProps } = getItemProps({ index });
                return <Chip key={key} size="small" label={tag} {...itemProps} />;
            })
        }
        renderInput={(params) => (
            <TextField {...params} size="small" label={label} helperText={helperText} placeholder={placeholder} />
        )}
    />
);

/*
 * Edits an array of strings as free text: one item per line, or one per
 * paragraph (blank-line separated). Keeps the raw text locally so typing
 * a new line doesn't get normalised away mid-edit.
 */
const splitters = {
    lines:      { split: (t) => t.split('\n'),       join: (a) => a.join('\n') },
    paragraphs: { split: (t) => t.split(/\n\s*\n/),  join: (a) => a.join('\n\n') },
};

export const ListTextField = ({ value, onChange, mode = 'lines', ...props }) => {
    const { split, join } = splitters[mode];
    const normalise = (text) => split(text).map((s) => s.trim()).filter(Boolean);
    const [text, setText] = useState(() => join(value ?? []));
    const [prev, setPrev] = useState(value);

    // Resync when the value changes from outside (e.g. "Discard changes")
    if (value !== prev) {
        setPrev(value);
        if (JSON.stringify(normalise(text)) !== JSON.stringify(value ?? [])) setText(join(value ?? []));
    }

    return (
        <TextField
            size="small"
            fullWidth
            multiline
            minRows={mode === 'paragraphs' ? 5 : 3}
            value={text}
            onChange={(e) => { setText(e.target.value); onChange(normalise(e.target.value)); }}
            {...props}
        />
    );
};
