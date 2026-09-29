import { Alert, Box, Button, Divider, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import EditorShell, { FieldGroup, Grid2, SectionCard, WhenLoaded, newId, useDraft } from '../../components/admin/EditorShell';
import RepeatableList from '../../components/admin/RepeatableList';
import ImageUploader from '../../components/admin/ImageUploader';
import { Text, UrlField, TagsField } from '../../components/admin/fields';
import { useMedia } from '../../context/MediaContext';
import { usePortfolioAdmin } from '../../context/PortfolioContext';
import { normalizeProject, allSlots } from '../../data/projects';
import { bundledLogos, projectLogoSrc } from '../../components/portfolio/logos';

const blankProject = () => normalizeProject({ id: newId('p') });

const validate = ({ projects }) => {
    const unnamed = projects.findIndex((p) => !p.name?.trim());
    if (unnamed !== -1) return `Project #${unnamed + 1} needs a name.`;
    return null;
};

const slotsOf = (d) => d.projects.flatMap(allSlots);

// Projects are one list now; retire the old separate "featured project" section
const toPayload = (d) => ({ projects: d.projects, featuredProject: { retired: true } });

const ProjectFields = ({ project: p, update, setFeatured, toggleArchived, savedIds }) => (
    <Stack spacing={3.5}>
        <Box sx={{ display: 'grid', gap: 3.5, gridTemplateColumns: { xs: '1fr', lg: '1.35fr 1fr' } }}>
            <Stack spacing={3.5}>
                <FieldGroup title="Basics">
                    <Grid2>
                        <Text label="Project name" required value={p.name} onChange={(v) => update({ name: v })} />
                        <Text label="Tagline" value={p.tagline} onChange={(v) => update({ tagline: v })} helperText="Short label, e.g. Predictive health platform" />
                    </Grid2>
                    <Text label="Subtitle" value={p.subtitle} onChange={(v) => update({ subtitle: v })} helperText="Full title, shown under the name" />
                    <Text label="Context" value={p.context} onChange={(v) => update({ context: v })} helperText="e.g. Capstone Project · National University · 2025 – 2026" />
                    <Text label="Description" multiline minRows={3} value={p.description} onChange={(v) => update({ description: v })} />
                </FieldGroup>

                <FieldGroup title="Case study facts">
                    <Grid2>
                        <Text label="My role" value={p.role} onChange={(v) => update({ role: v })} />
                        <Text label="Technology (summary)" value={p.technologySummary} onChange={(v) => update({ technologySummary: v })} helperText="e.g. MERN Stack and Flutter" />
                    </Grid2>
                    <Text label="Focus" value={p.focus} onChange={(v) => update({ focus: v })} helperText="e.g. Predictive Analytics · Software Testing" />
                    <Text label="Key contribution" multiline minRows={2} value={p.contribution} onChange={(v) => update({ contribution: v })} />
                    <TagsField label="Technologies" value={p.tech} onChange={(v) => update({ tech: v })} />
                </FieldGroup>

                <FieldGroup title="Links">
                    <Grid2>
                        <UrlField label="GitHub link" value={p.github} onChange={(v) => update({ github: v })} />
                        <UrlField label="Live demo link" value={p.demo} onChange={(v) => update({ demo: v })} />
                    </Grid2>
                </FieldGroup>
            </Stack>

            <FieldGroup title="Images">
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '112px 1fr', alignItems: 'start' }}>
                    <ImageUploader slot={p.media.logo} label="Logo" aspect="1 / 1" compact emptyText="No logo" fallbackSrc={bundledLogos[p.id]} />
                    <Typography variant="caption" color="text.secondary" sx={{ pt: 3.5, lineHeight: 1.5 }}>
                        Square works best; any size is fine. Shown next to the project name. Without one, the project's initial is used.
                    </Typography>
                </Box>
                <ImageUploader slot={p.media.web} label="Desktop / web screenshot" hint="Any size or shape — shown in full, never cropped. Full-page captures scroll on hover." emptyText="No screenshot — a built-in preview is shown" />
                <Box sx={{ maxWidth: 200 }}>
                    <ImageUploader slot={p.media.mobile} label="Mobile screenshot" aspect="9 / 16" hint="Optional. Shown in a phone frame." emptyText="No mobile view" />
                </Box>
            </FieldGroup>
        </Box>

        <Divider />

        <FieldGroup title="My responsibilities">
            <RepeatableList
                items={p.responsibilities}
                onChange={(v) => update({ responsibilities: v })}
                newItem={() => ({ title: '', body: '' })}
                itemTitle={(r, i) => r.title || `Responsibility ${i + 1}`}
                addLabel="Add responsibility"
                emptyText="No responsibilities listed — the section is hidden on the site."
                renderItem={(r, u) => (
                    <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', md: '220px 1fr' } }}>
                        <Text label="Title" value={r.title} onChange={(v) => u({ title: v })} />
                        <Text label="Description" multiline value={r.body} onChange={(v) => u({ body: v })} />
                    </Box>
                )}
            />
        </FieldGroup>

        <Divider />

        {p.archived && (
            <Alert severity="warning">This project is archived — it's hidden from the site (including its case-study page). Unarchive it to show it again.</Alert>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
            <FormControlLabel
                disabled={p.archived}
                control={<Switch checked={p.featured && !p.archived} onChange={(e) => e.target.checked && setFeatured(p.id)} />}
                label={
                    <Box>
                        <Typography variant="body2" fontWeight={600}>Featured project</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {p.archived ? 'Archived projects can’t be featured.' : 'Shown large on the Projects page and in the home-page hero. Only one project can be featured.'}
                        </Typography>
                    </Box>
                }
            />
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                {savedIds.has(p.id) && !p.archived && (
                    <Button href={`/projects/${p.id}`} target="_blank" endIcon={<OpenInNewIcon fontSize="small" />}>
                        View case study
                    </Button>
                )}
                <Button
                    variant="outlined"
                    color={p.archived ? 'primary' : 'warning'}
                    startIcon={p.archived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
                    onClick={() => toggleArchived(p.id)}
                >
                    {p.archived ? 'Unarchive' : 'Archive'}
                </Button>
            </Stack>
        </Stack>
    </Stack>
);

const ProjectsEditor = () => {
    const editor = useDraft(['projects'], { validate, slotsOf, toPayload });
    const { draft, set } = editor;
    const { media } = useMedia();
    const { content } = usePortfolioAdmin();
    const savedIds = new Set(content.projects.map((p) => p.id));

    const setFeatured = (id) => set('projects', (list) => list.map((p) => ({ ...p, featured: p.id === id })));

    // Archiving the featured project hands "featured" to the first visible project
    const toggleArchived = (id) => set('projects', (list) => {
        const next = list.map((p) => (p.id === id ? { ...p, archived: !p.archived, featured: p.archived && p.featured } : p));
        if (!next.some((p) => p.featured && !p.archived)) {
            const first = next.findIndex((p) => !p.archived);
            if (first !== -1) next[first] = { ...next[first], featured: true };
        }
        return next;
    });

    const visible = draft.projects.filter((p) => !p.archived);

    return (
        <EditorShell
            title="Projects"
            description="Every project gets its own case-study page. Photos are saved with their own Save photo button; other changes, including archiving, go live when you save."
            editor={editor}
            viewHref="/#projects"
        >
            {draft.projects.length > 0 && !visible.length && (
                <Alert severity="warning" sx={{ mb: 2.5 }}>All projects are archived — the Projects page will be empty.</Alert>
            )}
            {visible.length > 0 && !visible.some((p) => p.featured) && (
                <Alert severity="info" sx={{ mb: 2.5 }}>No project is marked as featured — the first one will be featured.</Alert>
            )}

            <SectionCard title="Your projects" description="Shown in this order. Click a project to edit it.">
                <RepeatableList
                    collapsible
                    items={draft.projects}
                    onChange={(v) => set('projects', v)}
                    newItem={blankProject}
                    itemTitle={(p, i) => p.name || `New project ${i + 1}`}
                    addLabel="Add project"
                    emptyText="No projects yet — add your first one."
                    renderSummary={(p) => ({
                        avatar: projectLogoSrc(p, media, 96) ?? '',
                        subtitle: [p.tagline, p.role].filter(Boolean).join(' · ') || 'No details yet',
                        chips: [
                            p.archived && { label: 'Archived', color: 'default', variant: 'filled', icon: <ArchiveOutlinedIcon /> },
                            p.featured && !p.archived && { label: 'Featured', color: 'secondary', variant: 'filled', icon: <StarRoundedIcon /> },
                            !p.archived && !media[p.media.web]?.url && { label: 'No screenshot', color: 'warning' },
                            !savedIds.has(p.id) && { label: 'Not saved yet', color: 'info' },
                        ].filter(Boolean),
                    })}
                    renderItem={(p, update) => <ProjectFields project={p} update={update} setFeatured={setFeatured} toggleArchived={toggleArchived} savedIds={savedIds} />}
                />
            </SectionCard>
        </EditorShell>
    );
};

const DashProjectsPage = () => <WhenLoaded><ProjectsEditor /></WhenLoaded>;

export default DashProjectsPage;
