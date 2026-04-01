import { Metadata } from "next";
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
    // Note: We recommend adding a localhost check or an auth check in production middleware!
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 pb-20">
            <LinkGraphClient />
        </main>
    );
}
