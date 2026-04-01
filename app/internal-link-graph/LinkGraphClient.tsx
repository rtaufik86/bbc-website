"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { AlertTriangle, AlertCircle, RefreshCw, Zap, Download } from "lucide-react";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export default function LinkGraphClient() {
  const [data, setData] = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [filterCluster, setFilterCluster] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/link-graph-data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading graph data", err));
  }, []);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "money": return "#FFD700"; // gold
      case "weapon": return "#000080"; // navy
      case "hub": return "#607D8B"; // blue-gray
      case "support": return "#708090"; // slate
      case "homepage": return "#4CAF50"; // green
      default: return "#E57373"; // light red
    }
  };

  const getEdgeColor = (type: string) => {
    return type === "contextual" ? "rgba(0,0,0,0.4)" : "rgba(200,200,200,0.3)";
  };

  const filteredData = useMemo(() => {
    if (!data) return { nodes: [], links: [] };

    let fNodes = data.nodes.filter(n => n.pageType !== 'utility'); // hide utility by default
    if (filterCluster !== "all") fNodes = fNodes.filter(n => n.cluster === filterCluster);
    if (filterType !== "all") fNodes = fNodes.filter(n => n.pageType === filterType);
    if (filterStatus !== "all") fNodes = fNodes.filter(n => n.status === filterStatus);

    const fNodeIds = new Set(fNodes.map(n => n.path));
    const fLinks = data.edges.filter(e => fNodeIds.has(e.from) && fNodeIds.has(e.to));

    return {
      nodes: fNodes.map(n => ({ id: n.path, ...n, val: Math.max(3, n.authorityScore * 0.5), color: getNodeColor(n.pageType) })),
      links: fLinks.map(e => ({ source: e.from, target: e.to, color: getEdgeColor(e.linkType) }))
    };
  }, [data, filterCluster, filterType, filterStatus]);

  const exportToCSV = () => {
    if (!filteredData) return;
    
    const rows = [
      ["Path", "Type", "Cluster", "Inbound", "Outbound", "Contextual Out", "Authority", "Status", "Warnings", "Recommendations"]
    ];

    filteredData.nodes.forEach((n: any) => {
      rows.push([
        n.id,
        n.pageType,
        n.cluster,
        n.inboundCount,
        n.outboundCount,
        n.contextualOutboundCount,
        n.authorityScore,
        n.status,
        `"${(n.warnings || []).join(', ')}"`,
        `"${(n.recommendations || []).join(' | ')}"`
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `bbc_link_graph_${filterCluster}_${filterType}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data) return <div className="p-10 flex text-gray-500 animate-pulse items-center">Loading graph data from JSON...</div>;

  const totalIndexable = data.nodes.filter((n) => n.isIndexable).length;
  const orphanCount = data.nodes.filter((n) => n.orphanRisk).length;
  const sortedNodes = [...data.nodes].sort((a, b) => b.authorityScore - a.authorityScore);
  const strongest = sortedNodes.slice(0, 3);
  const weakest = sortedNodes.slice(-3);

  const criticalWarnings = filteredData.nodes.filter(n => n.status === 'red');
  const standardWarnings = filteredData.nodes.filter(n => n.status === 'yellow');

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">BBC Link Graph Tool</h1>
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">
              <Zap size={12} fill="currentColor" /> SEO ENGINE
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Authority flow structure, auditing, and auto-recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-100 transition"
            onClick={exportToCSV}
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} /> Reload Data
          </button>
        </div>
      </div>

      {/* Section 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Indexable Pages" value={totalIndexable.toString()} />
        <StatCard title="Total Internal Links" value={data.edges.length.toString()} />
        <StatCard title="Orphan Risk Pages" value={orphanCount.toString()} isRed={orphanCount > 0} />
        <StatCard title="Weakest Pages" value={weakest.length.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section 2 & 3: Graph Filter & Visualization */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b flex flex-wrap gap-4 items-center bg-gray-50">
            <span className="font-semibold text-sm">Filters:</span>
            <select className="text-sm border rounded p-1 bg-white" value={filterCluster} onChange={(e) => setFilterCluster(e.target.value)}>
              <option value="all">All Clusters</option>
              <option value="sewa-kantor">Sewa Kantor</option>
              <option value="virtual-office">Virtual Office</option>
              <option value="legal">Legal</option>
              <option value="trust">Trust / Support</option>
            </select>
            <select className="text-sm border rounded p-1 bg-white" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Page Types</option>
              <option value="money">Money Pages</option>
              <option value="weapon">Weapon Pages</option>
              <option value="hub">Hub Pages</option>
              <option value="support">Support Pages</option>
            </select>
            <select className="text-sm border rounded p-1 bg-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="red">Red (Critical)</option>
              <option value="yellow">Yellow (Warning)</option>
              <option value="green">Green (Healthy)</option>
            </select>
            <div className="ml-auto text-xs text-gray-500 font-mono">
                {filteredData.nodes.length} nodes | {filteredData.links.length} edges
            </div>
          </div>
          <div className="flex-1 w-full bg-[#f8f9fa] relative border-b">
            <ForceGraph2D
              graphData={filteredData}
              nodeLabel={(node: any) => `${node.id}\nScore: ${node.authorityScore}\nType: ${node.pageType}`}
              nodeColor="color"
              linkColor="color"
              nodeVal="val"
              linkDirectionalParticles={1}
              linkDirectionalParticleSpeed={0.005}
              width={900} 
              height={640} 
            />
          </div>
        </div>

        {/* Section 5: Warnings Panel + Recommendations */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[700px]">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              Warnings & Actionable Tactics
            </h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {criticalWarnings.map((n, i) => (
              <div key={i} className="bg-red-50 border border-red-100 p-3 rounded-md text-sm">
                <div className="flex items-center gap-2 text-red-700 font-semibold mb-1 truncate">
                  <AlertCircle size={16} className="shrink-0" /> <span className="truncate">{n.path}</span>
                </div>
                <ul className="list-disc pl-5 text-red-600 text-xs mt-1 space-y-1">
                  {n.warnings.filter((w: string) => ['Orphan Page', 'Indexable but 0 Inbound Links', 'Weapon page outbound < 3', 'Money page outbound < 5', 'Missing in sitemap', 'Missing breadcrumb'].includes(w)).map((w: string, wi: number) => <li key={wi}>{w}</li>)}
                </ul>
                
                {n.recommendations?.length > 0 && (
                  <div className="mt-3 border-t border-red-200/50 pt-2">
                    <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-red-100 px-1 py-0.5 rounded">Auto Strategy</span>
                    <ul className="list-none text-emerald-700 text-xs mt-1.5 space-y-1 font-medium">
                      {n.recommendations.map((r: string, ri: number) => <li key={ri}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {standardWarnings.map((n, i) => (
              <div key={i} className="bg-yellow-50 border border-yellow-100 p-3 rounded-md text-sm">
                <div className="flex items-center gap-2 text-yellow-700 font-semibold mb-1 truncate">
                  <AlertTriangle size={16} className="shrink-0" /> <span className="truncate">{n.path}</span>
                </div>
                <ul className="list-disc pl-5 text-yellow-600 text-xs mt-1 space-y-1">
                  {n.warnings.filter((w: string) => !['Orphan Page', 'Indexable but 0 Inbound Links', 'Weapon page outbound < 3', 'Money page outbound < 5', 'Missing in sitemap', 'Missing breadcrumb'].includes(w)).map((w: string, wi: number) => <li key={wi}>{w}</li>)}
                </ul>

                {n.recommendations?.length > 0 && (
                  <div className="mt-3 border-t border-yellow-200/50 pt-2">
                    <span className="text-[10px] font-bold text-yellow-800 uppercase tracking-widest bg-yellow-100 px-1 py-0.5 rounded">Auto Strategy</span>
                    <ul className="list-none text-emerald-700 text-xs mt-1.5 space-y-1 font-medium">
                      {n.recommendations.map((r: string, ri: number) => <li key={ri}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {criticalWarnings.length === 0 && standardWarnings.length === 0 && (
              <div className="text-gray-500 text-center py-10">All nodes look healthy in this view!</div>
            )}
          </div>
        </div>
      </div>

      {/* Section 4: Table View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Node Data & Action Plan</h2>
          <span className="text-xs text-gray-500 text-right">Sorted by Authority Score</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="py-3 px-4">Path</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Cluster</th>
                <th className="py-3 px-4">In / Out</th>
                <th className="py-3 px-4">Auth</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 w-[350px]">Recommendations</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.nodes.sort((a,b)=>b.authorityScore - a.authorityScore).map((n: any, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-mono text-xs text-blue-600 max-w-[180px] break-all" title={n.id}>{n.id}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{n.pageType}</span>
                  </td>
                  <td className="py-3 px-4 text-xs">{n.cluster}</td>
                  <td className="py-3 px-4 font-mono text-xs">{n.inboundCount} / {n.outboundCount}</td>
                  <td className="py-3 px-4 font-semibold text-center">{n.authorityScore}</td>
                  <td className="py-3 px-4">
                    <span className={`w-3 h-3 rounded-full inline-block ${n.status === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : n.status === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'}`} title={n.status}></span>
                  </td>
                  <td className="py-3 px-4">
                    {n.recommendations && n.recommendations.length > 0 ? (
                      <ul className="text-[11px] text-emerald-700 space-y-1 font-medium">
                        {n.recommendations.map((r: string, ri: number) => <li key={ri}>{r}</li>)}
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-xs italic">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, isRed = false }: { title: string, value: string, isRed?: boolean }) {
  return (
    <div className={`p-5 rounded-lg border flex flex-col justify-center ${isRed ? 'bg-red-50 border-red-200 shadow-[0_4px_12px_rgba(239,68,68,0.1)]' : 'bg-white border-gray-200 shadow-sm'}`}>
      <div className="text-gray-500 text-sm font-medium">{title}</div>
      <div className={`text-4xl font-extrabold mt-2 ${isRed ? 'text-red-600' : 'text-gray-900'}`}>{value}</div>
    </div>
  );
}
