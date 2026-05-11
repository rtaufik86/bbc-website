import Link from 'next/link'

type Breadcrumb = {
    label: string
    href: string
}

type HubAction = {
    label: string
    href: string
}

type HubCard = {
    title: string
    description: string
    href: string
    label?: string
}

type HubTextBlock = {
    title: string
    description: string
}

type HubFaqItem = {
    question: string
    answer: string
}

type HubPageTemplateV2Props = {
    eyebrow?: string
    title: string
    description: string
    primaryEntity?: string
    breadcrumbs?: Breadcrumb[]
    heroActions?: HubAction[]
    decisionPaths: HubCard[]
    overviewBlocks: HubTextBlock[]
    trustNotes: string[]
    serviceRoutes: HubCard[]
    faqItems: HubFaqItem[]
    finalCta?: {
        title: string
        description: string
        actions: HubAction[]
    }
}

export default function HubPageTemplateV2({
    eyebrow,
    title,
    description,
    primaryEntity,
    breadcrumbs = [],
    heroActions = [],
    decisionPaths,
    overviewBlocks,
    trustNotes,
    serviceRoutes,
    faqItems,
    finalCta,
}: HubPageTemplateV2Props) {
    return (
        <main className="bg-slate-50 text-slate-900">
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
                    {breadcrumbs.length > 0 ? (
                        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
                            <ol className="flex flex-wrap gap-2">
                                {breadcrumbs.map((item, index) => (
                                    <li key={item.href} className="flex items-center gap-2">
                                        {index > 0 ? <span aria-hidden="true">/</span> : null}
                                        <Link href={item.href} className="hover:text-blue-800">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    ) : null}

                    <div className="max-w-3xl">
                        {eyebrow ? (
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-700">
                                {eyebrow}
                            </p>
                        ) : null}
                        <h1 className="text-3xl font-semibold leading-tight text-blue-950 sm:text-4xl">
                            {title}
                        </h1>
                        <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
                            {description}
                        </p>
                        {primaryEntity ? (
                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                Halaman ini membantu memilih jalur yang paling sesuai dalam cluster {primaryEntity}.
                            </p>
                        ) : null}
                        {heroActions.length > 0 ? (
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                {heroActions.map((action) => (
                                    <Link
                                        key={action.href}
                                        href={action.href}
                                        className="inline-flex items-center justify-center rounded-md border border-blue-900 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                                    >
                                        {action.label}
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            <section id="jalur-legal" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Decision Path</p>
                    <h2 className="mt-2 text-2xl font-semibold text-blue-950">Pilih Jalur Sesuai Kebutuhan Anda</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {decisionPaths.map((path) => (
                        <Link
                            key={path.href}
                            href={path.href}
                            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-900"
                        >
                            {path.label ? <p className="text-sm font-semibold text-amber-700">{path.label}</p> : null}
                            <h3 className="mt-2 text-lg font-semibold text-blue-950">{path.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{path.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
                    {overviewBlocks.map((block) => (
                        <div key={block.title} className="rounded-lg border border-slate-200 p-5">
                            <h2 className="text-lg font-semibold text-blue-950">{block.title}</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{block.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Catatan Kepatuhan</p>
                    <h2 className="mt-2 text-2xl font-semibold text-blue-950">Pertimbangan sebelum memilih layanan</h2>
                </div>
                <ul className="space-y-3">
                    {trustNotes.map((note) => (
                        <li key={note} className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                            {note}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
                    <div className="mb-6 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Rute Layanan</p>
                        <h2 className="mt-2 text-2xl font-semibold text-blue-950">Layanan terkait dalam ekosistem BBC</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {serviceRoutes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="rounded-lg border border-slate-200 p-5 transition hover:border-blue-900"
                            >
                                <h3 className="text-base font-semibold text-blue-950">{route.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{route.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {faqItems.length > 0 ? (
                <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
                    <div className="mb-6 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">FAQ</p>
                        <h2 className="mt-2 text-2xl font-semibold text-blue-950">Pertanyaan routing layanan legal</h2>
                    </div>
                    <div className="space-y-4">
                        {faqItems.map((item) => (
                            <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
                                <summary className="cursor-pointer text-base font-semibold text-blue-950">
                                    {item.question}
                                </summary>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>
            ) : null}

            {finalCta ? (
                <section className="bg-blue-950">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 text-white sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-semibold text-white">{finalCta.title}</h2>
                            <p className="mt-2 text-sm leading-6 text-blue-100">{finalCta.description}</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {finalCta.actions.map((action) => (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    className="inline-flex items-center justify-center rounded-md border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300 hover:text-blue-950"
                                >
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </main>
    )
}
