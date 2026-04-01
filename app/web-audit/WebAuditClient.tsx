'use client'

import React, { useState, useMemo } from 'react'
import { 
    Search, 
    Copy, 
    ArrowUpRight, 
    ArrowDownLeft, 
    ShieldCheck, 
    FileText, 
    Globe, 
    Layout, 
    Zap, 
    Hash,
    ImageIcon,
    AlertTriangle,
    Info,
    CheckCircle2,
    XCircle,
    Link as LinkIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LinkInfo {
    href: string;
    anchor: string;
    isContextual: boolean;
    isMoneyPage: boolean;
}

interface InboundLink {
    from: string;
    anchor: string;
}

interface AuditPage {
    path: string;
    pageType: string;
    indexability: string;
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    canonical: string;
    robots: string;
    wordCount: number;
    h1Count: number;
    h1Texts: string[];
    h2Count: number;
    h2Texts: string[];
    h3Count: number;
    h3Texts: string[];
    internalLinksTotal: number;
    internalLinksContextual: number;
    linksOut: LinkInfo[];
    linksIn: InboundLink[];
    outboundLinksTotal: number;
    outboundDomains: string[];
    imagesTotal: number;
    missingAltCount: number;
    schemaTypes: string[];
    inSitemap: boolean;
    relatedContent: boolean;
    breadcrumb: boolean;
    firstMoneyLinkBefore300: boolean;
    crossSiloLinks: number;
    anchorDistribution: Record<string, any>;
    orphanRisk: boolean;
    status: string;
}

interface WebAuditClientProps {
    auditData: AuditPage[]
}

const PageAuditCard = ({ page }: { page: AuditPage }) => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all p-8 relative overflow-hidden group mb-8">
            {/* Status Indicator */}
            <div className={`absolute top-0 left-0 w-2 h-full ${
                page.status === 'Green' ? 'bg-emerald-500' :
                page.status === 'Yellow' ? 'bg-amber-500' : 'bg-rose-500'
            }`}></div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* 1. Page Identity & Core Stats */}
                <div className="lg:w-1/4 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                                 page.status === 'Green' ? 'bg-emerald-50 text-emerald-600' :
                                 page.status === 'Yellow' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                             }`}>
                                 Status: {page.status}
                             </span>
                             <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest">{page.pageType}</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight break-all mb-1">
                            <a
                                href={page.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors flex items-start gap-2 group/link"
                            >
                                {page.path}
                                <ArrowUpRight size={16} className="shrink-0 mt-1.5 text-slate-300 group-hover/link:text-accent transition-colors" />
                            </a>
                        </h2>
                        {page.orphanRisk && <div className="text-[10px] font-black text-rose-500 flex items-center gap-1.5 animate-pulse"><AlertTriangle size={12} /> ORPHAN PAGE WARNING</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Word Count</div>
                            <div className="text-xl font-black text-slate-800">{page.wordCount.toLocaleString()}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Indexability</div>
                            <div className={`text-[11px] font-black uppercase ${page.indexability === 'index' ? 'text-emerald-600' : 'text-slate-400'}`}>{page.indexability}</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1 border-b border-slate-50 pb-2">
                            <span>Sitemap Indexed</span>
                            {page.inSitemap ? <CheckCircle2 className="text-emerald-500" size={14} /> : <XCircle className="text-slate-200" size={14} />}
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1 border-b border-slate-50 pb-2">
                            <span>Related Content</span>
                            {page.relatedContent ? <CheckCircle2 className="text-emerald-500" size={14} /> : <XCircle className="text-slate-200" size={14} />}
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 px-1 border-b border-slate-50 pb-2">
                            <span>Breadcrumb</span>
                            {page.breadcrumb ? <CheckCircle2 className="text-emerald-500" size={14} /> : <XCircle className="text-slate-200" size={14} />}
                        </div>
                    </div>
                </div>

                {/* 2. Content & Metadata */}
                <div className="flex-1 space-y-6 bg-slate-50/50 p-6 rounded-[28px] border border-slate-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                    <FileText size={12} /> Title Tag ({page.titleLength})
                                </div>
                                <div className="text-sm font-black text-slate-800 leading-tight">{page.title || 'NOT_SET'}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-white p-2 text-center rounded-xl border border-slate-100">
                                    <div className="text-[9px] font-bold text-slate-300">H1</div>
                                    <div className={`text-base font-black ${page.h1Count !== 1 ? 'text-rose-500' : 'text-slate-800'}`}>{page.h1Count}</div>
                                </div>
                                <div className="bg-white p-2 text-center rounded-xl border border-slate-100">
                                    <div className="text-[9px] font-bold text-slate-300">H2</div>
                                    <div className="text-base font-black text-slate-800">{page.h2Count}</div>
                                </div>
                                <div className="bg-white p-2 text-center rounded-xl border border-slate-100">
                                    <div className="text-[9px] font-bold text-slate-300">H3</div>
                                    <div className="text-base font-black text-slate-800">{page.h3Count}</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                 <Info size={12} /> Meta Description ({page.descriptionLength})
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium italic border-l-2 border-slate-100 pl-3 leading-relaxed">
                                {page.description || 'MISSING_DATA'}
                            </div>

                            {/* Heading Details */}
                            <div className="bg-white/50 rounded-2xl border border-slate-100 p-4 space-y-4">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Headings Logic Check</div>
                                <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                                    {page.h1Texts.map((text, i) => (
                                        <div key={`h1-${i}`} className="flex gap-2">
                                            <span className="text-[9px] font-black bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded h-fit">H1</span>
                                            <span className="text-[10px] font-black text-slate-800 leading-tight">{text}</span>
                                        </div>
                                    ))}
                                    {page.h2Texts.map((text, i) => (
                                        <div key={`h2-${i}`} className="flex gap-2">
                                            <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded h-fit">H2</span>
                                            <span className="text-[10px] font-bold text-slate-600 leading-tight italic">{text}</span>
                                        </div>
                                    ))}
                                    {page.h3Texts.slice(0, 5).map((text, i) => (
                                        <div key={`h3-${i}`} className="flex gap-2">
                                            <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded h-fit">H3</span>
                                            <span className="text-[10px] font-medium text-slate-400 leading-tight italic">{text}</span>
                                        </div>
                                    ))}
                                    {page.h3Texts.length > 5 && <div className="text-[8px] font-bold text-slate-300 italic">+{page.h3Texts.length - 5} more H3 items...</div>}
                                </div>
                            </div>
                        </div>
                   </div>

                   <hr className="border-slate-200/50" />

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Canonical URL</div>
                            <div className="text-[10px] text-slate-400 truncate font-mono">{page.canonical || 'Not Explicit'}</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Robots Meta</div>
                            <div className="text-[10px] text-slate-400 font-mono italic">{page.robots}</div>
                        </div>
                   </div>
                </div>

                {/* 3. Semantic & Links Mapping */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* INBOUND (Backlinks) */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <ArrowDownLeft size={12} className="text-primary" /> Backlinks
                                </span>
                                <span className="text-xs font-black text-primary">{page.linksIn.length}</span>
                            </div>
                            <div className="max-h-[120px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                {page.linksIn.length > 0 ? page.linksIn.map((l, idx) => (
                                    <div key={idx} className="bg-primary/5 p-2 rounded-xl border border-primary/10 group/item">
                                        <div className="text-[9px] font-black text-primary/70 mb-0.5 truncate">{l.from}</div>
                                        <div className="text-[10px] text-primary font-bold italic line-clamp-1">&ldquo;{l.anchor}&rdquo;</div>
                                    </div>
                                )) : <div className="text-[10px] text-slate-300 italic opacity-50 py-1">No incoming links</div>}
                            </div>
                        </div>

                        {/* OUTBOUND */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <ArrowUpRight size={12} className="text-accent" /> Internal Links
                                </span>
                                <span className="text-xs font-black text-accent">{page.internalLinksTotal}</span>
                            </div>
                            <div className="max-h-[120px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                {page.linksOut.length > 0 ? page.linksOut.map((l, idx) => (
                                    <div key={idx} className="bg-accent/5 p-2 rounded-xl border border-accent/10 group/item">
                                        <div className="text-[9px] font-black text-accent/70 mb-0.5 truncate">{l.href}</div>
                                        <div className="text-[10px] text-accent font-bold italic line-clamp-1">&ldquo;{l.anchor}&rdquo;</div>
                                    </div>
                                )) : <div className="text-[10px] text-slate-300 italic opacity-50 py-1">No outgoing links</div>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-[24px] border border-slate-100 flex flex-wrap gap-4 items-center">
                        <div className="flex-1">
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Image Audit</div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-slate-800">{page.imagesTotal}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase">Tags</span>
                                </div>
                                <div className="flex flex-col">
                                     <span className={`text-lg font-black ${page.missingAltCount > 0 ? 'text-rose-500' : 'text-slate-800'}`}>{page.missingAltCount}</span>
                                     <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Missing Alt</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 border-l border-slate-200 pl-4">
                             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Links</div>
                             <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-slate-800">{page.outboundLinksTotal}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase">Outgoing</span>
                                </div>
                                <div className="flex flex-col">
                                     <span className="text-lg font-black text-slate-800">{page.outboundDomains.length}</span>
                                     <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Domains</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Authority & Advanced Hubs */}
                <div className="lg:w-1/5 space-y-6">
                    <div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Zap size={12} className="text-yellow-500" /> Authority Analysis
                         </div>
                         <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] bg-slate-50 p-2 rounded-xl">
                                <span className="font-bold text-slate-500 uppercase">Cross-Silo Links</span>
                                <span className={`font-black ${page.crossSiloLinks > 0 ? 'text-rose-500' : 'text-slate-800'}`}>{page.crossSiloLinks}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] bg-slate-50 p-2 rounded-xl">
                                <span className="font-bold text-slate-500 uppercase">Contextual Count</span>
                                <span className="font-black text-emerald-600">{page.internalLinksContextual}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-[10px] p-2 rounded-xl border ${page.firstMoneyLinkBefore300 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                                <LinkIcon size={12} /> <span className="font-black uppercase tracking-tighter">Money Loop &lt; 300w: {page.firstMoneyLinkBefore300 ? 'YES' : 'NO'}</span>
                            </div>
                         </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <ShieldCheck size={12} className="text-primary" /> Schema Types
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {page.schemaTypes.length > 0 ? page.schemaTypes.map(s => (
                                <span key={s} className="text-[9px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/50 uppercase tracking-tighter">{s}</span>
                            )) : <span className="text-[9px] font-bold text-slate-300 italic uppercase">None detected</span>}
                        </div>
                    </div>

                    <div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Hash size={12} className="text-slate-400" /> Anchor Diversity
                        </div>
                        <div className="max-h-[100px] overflow-y-auto pr-2 custom-scrollbar space-y-1.5">
                             {Object.entries(page.anchorDistribution).map(([anchor, count]) => (
                                <div key={anchor} className="flex justify-between items-center text-[9px] text-slate-500 font-medium leading-tight">
                                    <span className="truncate pr-2 italic">&ldquo;{anchor}&rdquo;</span>
                                    <span className="font-black text-slate-300">x{count}</span>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function WebAuditClient({ auditData }: WebAuditClientProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['homepage', 'money', 'weapon', 'hub', 'support', 'utility'])
    const [selectedStatus, setSelectedStatus] = useState<string[]>(['Green', 'Yellow', 'Red'])
    const [selectedIndex, setSelectedIndex] = useState<string[]>(['index', 'noindex'])

    const toggleFilter = (set: string[], setter: (v: string[]) => void, value: string) => {
        if (set.includes(value)) {
            setter(set.filter(v => v !== value))
        } else {
            setter([...set, value])
        }
    }

    const filteredData = useMemo(() => {
        return auditData.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = item.path.toLowerCase().includes(searchLower) || 
                               item.title.toLowerCase().includes(searchLower);
            const matchesType = selectedTypes.includes(item.pageType.toLowerCase());
            const matchesStatus = selectedStatus.some(s => s.toLowerCase() === item.status.toLowerCase());
            const matchesIndex = selectedIndex.includes(item.indexability.toLowerCase());

            return matchesSearch && matchesType && matchesStatus && matchesIndex;
        })
    }, [auditData, searchTerm, selectedTypes, selectedStatus, selectedIndex])

    const copyAllToGPT = () => {
        const text = filteredData.map(p => {
             const anchors = Object.entries(p.anchorDistribution).map(([a, count]) => `"${a}" (${count})`).join(', ')
             const h1s = p.h1Texts.join(' | ')
             const h2s = p.h2Texts.join(' | ')
             const h3s = p.h3Texts.join(' | ')
             
             const linksInDetail = p.linksIn.map(l => `[${l.from}] via "${l.anchor}"`).join(' | ')
             const linksOutDetail = p.linksOut.map(l => `[${l.href}] via "${l.anchor}"`).join(' | ')
             
             return `---
Path: ${p.path}
Page type: ${p.pageType}
Indexability: ${p.indexability}
Title: ${p.title} (${p.titleLength})
Meta description: ${p.description} (${p.descriptionLength})
Canonical: ${p.canonical}
Robots: ${p.robots}
Word Count: ${p.wordCount}
Headings Detail:
- H1: ${h1s || 'NONE'}
- H2: ${h2s || 'NONE'}
- H3: ${h3s || 'NONE'}
Inbound Links Detail:
- ${linksInDetail || 'NONE'}
Internal Outbound Detail:
- ${linksOutDetail || 'NONE'}
External Outbound Detail:
- Domains: ${p.outboundDomains.join(', ') || 'NONE'}
Tags Count: H1:${p.h1Count}, H2:${p.h2Count}, H3:${p.h3Count}
Links Total: ${p.internalLinksTotal} (Contextual: ${p.internalLinksContextual})
Links IN: ${p.linksIn.length}
Images: ${p.imagesTotal} (Missing Alt: ${p.missingAltCount})
Schema: ${p.schemaTypes.join(', ')}
In Sitemap: ${p.inSitemap ? 'Yes' : 'No'}
Related Content: ${p.relatedContent ? 'Yes' : 'No'}
Breadcrumb: ${p.breadcrumb ? 'Yes' : 'No'}
First Money Link < 300: ${p.firstMoneyLinkBefore300 ? 'Yes' : 'No'}
Cross-Silo Links: ${p.crossSiloLinks}
Anchor Distribution: ${anchors}
Orphan Risk: ${p.orphanRisk ? 'Yes' : 'No'}
Status: ${p.status}
`
        }).join('\n')
        
        navigator.clipboard.writeText(text)
        alert('Copied filtered audit data for ' + filteredData.length + ' pages!')
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
            {/* Premium Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-6 shadow-sm">
                <div className="max-w-[1800px] mx-auto flex flex-col xl:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary p-3 rounded-2xl text-white shadow-xl shadow-primary/20">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">SEO AUDIT DASHBOARD</h1>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Bintaro Business Centre Strategy Center</p>
                        </div>
                    </div>

                    <div className="flex flex-1 max-w-6xl gap-4 items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search route or title..." 
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <Button 
                            onClick={copyAllToGPT}
                            className="bg-accent hover:bg-bbc-gold-600 text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-accent/20"
                        >
                            <Copy size={20} className="mr-3" /> EXPORT FULL AUDIT
                        </Button>
                    </div>
                </div>

                {/* Checkbox Filter Bar */}
                <div className="max-w-[1800px] mx-auto mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-8 items-start">
                    {/* Filter Category: Page Type */}
                    <div className="space-y-3">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Type</div>
                        <div className="flex flex-wrap gap-2">
                            {['homepage', 'money', 'weapon', 'hub', 'support', 'utility'].map(t => (
                                <label key={t} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                                    selectedTypes.includes(t) ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={selectedTypes.includes(t)}
                                        onChange={() => toggleFilter(selectedTypes, setSelectedTypes, t)}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter Category: Status */}
                    <div className="space-y-3">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</div>
                        <div className="flex gap-2">
                            {['Green', 'Yellow', 'Red'].map(s => (
                                <label key={s} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                                    selectedStatus.includes(s) ? 
                                    (s === 'Green' ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 
                                     s === 'Yellow' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 
                                     'bg-rose-500 text-white border-rose-500 shadow-md') : 
                                    'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={selectedStatus.includes(s)}
                                        onChange={() => toggleFilter(selectedStatus, setSelectedStatus, s)}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{s}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filter Category: Indexability */}
                    <div className="space-y-3">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indexability</div>
                        <div className="flex gap-2">
                            {['index', 'noindex'].map(i => (
                                <label key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                                    selectedIndex.includes(i) ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={selectedIndex.includes(i)}
                                        onChange={() => toggleFilter(selectedIndex, setSelectedIndex, i)}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{i}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="self-end pb-1">
                        <button 
                            onClick={() => {
                                setSelectedTypes(['money', 'weapon', 'hub', 'support', 'utility']);
                                setSelectedStatus(['Green', 'Yellow', 'Red']);
                                setSelectedIndex(['index', 'noindex']);
                            }}
                            className="text-[10px] font-black text-primary underline underline-offset-4 hover:text-primary/70 transition-colors uppercase tracking-widest"
                        >
                            Reset All
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto px-8 mt-12">
                {/* Information Callout */}
                <div className="bg-white p-6 rounded-[32px] border border-slate-200 mb-12 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
                            <Zap size={24} />
                        </div>
                        <div>
                             <h2 className="text-lg font-black text-slate-800 tracking-tight">Full Visibility Monitoring</h2>
                             <p className="text-sm text-slate-400 font-medium italic">Displaying all 29 core SEO metrics per page. No dropdowns, no hidden data.</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black text-primary">{filteredData.length}</div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pages Filtered</div>
                    </div>
                </div>

                {/* Audit Grid/Cards */}
                <div className="space-y-8">
                    {filteredData.map(page => (
                        <PageAuditCard key={page.path} page={page} />
                    ))}
                    {filteredData.length === 0 && (
                        <div className="text-center py-40 border-2 border-dashed border-slate-200 rounded-[40px]">
                            <Search size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-400 font-black tracking-tight">NO MATCHES FOUND FOR YOUR SEARCH</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E1;
                }
            `}</style>
        </div>
    )
}
