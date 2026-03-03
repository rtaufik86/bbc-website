import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export interface FAQ {
    question: string;
    answer: string;
}

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Pertanyaan Umum</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
