'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

// Custom CSS for slider navigation
const sliderStyles = `
.service-slider {
  padding-bottom: 50px !important; /* Space for pagination dots */
}

.service-slider .swiper-button-prev,
.service-slider .swiper-button-next {
  color: #2A518D; /* BBC Blue */
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: none !important; /* Hidden on mobile by default */
}

@media (min-width: 768px) {
  .service-slider .swiper-button-prev,
  .service-slider .swiper-button-next {
    display: flex !important;
  }
}

.service-slider .swiper-button-prev:after,
.service-slider .swiper-button-next:after {
  font-size: 20px;
  font-weight: bold;
}

.service-slider .swiper-pagination-bullet {
  background: #AB882E; /* BBC Gold */
  opacity: 0.5;
  width: 10px;
  height: 10px;
}

.service-slider .swiper-pagination-bullet-active {
  opacity: 1;
  background: #AB882E;
}

/* Mobile specific fixes */
@media (max-width: 767px) {
  .service-slider .swiper-slide {
    height: auto !important;
  }
  .service-slider .swiper-button-next,
  .service-slider .swiper-button-prev {
    display: none !important;
  }
}
`

interface ServiceCardProps {
    image: string
    imageAlt: string
    title: string
    description: string
    features: string[]
    priceLabel: string
    price: string
    detailLink: string
    ctaLink: string
}

function ServiceCard({
    image,
    imageAlt,
    title,
    description,
    features,
    priceLabel,
    price,
    detailLink,
    ctaLink
}: ServiceCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow border border-slate-200">
            {/* Image */}
            <div className="h-48 bg-gray-200 relative shrink-0">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 flex-grow flex flex-col">

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {title}
                </h3>

                {/* Description - Expanded on Mobile */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed md:line-clamp-4 line-clamp-none">
                    {description}
                </p>

                {/* Features */}
                <ul className="mb-6 space-y-2 flex-grow">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Pricing */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                    <p className="text-xs text-gray-500 mb-1">{priceLabel}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-4">{price}</p>

                    {/* CTA Buttons - Stacked on Mobile */}
                    <div className="flex flex-col md:flex-row gap-3">
                        <Link
                            href={detailLink}
                            className="flex-1 text-center py-3 md:py-2 px-4 border border-bbc-blue-500 text-bbc-blue-500 rounded-md hover:bg-bbc-blue-50 transition-colors text-sm font-bold"
                        >
                            Lihat Detail
                        </Link>
                        <a
                            href={ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-3 md:py-2 px-4 bg-bbc-blue-500 text-white rounded-md hover:bg-bbc-blue-600 transition-colors text-sm font-bold"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default function ServiceSlider() {
    return (
        <section className="py-12 md:py-16 bg-slate-50">
            <style jsx global>{sliderStyles}</style>
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Pilihan Sewa Kantor di Bintaro untuk Berbagai Kebutuhan Bisnis
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Bintaro Business Centre menyediakan pilihan sewa kantor di Bintaro berupa private office, virtual office, dan layanan legal dengan alamat legal Jakarta Selatan.
                    </p>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    }}
                    className="service-slider"
                >

                    {/* Card 1: Private Office */}
                    <SwiperSlide>
                        <ServiceCard
                            image="/images/placeholder-office.jpg"
                            imageAlt="Private Office Fully Furnished Jakarta Selatan"
                            title="Private Office"
                            description="Ruang kantor privat fully furnished di gedung perkantoran profesional. Cocok untuk tim kecil hingga menengah yang membutuhkan privasi, kenyamanan, dan citra bisnis yang kredibel di Jakarta Selatan dengan akses langsung ke Tol Veteran."
                            features={[
                                "Fully Furnished",
                                "Zona Komersial Resmi",
                                "Akses 24/7"
                            ]}
                            priceLabel="Mulai dari"
                            price="Rp 3.5 Jt/bln"
                            detailLink="/sewa-kantor"
                            ctaLink="https://wa.me/6281311778036"
                        />
                    </SwiperSlide>

                    {/* Card 2: Virtual Office */}
                    <SwiperSlide>
                        <ServiceCard
                            image="/images/placeholder-vo.jpg"
                            imageAlt="Virtual Office Jakarta Selatan di Bintaro Business Centre"
                            title="Virtual Office"
                            description="Solusi alamat bisnis Jakarta Selatan untuk kebutuhan domisili usaha, pengurusan PKP, dan administrasi perusahaan tanpa harus menyewa ruang kantor fisik penuh."
                            features={[
                                "Alamat Jakarta Selatan",
                                "Mail & Call Handling",
                                "Receptionist Service",
                                "Bisa untuk PKP"
                            ]}
                            priceLabel="Mulai dari"
                            price="Rp 500rb/bln"
                            detailLink="/virtual-office"
                            ctaLink="https://wa.me/6281311778036"
                        />
                    </SwiperSlide>

                </Swiper>
            </div>
        </section>
    )
}
