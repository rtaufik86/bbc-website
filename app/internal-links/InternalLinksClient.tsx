'use client'

import React, { useState } from 'react'
import { Link as LinkIcon, Search, ExternalLink, Copy, Check } from 'lucide-react'

interface LinkData {
  source: string
  destination: string
  anchor: string
  type?: string
}

const cleanPathToSlug = (path: string) => {
  if (path.startsWith('components/')) return `[Component: ${path.split('/').pop()}]`
  
  let slug = path
    .replace(/^app\//, '/')
    .replace(/\/page\.tsx$/, '')
    .replace(/\/page\.ts$/, '')
    .replace(/\/route\.ts$/, '')
    .replace(/\/Client\.tsx$/, '')
    .replace(/\/SewaKantorClient\.tsx$/, '')
    .replace(/\/VirtualOfficeClient\.tsx$/, '')
    .replace(/\/LokasiClient\.tsx$/, '')
    .replace(/\/LegalClient\.tsx$/, '')
    .replace(/\/PendirianPTClient\.tsx$/, '')
    .replace(/\/\([^)]+\)/g, '') // Remove route groups like (marketing)
  
  return slug === '/page' || slug === '' ? '/' : slug
}

const getPageType = (slug: string, providedType?: string) => {
  if (providedType) return providedType

  const moneyPages = ['/sewa-kantor', '/virtual-office', '/legal/pendirian-pt-jakarta-selatan']
  const weaponPrefixes = ['/sewa-kantor/', '/virtual-office-', '/harga-', '/kantor-dekat-', '/alamat-bisnis-']
  const hubPages = ['/']

  if (hubPages.includes(slug)) return 'HUB PAGE'
  if (moneyPages.includes(slug)) return 'MONEY PAGE'
  if (weaponPrefixes.some(p => slug.startsWith(p))) return 'SEO WEAPON PAGE'
  
  return 'OTHERS'
}

export default function InternalLinksClient({ linksData }: { linksData: LinkData[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const allTypes = ['HUB PAGE', 'MONEY PAGE', 'SEO WEAPON PAGE', 'OTHERS']

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const filteredLinks = linksData.map(link => {
    const slug = cleanPathToSlug(link.source)
    const type = getPageType(slug, link.type)
    return {
      ...link,
      sourceSlug: slug,
      pageType: type
    }
  }).filter(link => {
    const matchesSearch = 
      link.sourceSlug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.anchor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.pageType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(link.pageType)
    
    return matchesSearch && matchesType
  })

  const handleCopyAll = () => {
    const textToCopy = filteredLinks
      .map(l => `[${l.pageType}] Source: ${l.sourceSlug} | Anchor: "${l.anchor}" | Destination: ${l.destination}`)
      .join('\n')
    
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-playfair text-slate-900 mb-4 flex items-center justify-center gap-3">
            <LinkIcon className="text-bbc-gold-600" />
            Internal Link Inventory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Audit teknis untuk pemetaan anchor text dan distribusi internal linking di Bintaro Business Centre. (Development Only)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative max-w-md w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Cari link atau anchor text..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-bbc-gold-500 focus:border-bbc-gold-500 sm:text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={handleCopyAll}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  copied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-bbc-gold-600 text-white hover:bg-bbc-gold-700 shadow-sm'
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy All for GPT'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 mt-2 pt-4">
              <span className="text-xs font-semibold text-slate-500 mr-2 uppercase tracking-wider">Filter Type:</span>
              {allTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider transition-all border ${
                    selectedTypes.includes(type)
                    ? (
                      type === 'MONEY PAGE' ? 'bg-emerald-600 border-emerald-600 text-white' :
                      type === 'HUB PAGE' ? 'bg-blue-600 border-blue-600 text-white' :
                      type === 'SEO WEAPON PAGE' ? 'bg-amber-500 border-amber-500 text-white' :
                      'bg-slate-600 border-slate-600 text-white'
                    )
                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
              {selectedTypes.length > 0 && (
                <button 
                  onClick={() => setSelectedTypes([])}
                  className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 ml-2"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Source (Slug)
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Anchor Text
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredLinks.length > 0 ? filteredLinks.map((link, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {link.sourceSlug.startsWith('/') ? (
                        <a 
                          href={link.sourceSlug} 
                          className="text-slate-600 hover:text-bbc-gold-600 hover:underline transition-all flex items-center gap-1"
                          target="_blank"
                        >
                          {link.sourceSlug}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">{link.sourceSlug}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                        link.pageType === 'MONEY PAGE' ? 'bg-emerald-100 text-emerald-700' :
                        link.pageType === 'HUB PAGE' ? 'bg-blue-100 text-blue-700' :
                        link.pageType === 'SEO WEAPON PAGE' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {link.pageType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      "{link.anchor}"
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-bbc-gold-700 underline underline-offset-4">
                      {link.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a 
                        href={link.destination} 
                        className="text-slate-400 hover:text-bbc-gold-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-12 py-12 text-center text-slate-500">
                      Tidak ada data yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 italic">
            Menampilkan {filteredLinks.length} internal links yang terdeteksi.
          </div>
        </div>
      </div>
    </div>
  )
}
