'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Search, Globe, AlertTriangle, CheckCircle2, XCircle, 
  ArrowLeft, Copy, Filter, ArrowUpRight, ShieldCheck, Zap
} from 'lucide-react';

interface LinkProp { from: string; anchor: string }
interface OutLinkProp { href: string; anchor: string; isContextual: boolean }
interface PageAudit {
    path: string; pageType: string; indexability: string; title: string;
    description: string; wordCount: number; h1Count: number; h1Texts: string[];
    schemaTypes: string[]; inSitemap: boolean; orphanRisk: boolean;
    breadcrumb: boolean; linksIn: LinkProp[]; linksOut: OutLinkProp[];
    status: string; canonical: string;
}
interface Props { auditData: PageAudit[] }

export default function WebAuditClient({ auditData }: Props) {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selected, setSelected] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return auditData.filter(p => {
            const matchesSearch = p.path.toLowerCase().includes(search.toLowerCase()) || 
                                 p.title.toLowerCase().includes(search.toLowerCase());
            const matchesType = filterType === 'all' || p.pageType === filterType;
            const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [auditData, search, filterType, filterStatus]);

    const stats = useMemo(() => {
        return {
            total: auditData.length,
            green: auditData.filter(p => p.status === 'Green').length,
            yellow: auditData.filter(p => p.status === 'Yellow').length,
            red: auditData.filter(p => p.status === 'Red').length,
            indexable: auditData.filter(p => p.indexability === 'index').length,
            orphans: auditData.filter(p => p.orphanRisk).length
        }
    }, [auditData]);

    const selectedPage = filtered.find(p => p.path === selected);

    const exportCSV = () => {
        const headers = ['Path', 'Title', 'Type', 'Status', 'Words', 'H1', 'InLinks', 'OutLinks', 'Orphan'].join(',');
        const rows = filtered.map(p => [
            p.path, `"${p.title.replace(/"/g, '""')}"`, p.pageType, p.status, p.wordCount, p.h1Count, p.linksIn.length, p.linksOut.length, p.orphanRisk
        ].join(','));
        const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'web-audit-export.csv'; a.click();
    };

    const copyData = () => {
        const headers = ['Path', 'Title', 'Type', 'Status', 'Words', 'H1', 'InLinks', 'OutLinks', 'Orphan'].join('\t');
        const rows = filtered.map(p => [
            p.path, p.title, p.pageType, p.status, p.wordCount, p.h1Count, p.linksIn.length, p.linksOut.length, p.orphanRisk
        ].join('\t'));
        navigator.clipboard.writeText([headers, ...rows].join('\n'));
        alert('Data copied to clipboard (Tab-Separated)');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900 px-8 py-6">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seo-control-center" className="bg-slate-800 p-2.5 rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
                            <ArrowLeft size={18} className="text-slate-400" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-white tracking-tight">FULL WEB AUDIT</h1>
                                <span className="text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full uppercase tracking-widest">ORIGINAL ENGINE</span>
                            </div>
                            <p className="text-slate-400 text-xs font-medium mt-0.5 tracking-wide">Comprehensive technical inventory & quality scoring.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={copyData} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-black transition-all border border-slate-700 shadow-xl">
                            <Copy size={14} /> COPY TEXT
                        </button>
                        <button onClick={exportCSV} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-black transition-all border border-slate-700 shadow-xl">
                            <Globe size={14} /> EXPORT CSV
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-8 py-10 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Total Pages', val: stats.total, color: 'text-white', icon: Globe },
                        { label: 'Healthy', val: stats.green, color: 'text-emerald-400', icon: CheckCircle2 },
                        { label: 'Needs Opti', val: stats.yellow, color: 'text-amber-400', icon: Zap },
                        { label: 'Critical', val: stats.red, color: 'text-rose-400', icon: AlertTriangle },
                        { label: 'Indexable', val: stats.indexable, color: 'text-sky-400', icon: BarChart3 },
                        { label: 'Orphans', val: stats.orphans, color: stats.orphans > 0 ? 'text-rose-400' : 'text-emerald-400', icon: Filter },
                    ].map(s => {
                        const Icon = s.icon;
                        return (
                            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                                <Icon size={40} className={`absolute -right-2 -bottom-2 opacity-5 ${s.color} group-hover:scale-110 transition-transform`} />
                                <div className={`text-3xl font-black ${s.color} tabular-nums tracking-tighter`}>{s.val}</div>
                                <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1.5">{s.label}</div>
                            </div>
                        )
                    })}
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center flex-wrap">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search path or title..." 
                            value={search} 
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm placeholder:text-slate-600 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                        {['all', 'money', 'weapon', 'hub', 'support', 'utility'].map(t => (
                            <button key={t} onClick={() => setFilterType(t)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterType === t ? 'bg-slate-800 text-white border border-slate-700 shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                        {['all', 'Green', 'Yellow', 'Red'].map(s => (
                            <button key={s} onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterStatus === s ? (s === 'Green' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : s === 'Yellow' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : s === 'Red' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-white') : 'text-slate-500 hover:text-slate-400'}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Table */}
                    <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-800/30 border-b border-slate-800">
                                    <tr className="text-left text-[10px] font-black text-slate-500 uppercase tracking-[2px]">
                                        <th className="px-8 py-5">Path & Content</th>
                                        <th className="px-6 py-5">Type</th>
                                        <th className="px-6 py-5">Links</th>
                                        <th className="px-6 py-5">Indexability</th>
                                        <th className="px-8 py-5 text-center">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {filtered.map(p => (
                                        <tr key={p.path} 
                                            onClick={() => setSelected(selected === p.path ? null : p.path)}
                                            className={`cursor-pointer transition-all duration-200 group ${selected === p.path ? 'bg-slate-800/50' : 'hover:bg-slate-800/20'}`}>
                                            <td className="px-8 py-6">
                                                <div className="font-mono text-xs text-slate-300 group-hover:text-white transition-colors">{p.path}</div>
                                                <div className="text-[11px] text-slate-500 truncate max-w-[350px] mt-1.5 font-medium">{p.title}</div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-[9px] font-black bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-tighter text-slate-400">{p.pageType}</span>
                                            </td>
                                            <td className="px-6 py-6 font-mono text-[11px] text-slate-400">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-emerald-400 font-bold">{p.linksIn.length}</span> / <span className="text-sky-400 font-bold">{p.linksOut.length}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${p.indexability === 'index' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                                    {p.indexability}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    <div className={`w-3.5 h-3.5 rounded-full ${p.status === 'Green' ? 'bg-emerald-500' : p.status === 'Yellow' ? 'bg-amber-500' : 'bg-rose-500'} shadow-[0_0_12px_rgba(0,0,0,0.5)] shadow-current ring-4 ring-slate-900/50`} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-slate-600 font-black uppercase text-sm tracking-widest">No pages matching filters</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sidebar Detail */}
                    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 self-start sticky top-10 space-y-8 shadow-2xl">
                        {selectedPage ? (
                            <>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Page Specification</div>
                                    <h3 className="text-2xl font-black text-white leading-[1.1] tracking-tight">{selectedPage.title}</h3>
                                    <div className="font-mono text-[11px] text-slate-400 break-all pt-1">{selectedPage.path}</div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                                        <div className="text-2xl font-black text-white tabular-nums">{selectedPage.wordCount}</div>
                                        <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">Words</div>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                                        <div className="text-2xl font-black text-white tabular-nums">{selectedPage.h1Count}</div>
                                        <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">H1 Elements</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Health Indicators</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { label: 'Sitemap', ok: selectedPage.inSitemap },
                                            { label: 'Canonical', ok: !!selectedPage.canonical },
                                            { label: 'Breadcrumb', ok: selectedPage.breadcrumb },
                                            { label: 'Orphan Risk', ok: !selectedPage.orphanRisk, invert: true },
                                        ].map(ind => (
                                            <div key={ind.label} className={`flex flex-col gap-1 p-3 rounded-xl border ${ind.ok ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>
                                                <div className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">{ind.label}</div>
                                                <div className="flex items-center gap-1.5">
                                                    {ind.ok ? <CheckCircle2 size={12} className="text-emerald-400" /> : <XCircle size={12} className="text-rose-400" />}
                                                    <span className={`text-[10px] font-black uppercase ${ind.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{ind.ok ? 'OK' : 'MIS'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Schemas Detected</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedPage.schemaTypes.length > 0 ? selectedPage.schemaTypes.map((s, i) => (
                                            <span key={i} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-tighter uppercase">{s}</span>
                                        )) : <span className="text-[9px] text-slate-600 font-bold italic tracking-widest">NO SCHEMA DETECTED</span>}
                                    </div>
                                </div>

                                <Link href={selectedPage.path} target="_blank" className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl text-[11px] font-black transition-all border border-slate-700 shadow-2xl shadow-black/50 group uppercase tracking-widest">
                                    Analyze Live Page <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </>
                        ) : (
                            <div className="text-center py-24 px-4 flex flex-col items-center">
                                <Search size={48} className="text-slate-800 mb-6 opacity-50" />
                                <div className="text-[11px] font-black text-slate-600 uppercase tracking-[2px] leading-relaxed max-w-[200px]">Select a page from the table to inspect SEO specifications</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
