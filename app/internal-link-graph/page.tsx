import { Metadata } from "next";
import fs from "fs";
import path from "path";
import LinkGraphClient from "./LinkGraphClient";

export const metadata: Metadata = {
    title: "BBC Internal Link Graph",
    description: "System view for authority flow between internal pages.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function InternalLinkGraphPage() {
    const dataPath = path.join(process.cwd(), 'public', 'link-graph-data.json');
    let graphData = { nodes: [], links: [] };

    try {
        const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        graphData = {
            nodes: rawData.nodes.map((n: any) => ({
                id: n.path,
                name: n.title || n.path,
                val: n.authorityScore || 1,
                type: n.pageType || 'utility',
                color: '' // Managed by TYPE_COLORS in client component
            })),
            links: rawData.edges.map((e: any) => ({
                source: e.from,
                target: e.to,
                color: '#1e293b'
            }))
        };
    } catch (e) {
        console.error("Failed to load link graph data:", e);
    }

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 pb-20">
            <LinkGraphClient graphData={graphData} />
        </main>
    );
}
