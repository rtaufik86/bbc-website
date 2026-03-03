export default function ArticleHeader({ title, date }: { title: string, date: string }) {
    return (
        <header className="mb-8 border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{title}</h1>
            <div className="flex items-center text-sm text-slate-500 gap-4">
                <time dateTime={date}>{new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <span>•</span>
                <span>Bintaro Business Center</span>
            </div>
        </header>
    )
}
