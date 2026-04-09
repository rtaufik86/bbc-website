'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, Filter, ArrowUpRight, 
  ExternalLink, MousePointer2, TrendingUp, TrendingDown 
} from 'lucide-react';

interface LinkInfo { href: string; anchor: string; isContextual: boolean; isMoneyPage: boolean }
interface InboundLink { from: string; anchor: string }
interface PageLinks {
  path: string; pageType: string; title: string; indexability: string;
  linksOut: LinkInfo[]; linksIn: InboundLink[]; status: string;
}
interface Props { linksData: PageLinks[] }

export default function InternalLinksClient({ linksData }: Props) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return linksData.filter(p => {
      const matchSearch = p.path.toLowerCase().includes(search.toLowerCase()) || 
                          p.title.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === 'all' || p.pageType === filterType;
      return matchSearch && matchType;
    });
  }, [linksData, search, filterType]);

  const selectedPage = filtered.find(p => p.path === selected);

  const stats = useMemo(() => ({
    total: linksData.length,
    totalLinks: linksData.reduce((s, p) => s + p.linksOut.length, 0),
    contextual: linksData.reduce((s, p) => s + p.linksOut.filter(l => l.isContextual).length, 0),
  }), [linksData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <header className="border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/seo-control-center" className="bg-slate-800 p-2.5 rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
               <ArrowLeft size={16} className="text-slate-400" />
            </Link>
            <div>
               <div className="flex items-center gap-3">
                  <h1 className="text-xl font-black text-white tracking-tight">INTERNAL LINK EXPLORER</h1>
                  <span className="text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full uppercase tracking-widest">Connection Analyzer</span>
               </div>
               <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Cross-linking matrix and anchor text mapping</p>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Link Map Size</div>
             <div className="text-sm font-black text-white">{stats.totalLinks} Connections / {stats.contextual} Contextual</div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 py-10 space-y-8">
         <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
               <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
               <input 
                  type="text" 
                  placeholder="Filter by path or keyword..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm placeholder:text-slate-600 outline-none focus:border-slate-700 transition-all font-medium"
               />
            </div>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
               {['all', 'money', 'weapon', 'hub', 'support'].map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                     className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${filterType === t ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-500 hover:text-slate-400'}`}>
                     {t}
                  </button>
               ))}
            </div>
            <div className="text-slate-600 text-[11px] font-bold ml-auto">{filtered.length} entries matching</div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List Table */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden flex flex-col h-[700px]">
               <div className="p-5 border-b border-slate-800 bg-slate-800/30">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">Index Table</span>
               </div>
               <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
                  {filtered.map(p => (
                     <button key={p.path} onClick={() => setSelected(p.path)}
                        className={`w-full text-left p-5 transition-all hover:bg-slate-800/20 group relative overflow-hidden ${selected === p.path ? 'bg-slate-800/50' : ''}`}>
                        {selected === p.path && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                        <div className="font-mono text-[11px] text-slate-300 group-hover:text-blue-400 transition-colors">{p.path}</div>
                        <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold flex justify-between">
                           <span>{p.pageType}</span>
                           <span className="tabular-nums">{p.linksIn.length} in / {p.linksOut.length} out</span>
                        </div>
                     </button>
                  ))}
               </div>
            </div>

            {/* Analysis Pane */}
            <div className="lg:col-span-8 space-y-6">
               {selectedPage ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     {/* Identity Card */}
                     <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                           <div className="max-w-[450px]">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-2 font-mono">Analyzed Connection Path</div>
                              <h2 className="text-2xl font-black text-white leading-tight tracking-tight mb-2 uppercase break-all">{selectedPage.path}</h2>
                              <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-1 italic">{selectedPage.title}</p>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="text-center p-3 bg-slate-800 border border-slate-700 rounded-2xl min-w-[80px]">
                                 <div className="text-2xl font-black text-white tabular-nums">{selectedPage.linksIn.length}</div>
                                 <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Inbound</div>
                              </div>
                              <div className="text-center p-3 bg-slate-800 border border-slate-700 rounded-2xl min-w-[80px]">
                                 <div className="text-2xl font-black text-white tabular-nums">{selectedPage.linksOut.length}</div>
                                 <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Outbound</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Inbound Section */}
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                                 <TrendingUp size={14} className="text-emerald-400" />
                              </div>
                              <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Inbound Paths (Discovery)</h3>
                           </div>
                           <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                              <div className="divide-y divide-slate-800/40">
                                 {selectedPage.linksIn.length > 0 ? selectedPage.linksIn.map((link, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-800/30 transition-all">
                                       <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-2 mb-1.5">
                                          <MousePointer2 size={10} className="text-emerald-500" /> {link.from}
                                       </div>
                                       <div className="text-[11px] text-slate-500 italic flex items-center gap-2">
                                          Anchor: <strong className="text-slate-300 font-bold ml-1">"{link.anchor}"</strong>
                                       </div>
                                    </div>
                                 )) : (
                                    <div className="p-10 text-center text-[11px] text-slate-600 font-bold uppercase tracking-[2px]">Orphan page detected. No incoming paths.</div>
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Outbound Section */}
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                                 <TrendingDown size={14} className="text-blue-400" />
                              </div>
                              <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Outbound Paths (Authority Pass)</h3>
                           </div>
                           <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                              <div className="divide-y divide-slate-800/40">
                                 {selectedPage.linksOut.length > 0 ? selectedPage.linksOut.map((link, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-800/30 transition-all">
                                       <div className="font-mono text-[10px] text-blue-400 flex items-center justify-between gap-2 mb-1.5">
                                          <span className="truncate">{link.href}</span>
                                          {link.isContextual && <span className="shrink-0 bg-blue-500/10 text-blue-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-blue-500/20 uppercase tracking-tighter">Contextual</span>}
                                       </div>
                                       <div className="text-[11px] text-slate-500 italic flex items-center gap-2">
                                          Anchor: <strong className="text-slate-300 font-bold ml-1">"{link.anchor}"</strong>
                                          {link.isMoneyPage && <span className="ml-auto text-[9px] font-black text-rose-400 uppercase tracking-widest">MONEY TARGET</span>}
                                       </div>
                                    </div>
                                 )) : (
                                    <div className="p-10 text-center text-[11px] text-slate-600 font-bold uppercase tracking-[2px]">Dead end page. No authority pass.</div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-[40px] opacity-40 py-40">
                     <ExternalLink size={48} className="text-slate-700 mb-6" />
                     <div className="text-xs font-black text-slate-600 uppercase tracking-[4px]">Select path from index<br/>to analyze connections</div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
