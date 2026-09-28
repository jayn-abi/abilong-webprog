import { useState } from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import EditorShell, { Grid2, SectionCard, WhenLoaded, useDraft } from '../../components/admin/EditorShell';
import RepeatableList from '../../components/admin/RepeatableList';
import { Text, UrlField, TagsField, ListTextField } from '../../components/admin/fields';

const KEYS = ['profile', 'links', 'about', 'contact', 'skillGroups', 'experience', 'leadership', 'education'];
const TABS = ['Profile & links', 'About', 'Skills', 'Experience', 'Education', 'Contact'];

const validate = ({ profile }) => (!profile.name?.trim() ? 'Your name cannot be empty.' : null);

const TimelineFields = ({ item, update }) => (
    <Stack spacing={2}>
        <Text label="Role / title" value={item.role} onChange={(v) => update({ role: v })} />
        <Grid2>
            <Text label="Organization" value={item.org} onChange={(v) => update({ org: v })} />
            <Text label="Period" value={item.period} onChange={(v) => update({ period: v })} helperText="e.g. 2022 – 2023" />
        </Grid2>
        <ListTextField label="Highlights" helperText="One bullet point per line" value={item.points} onChange={(v) => update({ points: v })} />
        <TagsField label="Tags" value={item.tags} onChange={(v) => update({ tags: v })} />
    </Stack>
);

const ContentEditor = () => {
    const editor = useDraft(KEYS, { validate });
    const { draft, set } = editor;
    const [tab, setTab] = useState(0);
    const patch = (key) => (p) => set(key, (prev) => ({ ...prev, ...p }));
    const profile = patch('profile');
    const links = patch('links');
    const about = patch('about');
    const contact = patch('contact');

    return (
        <EditorShell
            title="Site content"
            description="Everything on the portfolio apart from projects and certifications. All tabs are saved together."
            editor={editor}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto"
                    sx={{ '& .MuiTab-root': { fontWeight: 600, minHeight: 44 }, '& .MuiTabs-indicator': { height: 3, borderRadius: 3, background: 'linear-gradient(90deg, #00d4ff, #a855f7)' } }}>
                    {TABS.map((t) => <Tab key={t} label={t} />)}
                </Tabs>
            </Box>

            {tab === 0 && (
                <>
                    <SectionCard title="Profile" description="Your name and positioning in the hero and navigation.">
                        <Stack spacing={2}>
                            <Grid2>
                                <Text label="Full name" required value={draft.profile.name} onChange={(v) => profile({ name: v })} />
                                <Text label="Initials (logo)" value={draft.profile.initials} onChange={(v) => profile({ initials: v })} slotProps={{ htmlInput: { maxLength: 4 } }} />
                            </Grid2>
                            <Grid2>
                                <Text label="Title" value={draft.profile.title} onChange={(v) => profile({ title: v })} />
                                <Text label="Nav tagline" value={draft.profile.tagline} onChange={(v) => profile({ tagline: v })} />
                            </Grid2>
                            <Text label="Supporting text" multiline minRows={2} value={draft.profile.summary} onChange={(v) => profile({ summary: v })} />
                            <TagsField label="Focus areas" value={draft.profile.focus} onChange={(v) => profile({ focus: v })} />
                            <Grid2>
                                <Text label="Location" value={draft.profile.location} onChange={(v) => profile({ location: v })} />
                                <Text label="Availability" value={draft.profile.availability} onChange={(v) => profile({ availability: v })} helperText="e.g. Open to internships" />
                            </Grid2>
                        </Stack>
                    </SectionCard>
                    <SectionCard title="Links & documents" description="Leave a link empty to hide it (documents show “Available on request”).">
                        <Stack spacing={2}>
                            <Text label="Email" type="email" value={draft.links.email} onChange={(v) => links({ email: v })} />
                            <Grid2>
                                <UrlField label="LinkedIn" value={draft.links.linkedin} onChange={(v) => links({ linkedin: v })} />
                                <UrlField label="GitHub" value={draft.links.github} onChange={(v) => links({ github: v })} />
                            </Grid2>
                            <UrlField label="CV" value={draft.links.cv} onChange={(v) => links({ cv: v })} helperText="/Abilong-CV.pdf is the file in the site's public folder, or paste a Drive link" />
                            <Grid2>
                                <UrlField label="Transcript of Records" value={draft.links.transcript} onChange={(v) => links({ transcript: v })} />
                                <UrlField label="Certificates folder" value={draft.links.certificates} onChange={(v) => links({ certificates: v })} />
                            </Grid2>
                            <UrlField label="Video introduction" value={draft.links.video} onChange={(v) => links({ video: v })} />
                        </Stack>
                    </SectionCard>
                </>
            )}

            {tab === 1 && (
                <SectionCard title="About">
                    <Stack spacing={2}>
                        <ListTextField mode="paragraphs" label="About text" helperText="Separate paragraphs with a blank line" value={draft.about.paragraphs} onChange={(v) => about({ paragraphs: v })} />
                        <Text label="Languages" value={draft.about.languages} onChange={(v) => about({ languages: v })} />
                        <RepeatableList
                            items={draft.about.interests ?? []}
                            onChange={(v) => about({ interests: v })}
                            newItem={() => ({ title: '', body: '' })}
                            itemTitle={(it, i) => it.title || `Interest ${i + 1}`}
                            addLabel="Add interest"
                            renderItem={(it, update) => (
                                <Stack spacing={2}>
                                    <Text label="Title" value={it.title} onChange={(v) => update({ title: v })} />
                                    <Text label="Description" value={it.body} onChange={(v) => update({ body: v })} />
                                </Stack>
                            )}
                        />
                    </Stack>
                </SectionCard>
            )}

            {tab === 2 && (
                <SectionCard title="Skill groups" description="Only list skills backed by your coursework, projects, or work.">
                    <RepeatableList
                        collapsible
                        renderSummary={(g) => ({ subtitle: (g.items ?? []).join(' · ') || 'No skills yet', chips: [{ label: `${(g.items ?? []).length} skills` }] })}
                        items={draft.skillGroups}
                        onChange={(v) => set('skillGroups', v)}
                        newItem={() => ({ title: '', items: [] })}
                        itemTitle={(g, i) => g.title || `Group ${i + 1}`}
                        addLabel="Add skill group"
                        renderItem={(g, update) => (
                            <Stack spacing={2}>
                                <Text label="Group name" value={g.title} onChange={(v) => update({ title: v })} />
                                <TagsField label="Skills" value={g.items} onChange={(v) => update({ items: v })} />
                            </Stack>
                        )}
                    />
                </SectionCard>
            )}

            {tab === 3 && (
                <>
                    <SectionCard title="Work experience">
                        <RepeatableList
                            collapsible
                            renderSummary={(e) => ({ subtitle: [e.period, `${(e.points ?? []).length} highlights`].filter(Boolean).join(' · ') })}
                            items={draft.experience}
                            onChange={(v) => set('experience', v)}
                            newItem={() => ({ role: '', org: '', period: '', points: [], tags: [] })}
                            itemTitle={(e, i) => [e.role, e.org].filter(Boolean).join(' — ') || `Experience ${i + 1}`}
                            addLabel="Add experience"
                            renderItem={(item, update) => <TimelineFields item={item} update={update} />}
                        />
                    </SectionCard>
                    <SectionCard title="Leadership">
                        <RepeatableList
                            collapsible
                            renderSummary={(e) => ({ subtitle: [e.period, `${(e.points ?? []).length} highlights`].filter(Boolean).join(' · ') })}
                            items={draft.leadership}
                            onChange={(v) => set('leadership', v)}
                            newItem={() => ({ role: '', org: '', period: '', points: [], tags: [] })}
                            itemTitle={(e, i) => [e.role, e.org].filter(Boolean).join(' — ') || `Leadership ${i + 1}`}
                            addLabel="Add leadership role"
                            renderItem={(item, update) => <TimelineFields item={item} update={update} />}
                        />
                    </SectionCard>
                </>
            )}

            {tab === 4 && (
                <SectionCard title="Education" description="The first entry is used in the hero and About summaries.">
                    <RepeatableList
                        collapsible
                        renderSummary={(e) => ({ subtitle: e.period || 'No period set' })}
                        items={draft.education}
                        onChange={(v) => set('education', v)}
                        newItem={() => ({ degree: '', detail: '', school: '', period: '' })}
                        itemTitle={(e, i) => [e.degree, e.school].filter(Boolean).join(' — ') || `Education ${i + 1}`}
                        addLabel="Add education"
                        renderItem={(ed, update) => (
                            <Stack spacing={2}>
                                <Text label="Degree / program" value={ed.degree} onChange={(v) => update({ degree: v })} />
                                <Grid2>
                                    <Text label="School" value={ed.school} onChange={(v) => update({ school: v })} />
                                    <Text label="Period" value={ed.period} onChange={(v) => update({ period: v })} />
                                </Grid2>
                                <Text label="Detail (optional)" value={ed.detail} onChange={(v) => update({ detail: v })} />
                            </Stack>
                        )}
                    />
                </SectionCard>
            )}

            {tab === 5 && (
                <SectionCard title="Contact section" description="Email, LinkedIn, and GitHub come from the Links & documents fields.">
                    <Stack spacing={2}>
                        <Text label="Headline" value={draft.contact.headline} onChange={(v) => contact({ headline: v })} />
                        <Text label="Supporting text" multiline minRows={2} value={draft.contact.body} onChange={(v) => contact({ body: v })} />
                    </Stack>
                </SectionCard>
            )}
        </EditorShell>
    );
};

const DashContentPage = () => <WhenLoaded><ContentEditor /></WhenLoaded>;

export default DashContentPage;
