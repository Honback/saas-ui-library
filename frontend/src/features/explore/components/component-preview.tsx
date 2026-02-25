import { cn } from '@/lib/utils';

interface ComponentPreviewProps {
  slug: string;
  className?: string;
}

/** SVG-based visual previews for each component type */
export function ComponentPreview({ slug, className }: ComponentPreviewProps) {
  const Preview = previews[slug] || previews['_default'];
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6',
        className
      )}
    >
      <Preview />
    </div>
  );
}

const previews: Record<string, () => JSX.Element> = {
  button: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="h-8 w-20 rounded-lg bg-primary-600" />
        <div className="h-8 w-20 rounded-lg bg-gray-200" />
        <div className="h-8 w-20 rounded-lg border-2 border-gray-300 bg-white" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-md bg-primary-400" />
        <div className="h-10 w-24 rounded-lg bg-primary-600" />
      </div>
    </div>
  ),

  input: () => (
    <div className="flex w-full max-w-[180px] flex-col gap-2">
      <div className="h-2 w-12 rounded bg-gray-400" />
      <div className="h-8 w-full rounded-lg border-2 border-gray-300 bg-white px-2 flex items-center">
        <div className="h-2 w-20 rounded bg-gray-200" />
      </div>
      <div className="h-2 w-12 rounded bg-gray-400" />
      <div className="h-8 w-full rounded-lg border-2 border-red-300 bg-white" />
      <div className="h-1.5 w-24 rounded bg-red-300" />
    </div>
  ),

  card: () => (
    <div className="w-full max-w-[180px] rounded-xl border-2 border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-3">
        <div className="h-2.5 w-20 rounded bg-gray-800" />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-3/4 rounded bg-gray-200" />
        <div className="h-2 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  ),

  badge: () => (
    <div className="flex flex-wrap gap-2">
      <div className="rounded-full bg-gray-100 px-3 py-1">
        <div className="h-2 w-8 rounded bg-gray-500" />
      </div>
      <div className="rounded-full bg-green-100 px-3 py-1">
        <div className="h-2 w-10 rounded bg-green-500" />
      </div>
      <div className="rounded-full bg-yellow-100 px-3 py-1">
        <div className="h-2 w-8 rounded bg-yellow-500" />
      </div>
      <div className="rounded-full bg-red-100 px-3 py-1">
        <div className="h-2 w-10 rounded bg-red-500" />
      </div>
    </div>
  ),

  avatar: () => (
    <div className="flex items-end gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-[8px] font-bold text-primary-700">KM</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">LS</div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">PJ</div>
    </div>
  ),

  spinner: () => (
    <div className="flex items-end gap-4">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600" />
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600" />
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600" />
    </div>
  ),

  modal: () => (
    <div className="relative w-full max-w-[180px]">
      <div className="absolute inset-0 rounded-lg bg-black/10" />
      <div className="relative mx-auto mt-2 w-[140px] rounded-lg border-2 border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-100 p-2">
          <div className="h-2 w-14 rounded bg-gray-700" />
        </div>
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-full rounded bg-gray-200" />
          <div className="h-1.5 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="flex justify-end gap-1 border-t border-gray-100 p-2">
          <div className="h-4 w-10 rounded bg-gray-200" />
          <div className="h-4 w-10 rounded bg-primary-600" />
        </div>
      </div>
    </div>
  ),

  dropdown: () => (
    <div className="w-full max-w-[160px]">
      <div className="h-7 w-16 rounded-lg border-2 border-gray-300 bg-white" />
      <div className="mt-1 rounded-lg border-2 border-gray-200 bg-white py-1 shadow-md">
        <div className="px-3 py-1.5"><div className="h-2 w-12 rounded bg-gray-600" /></div>
        <div className="bg-gray-50 px-3 py-1.5"><div className="h-2 w-10 rounded bg-gray-600" /></div>
        <div className="px-3 py-1.5"><div className="h-2 w-14 rounded bg-gray-600" /></div>
      </div>
    </div>
  ),

  tabs: () => (
    <div className="w-full max-w-[200px]">
      <div className="flex border-b-2 border-gray-200">
        <div className="border-b-2 border-primary-600 px-3 py-1.5"><div className="h-2 w-8 rounded bg-primary-600" /></div>
        <div className="px-3 py-1.5"><div className="h-2 w-8 rounded bg-gray-300" /></div>
        <div className="px-3 py-1.5"><div className="h-2 w-8 rounded bg-gray-300" /></div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  ),

  toggle: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-9 rounded-full bg-primary-600"><div className="ml-[18px] mt-0.5 h-4 w-4 rounded-full bg-white shadow" /></div>
        <div className="h-2 w-14 rounded bg-gray-400" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-9 rounded-full bg-gray-200"><div className="ml-0.5 mt-0.5 h-4 w-4 rounded-full bg-white shadow" /></div>
        <div className="h-2 w-14 rounded bg-gray-400" />
      </div>
    </div>
  ),

  select: () => (
    <div className="w-full max-w-[180px] space-y-1.5">
      <div className="h-2 w-8 rounded bg-gray-400" />
      <div className="flex h-8 items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-2">
        <div className="h-2 w-14 rounded bg-gray-400" />
        <div className="h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-400" />
      </div>
    </div>
  ),

  textarea: () => (
    <div className="w-full max-w-[180px] space-y-1.5">
      <div className="h-2 w-8 rounded bg-gray-400" />
      <div className="h-16 w-full rounded-lg border-2 border-gray-300 bg-white p-2">
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded bg-gray-200" />
          <div className="h-1.5 w-3/4 rounded bg-gray-200" />
          <div className="h-1.5 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  ),

  alert: () => (
    <div className="flex w-full max-w-[200px] flex-col gap-2">
      <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-2">
        <div className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-blue-400" />
        <div className="space-y-1"><div className="h-1.5 w-full rounded bg-blue-400" /><div className="h-1.5 w-3/4 rounded bg-blue-300" /></div>
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2">
        <div className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-red-400" />
        <div className="space-y-1"><div className="h-1.5 w-full rounded bg-red-400" /><div className="h-1.5 w-2/3 rounded bg-red-300" /></div>
      </div>
    </div>
  ),

  tooltip: () => (
    <div className="flex flex-col items-center">
      <div className="rounded-md bg-gray-900 px-3 py-1.5">
        <div className="h-1.5 w-12 rounded bg-gray-300" />
      </div>
      <div className="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-900" />
      <div className="mt-2 h-7 w-20 rounded-lg bg-gray-200" />
    </div>
  ),

  pagination: () => (
    <div className="flex items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-gray-400">&lt;</div>
      <div className="flex h-6 w-6 items-center justify-center rounded bg-primary-600 text-[8px] font-bold text-white">1</div>
      <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-gray-600">2</div>
      <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-gray-600">3</div>
      <div className="text-[8px] text-gray-400">...</div>
      <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-gray-600">20</div>
      <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] text-gray-400">&gt;</div>
    </div>
  ),

  'search-input': () => (
    <div className="relative w-full max-w-[180px]">
      <div className="flex h-8 items-center rounded-lg border-2 border-gray-300 bg-white px-2">
        <svg className="mr-2 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="m21 21-4.35-4.35" strokeWidth="2" /></svg>
        <div className="h-2 w-14 rounded bg-gray-200" />
      </div>
    </div>
  ),

  'file-upload': () => (
    <div className="flex w-full max-w-[180px] flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-4">
      <svg className="mb-2 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      <div className="h-1.5 w-20 rounded bg-gray-400" />
      <div className="mt-1 h-1 w-14 rounded bg-gray-300" />
    </div>
  ),

  table: () => (
    <div className="w-full max-w-[200px] overflow-hidden rounded-lg border-2 border-gray-200">
      <div className="flex bg-gray-100 px-2 py-1.5">
        <div className="flex-1"><div className="h-1.5 w-8 rounded bg-gray-500" /></div>
        <div className="flex-1"><div className="h-1.5 w-10 rounded bg-gray-500" /></div>
        <div className="w-12"><div className="h-1.5 w-8 rounded bg-gray-500" /></div>
      </div>
      {[0, 1, 2].map(i => (
        <div key={i} className="flex border-t border-gray-200 px-2 py-1.5">
          <div className="flex-1"><div className="h-1.5 w-10 rounded bg-gray-300" /></div>
          <div className="flex-1"><div className="h-1.5 w-14 rounded bg-gray-300" /></div>
          <div className="w-12"><div className={`h-3 w-8 rounded-full ${i === 0 ? 'bg-green-100' : i === 1 ? 'bg-yellow-100' : 'bg-gray-100'}`} /></div>
        </div>
      ))}
    </div>
  ),

  'stats-card': () => (
    <div className="grid w-full max-w-[200px] grid-cols-2 gap-2">
      {[
        { color: 'bg-blue-50', accent: 'bg-blue-500' },
        { color: 'bg-green-50', accent: 'bg-green-500' },
      ].map((s, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-2">
          <div className="h-1.5 w-8 rounded bg-gray-400" />
          <div className="mt-1.5 h-3 w-10 rounded bg-gray-800" />
          <div className="mt-1 flex items-center gap-1">
            <div className={`h-1.5 w-6 rounded ${s.accent}`} />
          </div>
        </div>
      ))}
    </div>
  ),

  'empty-state': () => (
    <div className="flex flex-col items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
      </div>
      <div className="mt-2 h-2 w-16 rounded bg-gray-600" />
      <div className="mt-1 h-1.5 w-24 rounded bg-gray-300" />
      <div className="mt-2 h-5 w-14 rounded-md bg-primary-600" />
    </div>
  ),

  list: () => (
    <div className="w-full max-w-[180px] divide-y divide-gray-200 rounded-lg border border-gray-200">
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center gap-2 px-3 py-2">
          <div className="h-6 w-6 shrink-0 rounded-full bg-primary-100" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-12 rounded bg-gray-600" />
            <div className="h-1 w-16 rounded bg-gray-300" />
          </div>
          <div className={`h-3 w-8 rounded-full ${i === 0 ? 'bg-green-100' : 'bg-gray-100'}`} />
        </div>
      ))}
    </div>
  ),

  sidebar: () => (
    <div className="flex h-32 w-full max-w-[200px] overflow-hidden rounded-lg border border-gray-200">
      <div className="w-12 border-r border-gray-200 bg-white p-1.5">
        <div className="mb-2 h-3 w-full rounded bg-gray-800" />
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`mb-1 flex items-center gap-1 rounded px-1 py-0.5 ${i === 0 ? 'bg-primary-50' : ''}`}>
            <div className={`h-2 w-2 rounded ${i === 0 ? 'bg-primary-600' : 'bg-gray-300'}`} />
            <div className={`h-1 w-5 rounded ${i === 0 ? 'bg-primary-600' : 'bg-gray-300'}`} />
          </div>
        ))}
      </div>
      <div className="flex-1 bg-gray-50 p-2">
        <div className="h-2 w-12 rounded bg-gray-300" />
      </div>
    </div>
  ),

  topbar: () => (
    <div className="w-full max-w-[200px] rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="h-3 w-10 rounded bg-gray-800" />
        <div className="flex gap-2">
          <div className="h-2 w-6 rounded bg-gray-300" />
          <div className="h-2 w-6 rounded bg-gray-300" />
          <div className="h-2 w-6 rounded bg-gray-300" />
        </div>
        <div className="h-5 w-5 rounded-full bg-primary-100" />
      </div>
    </div>
  ),

  breadcrumbs: () => (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-6 rounded bg-gray-400" />
      <div className="text-[8px] text-gray-300">/</div>
      <div className="h-1.5 w-10 rounded bg-gray-400" />
      <div className="text-[8px] text-gray-300">/</div>
      <div className="h-1.5 w-8 rounded bg-gray-700" />
    </div>
  ),

  'tab-bar': () => (
    <div className="flex w-full max-w-[200px] border-b-2 border-gray-200">
      <div className="border-b-2 border-primary-600 px-3 py-2"><div className="h-2 w-8 rounded bg-primary-600" /></div>
      <div className="px-3 py-2"><div className="h-2 w-8 rounded bg-gray-300" /></div>
      <div className="px-3 py-2"><div className="h-2 w-8 rounded bg-gray-300" /></div>
    </div>
  ),

  'login-form': () => (
    <div className="w-full max-w-[160px] rounded-xl border border-gray-200 bg-white p-3">
      <div className="mb-3 h-2.5 w-12 mx-auto rounded bg-gray-700" />
      <div className="space-y-2">
        <div className="h-6 rounded-md border border-gray-200 bg-gray-50" />
        <div className="h-6 rounded-md border border-gray-200 bg-gray-50" />
        <div className="h-6 w-full rounded-md bg-primary-600" />
      </div>
    </div>
  ),

  'signup-form': () => (
    <div className="w-full max-w-[160px] rounded-xl border border-gray-200 bg-white p-3">
      <div className="mb-3 h-2.5 w-16 mx-auto rounded bg-gray-700" />
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-1">
          <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
        </div>
        <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
        <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
        <div className="h-5 w-full rounded-md bg-primary-600" />
      </div>
    </div>
  ),

  'settings-form': () => (
    <div className="w-full max-w-[160px] rounded-xl border border-gray-200 bg-white p-3">
      <div className="mb-3 h-2.5 w-16 rounded bg-gray-700" />
      <div className="space-y-2">
        <div className="h-5 rounded-md border border-gray-200 bg-gray-100" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-5 rounded-md border border-gray-200 bg-gray-50" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-6 rounded-full bg-primary-600" />
          <div className="h-1.5 w-10 rounded bg-gray-400" />
        </div>
        <div className="flex justify-end"><div className="h-5 w-10 rounded-md bg-primary-600" /></div>
      </div>
    </div>
  ),

  'auth-layout': () => (
    <div className="flex h-28 w-full max-w-[200px] items-center justify-center rounded-lg bg-gray-100">
      <div className="w-24 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
        <div className="mb-1.5 h-2 w-10 mx-auto rounded bg-gray-600" />
        <div className="space-y-1">
          <div className="h-4 rounded bg-gray-100" />
          <div className="h-4 rounded bg-gray-100" />
          <div className="h-4 rounded bg-primary-600" />
        </div>
      </div>
    </div>
  ),

  'dashboard-layout': () => (
    <div className="flex h-28 w-full max-w-[200px] overflow-hidden rounded-lg border border-gray-200">
      <div className="w-10 border-r border-gray-200 bg-white p-1">
        {[0, 1, 2].map(i => <div key={i} className="mb-1 h-1.5 w-full rounded bg-gray-300" />)}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="border-b border-gray-200 bg-white p-1"><div className="h-1.5 w-8 rounded bg-gray-400" /></div>
        <div className="flex-1 bg-gray-50 p-2">
          <div className="grid grid-cols-2 gap-1">
            {[0, 1].map(i => <div key={i} className="h-6 rounded border border-gray-200 bg-white" />)}
          </div>
        </div>
      </div>
    </div>
  ),

  'landing-page': () => (
    <div className="w-full max-w-[200px] space-y-2">
      <div className="text-center">
        <div className="mx-auto h-3 w-24 rounded bg-gray-800" />
        <div className="mx-auto mt-1 h-1.5 w-32 rounded bg-gray-400" />
        <div className="mx-auto mt-1.5 flex justify-center gap-1">
          <div className="h-4 w-12 rounded bg-primary-600" />
          <div className="h-4 w-12 rounded border border-gray-300" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map(i => <div key={i} className="h-8 rounded border border-gray-200 bg-white" />)}
      </div>
    </div>
  ),

  'dashboard-page': () => (
    <div className="w-full max-w-[200px] space-y-2">
      <div className="h-2.5 w-14 rounded bg-gray-800" />
      <div className="grid grid-cols-4 gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="rounded border border-gray-200 bg-white p-1">
            <div className="h-1 w-6 rounded bg-gray-400" />
            <div className="mt-0.5 h-2.5 w-8 rounded bg-gray-800" />
          </div>
        ))}
      </div>
      <div className="rounded border border-gray-200 bg-white p-1.5">
        <div className="h-1.5 w-10 rounded bg-gray-600" />
        <div className="mt-1 space-y-0.5">
          {[0, 1].map(i => <div key={i} className="h-1 w-full rounded bg-gray-200" />)}
        </div>
      </div>
    </div>
  ),

  'settings-page': () => (
    <div className="w-full max-w-[200px] space-y-2">
      <div className="h-2.5 w-10 rounded bg-gray-800" />
      <div className="flex gap-2 border-b border-gray-200 pb-1">
        <div className="h-1.5 w-8 rounded bg-primary-600" />
        <div className="h-1.5 w-8 rounded bg-gray-300" />
        <div className="h-1.5 w-8 rounded bg-gray-300" />
      </div>
      <div className="rounded border border-gray-200 bg-white p-2 space-y-1.5">
        <div className="h-4 rounded bg-gray-100" />
        <div className="h-4 rounded bg-gray-100" />
        <div className="flex justify-end"><div className="h-4 w-10 rounded bg-primary-600" /></div>
      </div>
    </div>
  ),

  toast: () => (
    <div className="flex w-full max-w-[180px] flex-col items-end gap-1.5">
      <div className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-2 py-1.5 shadow-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <div className="h-1.5 w-16 rounded bg-green-600" />
      </div>
      <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 shadow-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-1.5 w-14 rounded bg-red-600" />
      </div>
    </div>
  ),

  'loading-states': () => (
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-primary-600" />
      <div className="w-full max-w-[160px] space-y-1.5 animate-pulse">
        <div className="h-2 w-3/4 rounded bg-gray-200" />
        <div className="h-2 w-1/2 rounded bg-gray-200" />
        <div className="h-8 rounded bg-gray-200" />
      </div>
    </div>
  ),

  'error-states': () => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
        <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
      </div>
      <div className="h-2 w-20 rounded bg-gray-700" />
      <div className="h-1.5 w-28 rounded bg-gray-400" />
      <div className="h-5 w-14 rounded-md bg-primary-600" />
    </div>
  ),

  'gradient-button': () => (
    <div className="flex flex-col gap-2 items-center">
      <div className="h-8 w-24 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30" />
      <div className="h-8 w-24 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30" />
      <div className="h-8 w-24 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30" />
    </div>
  ),

  'shimmer-button': () => (
    <div className="flex flex-col gap-2 items-center">
      <div className="relative h-8 w-28 overflow-hidden rounded-xl bg-gray-900">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex h-full items-center justify-center">
          <div className="h-2 w-12 rounded bg-white/80" />
        </div>
      </div>
      <div className="relative h-8 w-24 overflow-hidden rounded-xl bg-gray-900">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex h-full items-center justify-center">
          <div className="h-2 w-8 rounded bg-white/80" />
        </div>
      </div>
    </div>
  ),

  'glass-card': () => (
    <div className="relative w-full max-w-[180px]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400" />
      <div className="relative m-2 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-sm">
        <div className="h-2.5 w-16 rounded bg-white/60" />
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-white/40" />
          <div className="h-1.5 w-3/4 rounded bg-white/40" />
        </div>
      </div>
    </div>
  ),

  'spotlight-card': () => (
    <div className="relative w-full max-w-[180px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background: 'radial-gradient(120px circle at 70% 40%, rgba(120, 119, 198, 0.15), transparent 60%)',
        }}
      />
      <div className="relative space-y-2">
        <div className="h-2.5 w-20 rounded bg-gray-700" />
        <div className="h-1.5 w-full rounded bg-gray-200" />
        <div className="h-1.5 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  ),

  'bento-grid': () => (
    <div className="grid w-full max-w-[200px] grid-cols-3 gap-1">
      <div className="col-span-2 row-span-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 p-2">
        <div className="h-2 w-10 rounded bg-purple-400" />
        <div className="mt-1 h-1.5 w-14 rounded bg-purple-200" />
      </div>
      <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 p-1.5">
        <div className="h-1.5 w-6 rounded bg-blue-400" />
      </div>
      <div className="rounded-lg bg-gradient-to-br from-pink-100 to-pink-50 p-1.5">
        <div className="h-1.5 w-6 rounded bg-pink-400" />
      </div>
      <div className="col-span-2 rounded-lg bg-gradient-to-br from-green-100 to-green-50 p-1.5">
        <div className="h-1.5 w-10 rounded bg-green-400" />
      </div>
      <div className="rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 p-1.5">
        <div className="h-1.5 w-6 rounded bg-yellow-400" />
      </div>
    </div>
  ),

  'animated-counter': () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">1,234</div>
        <div className="h-1.5 w-8 mx-auto mt-1 rounded bg-gray-300" />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600">99%</div>
        <div className="h-1.5 w-8 mx-auto mt-1 rounded bg-gray-300" />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-emerald-600">$5K</div>
        <div className="h-1.5 w-8 mx-auto mt-1 rounded bg-gray-300" />
      </div>
    </div>
  ),

  marquee: () => (
    <div className="w-full max-w-[200px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="flex gap-2 animate-[marquee_8s_linear_infinite]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-16 shrink-0 rounded-lg border border-gray-200 bg-white flex items-center justify-center">
            <div className="h-2 w-8 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  ),

  'interactive-showcase': () => (
    <div className="flex w-full max-w-[200px] items-center gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-1.5">
          <span className="text-[8px] font-bold text-orange-500">01</span>
          <div>
            <div className="h-1.5 w-10 rounded bg-gray-800" />
            <div className="mt-0.5 h-1.5 w-8 rounded bg-gray-800" />
          </div>
        </div>
        <div className="flex items-start gap-1.5 opacity-40">
          <span className="text-[8px] font-bold text-gray-400">02</span>
          <div>
            <div className="h-1.5 w-8 rounded bg-gray-400" />
            <div className="mt-0.5 h-1.5 w-10 rounded bg-gray-400" />
          </div>
        </div>
        <div className="flex items-start gap-1.5 opacity-40">
          <span className="text-[8px] font-bold text-gray-400">03</span>
          <div>
            <div className="h-1.5 w-10 rounded bg-gray-400" />
            <div className="mt-0.5 h-1.5 w-8 rounded bg-gray-400" />
          </div>
        </div>
      </div>
      <div className="relative flex-1">
        <div className="absolute -inset-2 rounded-full bg-orange-500/10 blur-md" />
        <svg viewBox="0 0 100 100" className="relative h-16 w-16">
          <clipPath id="preview-burger">
            <path d="M92,39H8v-7c0-9.5,7.7-17.2,17.2-17.2h49.3C84.2,14.8,92,22.5,92,32V39z" />
            <rect x="4" y="42" width="92" height="4" rx="2" />
            <rect x="8" y="49" width="84" height="13" rx="6" />
            <rect x="3" y="65" width="94" height="4" rx="2" />
            <path d="M88,85H12c-2,0-3.5-1.6-3.5-3.5V74h83v7.5C91.5,83.4,90,85,88,85z" />
          </clipPath>
          <g clipPath="url(#preview-burger)">
            <rect width="100" height="100" fill="#f97316" rx="4" />
          </g>
        </svg>
      </div>
    </div>
  ),

  'animated-border': () => (
    <div className="relative w-full max-w-[160px] rounded-2xl p-[2px]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75" style={{ animation: 'spin 3s linear infinite' }} />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30 blur-md" />
      <div className="relative rounded-[14px] bg-white p-3">
        <div className="h-2.5 w-16 rounded bg-gray-700" />
        <div className="mt-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-gray-200" />
          <div className="h-1.5 w-3/4 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  ),

  'pricing-card': () => (
    <div className="w-full max-w-[140px]">
      <div className="rounded-lg bg-amber-50 p-3">
        <div className="flex justify-between">
          <div className="h-2 w-10 rounded bg-gray-400" />
          <div className="h-3 w-3 rounded bg-gray-300" />
        </div>
        <div className="mt-4 h-3 w-24 rounded bg-gray-600" />
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded bg-gray-200" />
          <div className="h-2 w-12 rounded bg-gray-300" />
        </div>
        <div className="h-4 w-10 rounded-full bg-gray-900" />
      </div>
    </div>
  ),

  'feature-card': () => (
    <div className="relative w-full max-w-[120px] overflow-hidden rounded-tl-[2rem] bg-gray-100">
      <div className="absolute right-0 top-3 h-3 w-12 bg-indigo-700" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }} />
      <div className="p-4 text-center">
        <div className="mx-auto h-5 w-5 rounded bg-gray-300" />
        <div className="mx-auto mt-2 h-2 w-16 rounded bg-gray-500" />
        <div className="mx-auto mt-1 h-1.5 w-20 rounded bg-gray-300" />
      </div>
      <div className="mx-auto grid w-[110%] -translate-x-[5%] place-items-center rounded-b-xl bg-indigo-700 py-2">
        <div className="-mt-4 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-indigo-700 bg-white text-[8px] font-black">01</div>
      </div>
    </div>
  ),

  'hover-expand-card': () => (
    <div className="w-full max-w-[160px] overflow-hidden rounded-2xl bg-gray-900 p-4">
      <div className="absolute -right-6 -top-6 h-10 w-10 rounded-full bg-amber-400" />
      <div className="relative z-10">
        <div className="h-2.5 w-24 rounded bg-white" />
        <div className="mt-1 h-2 w-16 rounded bg-white/50" />
        <div className="mt-4 flex gap-1">
          <div className="h-2 w-8 rounded bg-white/60" />
          <div className="h-2 w-12 rounded bg-yellow-400" />
        </div>
      </div>
    </div>
  ),

  'profile-card': () => (
    <div className="w-[100px] rounded-lg bg-gradient-to-br from-purple-600 via-indigo-500 to-violet-400 p-3 text-center">
      <div className="mx-auto h-8 w-8 rounded-full bg-gray-200" />
      <div className="mx-auto mt-2 h-2 w-12 rounded bg-white" />
      <div className="mx-auto mt-1 h-1.5 w-16 rounded bg-white/60" />
      <div className="mx-auto mt-3 h-4 w-12 rounded bg-gray-200" />
    </div>
  ),

  'glow-card': () => (
    <div className="w-full max-w-[160px] rounded-2xl border border-white/10 bg-gray-950 p-3">
      <div className="rounded-xl p-4" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '0.5rem 0.5rem' }}>
        <div className="mx-auto h-2 w-10 rounded bg-gradient-to-r from-violet-400 to-cyan-400" />
        <div className="mx-auto mt-2 h-3 w-20 rounded bg-white" />
        <div className="mx-auto mt-1 h-1.5 w-24 rounded bg-white/40" />
      </div>
    </div>
  ),

  'skeuomorphic-toggle': () => (
    <div className="flex items-center gap-3">
      <div className="relative h-[30px] w-[60px] rounded-full bg-white" style={{ boxShadow: 'inset 0 0 3px 2px rgba(255,255,255,1), inset 0 0 10px 1px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(0,0,0,0.2)' }}>
        <div className="absolute left-[5px] top-[5px] h-5 w-5 rounded-full" style={{ backgroundImage: 'linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%)', boxShadow: '0 1px 1px rgba(0,0,0,0.3)' }} />
      </div>
      <div className="relative h-[30px] w-[60px] rounded-full bg-white" style={{ boxShadow: 'inset 0 0 3px 2px rgba(255,255,255,1), inset 0 0 10px 1px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(0,0,0,0.2)' }}>
        <div className="absolute right-[5px] top-[5px] h-5 w-5 rounded-full" style={{ backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 70%)', boxShadow: '0 1px 1px rgba(0,0,0,0.3)' }} />
      </div>
    </div>
  ),

  _default: () => (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
      <div className="h-6 w-6 rounded bg-gray-300" />
    </div>
  ),
};
