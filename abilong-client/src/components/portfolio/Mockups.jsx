/*
 * Illustrative interface previews, drawn in code so they stay sharp,
 * theme-aware, and weightless. They intentionally use skeleton content
 * (no invented numbers) and are replaced by real screenshots as soon as
 * one is uploaded for the matching media slot.
 */

const Line = ({ w = 'w-full', strong = false, className = '' }) => (
  <div className={`h-1.5 rounded-full ${strong ? 'bg-(--muted)/40' : 'bg-(--border-strong)'} ${w} ${className}`} />
);

const Label = ({ children, className = '' }) => (
  <p className={`text-[9px] font-semibold uppercase tracking-[0.14em] text-(--subtle) ${className}`}>{children}</p>
);

export const BrowserFrame = ({ url, children, className = '' }) => (
  <div className={`flex h-full w-full flex-col overflow-hidden rounded-xl border border-(--border-strong) bg-(--card) ${className}`}>
    <div className="flex items-center gap-2 border-b border-(--border) bg-(--elevated) px-3 py-2">
      <span className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
        <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
        <span className="h-2 w-2 rounded-full bg-(--border-strong)" />
      </span>
      <span className="mx-auto truncate rounded-md bg-(--base) px-3 py-0.5 font-mono text-[9px] text-(--subtle)">{url}</span>
    </div>
    <div className="relative min-h-0 flex-1">{children}</div>
  </div>
);

export const PhoneFrame = ({ children, className = '' }) => (
  <div className={`relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border-[5px] border-(--elevated) bg-(--card) shadow-(--shadow-lift) outline outline-(--border-strong) ${className}`}>
    <div className="flex items-center justify-between px-4 pt-2 pb-1">
      <span className="text-[8px] font-semibold text-(--subtle)">9:41</span>
      <span className="h-3 w-12 rounded-full bg-(--elevated)" />
      <span className="flex gap-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-(--subtle)" />
        <span className="h-1.5 w-3 rounded-sm bg-(--subtle)" />
      </span>
    </div>
    <div className="min-h-0 flex-1">{children}</div>
  </div>
);

/* ── HealthCast ──────────────────────────────────────────────── */

const TrendChart = () => (
  <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
    {[20, 40, 60].map((y) => (
      <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
    ))}
    <path d="M0 58 C20 50 30 62 50 52 S80 30 100 36 S140 20 160 26 S190 14 200 12 L200 80 L0 80 Z" fill="var(--accent-soft)" />
    <path d="M0 58 C20 50 30 62 50 52 S80 30 100 36 S140 20 160 26 S190 14 200 12" fill="none" stroke="var(--accent)" strokeWidth="2" />
    <path d="M0 66 C25 64 35 60 55 62 S85 50 105 48 S145 40 165 34 S190 30 200 28" fill="none" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="4 3" />
  </svg>
);

const RiskGrid = () => {
  const levels = [0, 1, 1, 2, 0, 1, 2, 2, 1, 0, 1, 1, 0, 0, 1, 2];
  const tone = ['bg-(--accent)/15', 'bg-(--accent)/40', 'bg-(--warn)/60'];
  return (
    <div className="grid h-full grid-cols-4 gap-1">
      {levels.map((l, i) => <div key={i} className={`rounded-[3px] ${tone[l]}`} />)}
    </div>
  );
};

export const HealthCastWebMockup = () => (
  <BrowserFrame url="healthcast · risk dashboard">
    <div className="grid h-full grid-cols-[2.25rem_1fr]">
      <aside className="flex flex-col items-center gap-2 border-r border-(--border) bg-(--elevated)/60 py-3">
        <span className="h-4 w-4 rounded-md bg-(--accent)" />
        {[0, 1, 2, 3].map((i) => <span key={i} className="h-3 w-3 rounded bg-(--border-strong)" />)}
      </aside>
      <div className="flex min-w-0 flex-col gap-2.5 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-(--text)">Risk overview</p>
            <Line w="w-20" className="mt-1" />
          </div>
          <span className="rounded-full bg-(--accent-soft) px-2 py-0.5 text-[8px] font-semibold text-(--accent)">Weekly</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Rainfall', 'Temperature', 'Humidity'].map((t) => (
            <div key={t} className="rounded-lg border border-(--border) p-2">
              <Label>{t}</Label>
              <Line w="w-3/4" strong className="mt-1.5" />
              <Line w="w-1/2" className="mt-1" />
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_1fr] gap-2">
          <div className="flex min-h-0 flex-col rounded-lg border border-(--border) p-2">
            <div className="flex items-center gap-3">
              <Label>Trend analysis</Label>
              <span className="ml-auto flex items-center gap-1 text-[8px] text-(--subtle)"><span className="h-1.5 w-3 rounded-full bg-(--accent)" />Weather</span>
              <span className="flex items-center gap-1 text-[8px] text-(--subtle)"><span className="h-1.5 w-3 rounded-full bg-(--warn)" />Cases</span>
            </div>
            <div className="mt-1 min-h-0 flex-1"><TrendChart /></div>
          </div>
          <div className="flex min-h-0 flex-col rounded-lg border border-(--border) p-2">
            <Label>Risk by area</Label>
            <div className="mt-1.5 min-h-0 flex-1"><RiskGrid /></div>
          </div>
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export const HealthCastMobileMockup = () => (
  <PhoneFrame>
    <div className="flex h-full flex-col gap-2.5 px-3 pb-3">
      <div className="flex items-center justify-between pt-1">
        <p className="text-[12px] font-bold text-(--text)">HealthCast</p>
        <span className="h-5 w-5 rounded-full bg-(--elevated)" />
      </div>
      <div className="rounded-xl bg-(--accent-soft) p-2.5">
        <Label className="text-(--accent)!">Risk outlook</Label>
        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
          <span className="w-1/3 bg-(--accent)/40" />
          <span className="w-1/3 bg-(--accent)" />
          <span className="w-1/3 bg-(--warn)/50" />
        </div>
        <Line w="w-2/3" className="mt-2" />
      </div>
      <div className="h-14 rounded-xl border border-(--border) p-1.5"><TrendChart /></div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-(--border) p-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${i === 1 ? 'bg-(--warn)' : 'bg-(--accent)'}`} />
          <div className="flex-1"><Line w="w-3/4" strong /><Line w="w-1/2" className="mt-1" /></div>
        </div>
      ))}
      <div className="mt-auto flex justify-around border-t border-(--border) pt-2">
        {[0, 1, 2, 3].map((i) => <span key={i} className={`h-2.5 w-2.5 rounded ${i === 0 ? 'bg-(--accent)' : 'bg-(--border-strong)'}`} />)}
      </div>
    </div>
  </PhoneFrame>
);

/* ── CareLink ────────────────────────────────────────────────── */

const Heart = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const CareLinkMockup = () => (
  <BrowserFrame url="carelink · sponsors">
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-(--text)">
          <Heart className="h-3.5 w-3.5 text-(--accent)" /> CareLink
        </span>
        <span className="flex gap-2"><Line w="w-8" /><Line w="w-8" /><Line w="w-8" /></span>
      </div>
      <div className="rounded-lg bg-(--accent-soft) p-3">
        <Line w="w-1/2" strong />
        <Line w="w-1/3" className="mt-1.5" />
        <span className="mt-2 inline-block rounded-full bg-(--accent) px-2 py-0.5 text-[8px] font-semibold text-(--on-accent)">Become a sponsor</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col rounded-lg border border-(--border) p-2">
            <div className="flex flex-1 items-center justify-center rounded-md bg-(--elevated)">
              <Heart className="h-4 w-4 text-(--subtle)" />
            </div>
            <Line w="w-3/4" strong className="mt-2" />
            <Line w="w-1/2" className="mt-1" />
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

/* ── IV's Laundry ────────────────────────────────────────────── */

export const LaundryMockup = () => (
  <BrowserFrame url="ivs-laundry · orders">
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-(--text)">Order tracking</p>
        <span className="rounded-full border border-(--border) px-2 py-0.5 text-[8px] text-(--subtle)">Admin</span>
      </div>
      <div className="flex items-center">
        {['Received', 'Washing', 'Drying', 'Ready'].map((step, i) => (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span className={`h-3 w-3 rounded-full ${i < 2 ? 'bg-(--accent)' : 'border border-(--border-strong) bg-(--card)'}`} />
              <span className="text-[8px] text-(--subtle)">{step}</span>
            </div>
            {i < 3 && <span className={`mx-1 mb-3 h-px flex-1 ${i < 1 ? 'bg-(--accent)' : 'bg-(--border-strong)'}`} />}
          </div>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-(--border)">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-(--border) px-2.5 py-2 last:border-0">
            <Line w="w-10" strong />
            <Line w="w-16" />
            <span className={`ml-auto rounded-full px-2 py-0.5 text-[7px] font-semibold ${i % 2 ? 'bg-(--accent-soft) text-(--accent)' : 'bg-(--elevated) text-(--subtle)'}`}>
              {i % 2 ? 'Ready' : 'In progress'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

/* ── Portfolio dashboard ─────────────────────────────────────── */

export const DashboardMockup = () => (
  <BrowserFrame url="abilong-client.vercel.app/dashboard">
    <div className="grid h-full grid-cols-[4.5rem_1fr]">
      <aside className="flex flex-col gap-2 border-r border-(--border) p-2">
        {['Dashboard', 'Reports', 'Articles', 'Users'].map((item, i) => (
          <span key={item} className={`rounded-md px-1.5 py-1 text-[8px] ${i === 0 ? 'bg-(--accent-soft) font-semibold text-(--accent)' : 'text-(--subtle)'}`}>{item}</span>
        ))}
      </aside>
      <div className="flex min-w-0 flex-col gap-2 p-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-(--border) p-2"><Line w="w-1/2" /><Line w="w-3/4" strong className="mt-1.5" /></div>
          ))}
        </div>
        <div className="flex h-12 items-end gap-1.5 rounded-lg border border-(--border) p-2">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-(--accent)/50" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-(--border)">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 border-b border-(--border) px-2.5 py-1.5 last:border-0">
              <span className="h-3 w-3 rounded-full bg-(--elevated)" />
              <Line w="w-16" strong /><Line w="w-10" />
              <span className="ml-auto h-2 w-6 rounded-full bg-(--accent)/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/* ── Generic (projects added from the dashboard without a screenshot) ── */

export const GenericMockup = ({ name = 'Project' }) => (
  <BrowserFrame url={name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'}>
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <p className="truncate text-[11px] font-bold text-(--text)">{name}</p>
        <span className="flex gap-2"><Line w="w-8" /><Line w="w-8" /></span>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-(--accent-soft) p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--accent) text-[11px] font-bold text-(--on-accent)">
          {name.trim().charAt(0).toUpperCase() || 'P'}
        </span>
        <div className="flex-1"><Line w="w-1/2" strong /><Line w="w-1/3" className="mt-1.5" /></div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-(--border) p-2"><Line w="w-2/3" strong /><Line w="w-1/2" className="mt-1.5" /></div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

export const mockups = {
  carelink: CareLinkMockup,
  laundry: LaundryMockup,
  dashboard: DashboardMockup,
};
