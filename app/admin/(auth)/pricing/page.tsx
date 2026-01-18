'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Plus, Pencil, Trash2, Check, X, Star, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

interface WebsiteType {
  id: string
  name: string
  description: string
  priceUSD: number
  priceEUR: number
  priceDZD: number
  features: string[]
  isPopular: boolean
  isActive: boolean
}

export default function PricingPage() {
  const [types, setTypes] = useState<WebsiteType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingType, setEditingType] = useState<WebsiteType | null>(null)
  
  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    priceUSD: number;
    priceEUR: number;
    priceDZD: number;
    features: string[];
    isPopular: boolean;
    isActive: boolean;
    featuresInput: string;
  }>({
    name: '',
    description: '',
    priceUSD: 0,
    priceEUR: 0,
    priceDZD: 0,
    features: [],
    isPopular: false,
    isActive: true,
    featuresInput: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchTypes()
  }, [])

  const fetchTypes = async () => {
    try {
      const res = await fetch('/api/pricing')
      if (res.ok) setTypes(await res.json())
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (type?: WebsiteType) => {
    if (type) {
      setEditingType(type)
      setFormData({
        name: type.name,
        description: type.description,
        priceUSD: type.priceUSD,
        priceEUR: type.priceEUR,
        priceDZD: type.priceDZD,
        features: type.features,
        featuresInput: (type.features || []).join('\n'),
        isPopular: type.isPopular,
        isActive: type.isActive
      })
    } else {
      setEditingType(null)
      setFormData({
        name: '', description: '', priceUSD: 0, priceEUR: 0, priceDZD: 0, features: [], featuresInput: '', isPopular: false, isActive: true
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Process features from text area
    const processedFeatures = formData.featuresInput.split('\n').filter(f => f.trim() !== '')

    try {
      const url = editingType ? `/api/pricing/${editingType.id}` : '/api/pricing'
      const method = editingType ? 'PUT' : 'POST'
      
      const payload = {
        ...formData,
        features: processedFeatures
      }
      // Remove temporary input field
      const { featuresInput, ...finalPayload } = payload as any;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, features: processedFeatures })
      })
      
      if (res.ok) {
        await fetchTypes()
        setIsModalOpen(false)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      await fetch(`/api/pricing/${deleteId}`, { method: 'DELETE' })
      setTypes(prev => prev.filter(t => t.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Pricing Packages" 
        subtitle="Manage your website packages and pricing tiers."
      >
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </PageHeader>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((type, index) => (
             <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DashboardCard className="h-full flex flex-col relative overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {type.isPopular && (
                  <div className="absolute top-0 right-0 p-4">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                       <Star className="w-3 h-3 mr-1 fill-current" /> Popular
                     </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{type.name}</h3>
                  <p className="text-slate-500 mt-2 text-sm h-10 line-clamp-2">{type.description}</p>
                </div>

                <div className="mb-6 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${type.priceUSD}</span>
                    <span className="text-xs text-slate-500">USD</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">€{type.priceEUR}</span>
                    <span className="text-xs text-slate-500">EUR</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{type.priceDZD}</span>
                    <span className="text-xs text-slate-500">DZD</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {(type.features || []).slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {(type.features || []).length > 5 && (
                    <p className="text-xs text-slate-400 italic py-1">
                      + {(type.features || []).length - 5} more features
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    type.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
                  )}>
                    {type.isActive ? 'Active' : 'Draft'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button onClick={() => openModal(type)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(type.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingType ? 'Edit Package' : 'New Pricing Package'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Package Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Professional"
                    required
                  />
                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <Input
                      label="Price (USD)"
                      type="number"
                      value={formData.priceUSD.toString()}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceUSD: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                    <Input
                      label="Price (EUR)"
                      type="number"
                      value={formData.priceEUR.toString()}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceEUR: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                    <Input
                      label="Price (DZD)"
                      type="number"
                      value={formData.priceDZD.toString()}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceDZD: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                </div>
                
                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Short summary of this package..."
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Features (One per line)</label>
                  <textarea
                    value={formData.featuresInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuresInput: e.target.value }))}
                    className="w-full min-h-[150px] px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="- Responsive Design&#10;- SEO Optimization&#10;- 5 Pages"
                  />
                </div>

                <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPopular: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mark as Popular</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active</span>
                  </label>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSaving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {editingType ? 'Save Changes' : 'Create Package'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DeleteConfirmation
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Package"
        description="Are you sure? This package will be removed from your pricing page."
        isDeleting={isDeleting}
      />
    </div>
  )
}
