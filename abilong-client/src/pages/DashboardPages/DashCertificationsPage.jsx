import { Box, Stack } from '@mui/material';
import EditorShell, { Grid2, SectionCard, WhenLoaded, newId, useDraft } from '../../components/admin/EditorShell';
import RepeatableList from '../../components/admin/RepeatableList';
import ImageUploader from '../../components/admin/ImageUploader';
import { Text, UrlField, TagsField } from '../../components/admin/fields';
import { useMedia } from '../../context/MediaContext';
import { cloudinaryUrl } from '../../services/MediaService';

const blankCert = () => {
    const id = newId('c');
    return { id, name: '', issuer: '', year: '', link: '', media: `cert-${id.slice(2)}` };
};

const validate = ({ certifications }) => {
    const i = certifications.findIndex((c) => !c.name?.trim());
    return i === -1 ? null : `Certification #${i + 1} needs a name.`;
};

const slotsOf = (d) => d.certifications.map((c) => c.media);

const CertificationsEditor = () => {
    const editor = useDraft(['certifications', 'learningAreas'], { validate, slotsOf });
    const { draft, set } = editor;
    const { media } = useMedia();

    return (
        <EditorShell
            title="Certifications"
            description="Credentials on the Skills page. Photos are saved with their own Save photo button; other changes, including the order, go live when you save."
            viewHref="/#certifications"
            editor={editor}
        >
            <SectionCard title="Credentials" description="Shown as cards in this order — drag a row by its handle (or use the arrows) to reorder. Click one to edit it. While the list is empty, the site shows your learning track instead.">
                <RepeatableList
                    collapsible
                    sortable
                    renderSummary={(c) => ({
                        avatar: media[c.media]?.url ? cloudinaryUrl(media[c.media].url, 120) : '',
                        subtitle: [c.issuer, c.year].filter(Boolean).join(' · ') || 'No issuer yet',
                        chips: [
                            !c.link && { label: 'No link', color: 'warning' },
                        ].filter(Boolean),
                    })}
                    items={draft.certifications}
                    onChange={(v) => set('certifications', v)}
                    newItem={blankCert}
                    itemTitle={(c, i) => c.name || `New certification ${i + 1}`}
                    addLabel="Add certification"
                    emptyText="No certifications added yet."
                    renderItem={(c, update) => (
                        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' } }}>
                            <Stack spacing={2}>
                                <Text label="Certification name" required value={c.name} onChange={(v) => update({ name: v })} />
                                <Text label="Issuing organization" value={c.issuer} onChange={(v) => update({ issuer: v })} />
                                <Grid2>
                                    <Text label="Year" value={c.year} onChange={(v) => update({ year: v })} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 9 } }} />
                                </Grid2>
                                <UrlField label="Credential link" value={c.link} onChange={(v) => update({ link: v })} helperText="Verification page or the certificate file on Google Drive" />
                            </Stack>
                            <ImageUploader slot={c.media} label="Certificate image" aspect="4 / 3" hint="Any size — shown in full. A photo or export of the certificate (PNG, JPG, or WebP)." emptyText="No image — the card shows text only" />
                        </Box>
                    )}
                />
            </SectionCard>

            <SectionCard title="Learning track" description="Shown while no certifications are listed.">
                <TagsField label="Areas" value={draft.learningAreas} onChange={(v) => set('learningAreas', v)} />
            </SectionCard>
        </EditorShell>
    );
};

const DashCertificationsPage = () => <WhenLoaded><CertificationsEditor /></WhenLoaded>;

export default DashCertificationsPage;
