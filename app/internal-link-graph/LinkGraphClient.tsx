'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Network, ArrowLeft, Info, Filter, ZoomIn, ZoomOut, 
  Maximize, Activity, ShieldCheck, Database, Zap 
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for react-force-graph-2d
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface Node { id: string; name: string; val: number; type: string; color: string }
interface LinkData { source: string; target: string; color: string }
interface Props { graphData: { nodes: Node[]; links: LinkData[] } }

const TYPE_COLORS: Record<string, string> = {
  money: '#a855f7', // Violet
  hub: '#3b82f6',   // Blue
  weapon: '#f43f5e', // Rose
  support: '#10b981', // Emerald
  utility: '#64748b', // Slate
};

export default function LinkGraphClient({ graphData }: Props) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterType, setFilterType] = useState('all');
  const graphRef = useRef<any>(null);

  const filteredData = useMemo(() => {
    if (filterType === 'all') return graphData;
    const filteredNodes = graphData.nodes.filter(n => n.type === filterType);
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = graphData.links.filter(l => 
      nodeIds.has(l.source as string) || nodeIds.has(l.target as string)
    );
    return { nodes: filteredNodes, links: filteredLinks };
  }, [graphData, filterType]);

  const stats = useMemo(() => ({
    nodes: graphData.nodes.length,
    links: graphData.links.length,
    money: graphData.nodes.filter(n => n.type === 'money').length,
    hubs: graphData.nodes.filter(n => n.type === 'hub').length,
  }), [graphData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-8 py-5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/seo-control-center" className="bg-slate-800 p-2.5 rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
            <ArrowLeft size={18} className="text-slate-400" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black text-white tracking-tight uppercase">INTERNAL LINK GRAPH</h1>
              <span className="text-[10px] font-black bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Interactive map</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-800">
            {['all', 'money', 'hub', 'weapon', 'support'].map(t => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${filterType === t ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest border-l border-slate-800 pl-6">
            <Database size={12} className="text-blue-500" /> {stats.nodes} Nodes / {stats.links} Edges
          </div>
        </div>
      </header>

      <div className="flex-1 relative flex overflow-hidden">
        {/* Left Side: Stats/Legend */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/50 p-6 space-y-8 z-10 hidden xl:block overflow-y-auto">
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
              <Activity size={12} className="text-rose-500" /> Authority Scale
            </div>
            <div className="space-y-4">
               {Object.entries(TYPE_COLORS).map(([type, color]) => {
                  const count = graphData.nodes.filter(n => n.type === type).length;
                  if (count === 0) return null;
                  return (
                    <div key={type} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-[11px] font-black uppercase text-slate-300 tracking-wider font-mono">{type} Cluster</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 font-mono">{count} nodes</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(count / stats.nodes) * 100}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  )
               })}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
             <div className="flex items-center gap-3">
                <Info size={16} className="text-blue-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Force Atlas 2D</h3>
             </div>
             <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                Node size (val) merepresentasikan <strong className="text-slate-400">weighted internal authority</strong>. Semakin sering di-link, semakin besar ukurannya dalam graf ini.
             </p>
             <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                   <div className="w-4 h-[1px] bg-slate-700" /> Drag to move graph
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                   <div className="w-4 h-[1px] bg-slate-700" /> Scroll to zoom
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                   <div className="w-4 h-[1px] bg-slate-700" /> Hover node for details
                </div>
             </div>
          </div>
        </aside>

        {/* Center: The Graph */}
        <main className="flex-1 bg-slate-950 relative">
          <ForceGraph2D
            ref={graphRef}
            graphData={filteredData}
            nodeLabel="name"
            nodeRelSize={6}
            nodeVal={(node: any) => node.val}
            nodeColor={(node: any) => TYPE_COLORS[node.type] || '#cbd5e1'}
            linkColor={() => '#1e293b'}
            linkWidth={1}
            linkDirectionalArrowLength={2}
            linkDirectionalArrowRelPos={1}
            backgroundColor="#020617"
            onNodeClick={(node: any) => setSelectedNode(node as Node)}
            onBackgroundClick={() => setSelectedNode(null)}
            cooldownTicks={100}
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const label = node.name;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2) as [number, number];

              ctx.fillStyle = TYPE_COLORS[node.type] || '#cbd5e1';
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
              ctx.fill();

              // Only show labels when zoomed in
              if (globalScale > 2 || node.val > 10) {
                ctx.fillStyle = 'rgba(2, 6, 23, 0.8)';
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 - 10, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#f8fafc';
                ctx.fillText(label, node.x, node.y - 10);
              }
            }}
          />
          
          {/* Legend for Mobile */}
          <div className="absolute bottom-6 left-6 block xl:hidden z-20 space-y-1">
             {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                   <span className="text-[9px] font-black uppercase text-slate-500">{type}</span>
                </div>
             ))}
          </div>
        </main>

        {/* Right Sidebar: Details */}
        <aside className="w-96 border-l border-slate-800 bg-slate-900/50 p-8 z-10 h-full overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 font-mono">Selected Identity</div>
                  <h2 className="text-2xl font-black text-white leading-tight tracking-tight break-all uppercase" style={{ color: TYPE_COLORS[selectedNode.type] }}>
                    {selectedNode.name}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                     <span className="text-[9px] font-black bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded tracking-widest uppercase">
                        {selectedNode.type}
                     </span>
                     <span className="text-[9px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded tracking-widest uppercase">
                        Intensity: {selectedNode.val.toFixed(1)}
                     </span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Structural Role</div>
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                     <div className="relative z-10">
                        <div className="text-xs text-slate-400 font-medium leading-relaxed">
                           {selectedNode.type === 'money' ? 'Halaman utama konversi (Money Page). Membutuhkan authority tinggi dari weapon/hub pages untuk ranking.' : 
                            selectedNode.type === 'weapon' ? 'Halaman pendukung spesifik (Weapon Page). Bertugas menyerap traffic long-tail dan menyalurkan authority ke Money page.' :
                            selectedNode.type === 'hub' ? 'Halaman distribusi navigasi (Hub Page). Mempermudah crawl bots memetakan struktur situs.' :
                            'Halaman pendukung kepercayaan (Trust/Support Page).'}
                        </div>
                     </div>
                  </div>
               </div>

               <Link href={selectedNode.id} className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-3xl text-[11px] font-black transition-all border border-slate-700 shadow-2xl group uppercase tracking-widest">
                  Investigate Path <Maximize size={14} className="group-hover:scale-110 transition-transform" />
               </Link>

               <div className="pt-8 border-t border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                     <ShieldCheck size={14} className="text-emerald-400" />
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Authority Pass</span>
                  </div>
                  {/* List connections locally? No, we use weighted scores as represented in val */}
                  <div className="text-[10px] text-slate-600 font-medium italic">
                     * Visualisasi node val di atas mencakup akumulasi 3-layer weighted authority propagation.
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
               <Network size={48} className="text-slate-700 mb-6" />
               <div className="text-xs font-black text-slate-600 uppercase tracking-[3px]">Select a node<br/>on the graph</div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
