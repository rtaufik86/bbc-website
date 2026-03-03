import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItemProps {
    label: string
    href?: string
}

export default function SEOBreadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
    if (!items || items.length === 0) return null

    // Generate JSON-LD schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 2, // Start from 2 because Home is usually 1
            "name": item.label,
            "item": item.href ? `https://bintarobusinesscentre.com${item.href}` : undefined
        }))
    }
    // Add Home as first item
    jsonLd.itemListElement.unshift({
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bintarobusinesscentre.com"
    })

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                {item.href ? (
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {index < items.length - 1 && <BreadcrumbSeparator />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    )
}
