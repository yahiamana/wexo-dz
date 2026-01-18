'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Plus, Pencil, Trash2, Quote, X, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  imageUrl: string
  isActive: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    company: string;
    content: string;
    imageUrl: string;
    isActive: boolean;
  }>({
    name: '',
    role: '',
    company: '',
    content: '',
    imageUrl: '',
    isActive: true,
  })
  const [isSaving, setIsSaving] = useState(false)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (res.ok) setTestimonials(await res.json())
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        name: item.name,
        role: item.role,
        company: item.company,
        content: item.content,
        imageUrl: item.imageUrl || '',
        isActive: item.isActive
      })
    } else {
      setEditingItem(null)
      setFormData({
        name: '', role: '', company: '', content: '', imageUrl: '', isActive: true
      })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials'
      const method = editingItem ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        await fetchTestimonials()
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
      await fetch(`/api/testimonials/${deleteId}`, { method: 'DELETE' })
      setTestimonials(prev => prev.filter(t => t.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Testimonials" 
        subtitle="Manage client reviews and feedback."
      >
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </PageHeader>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
             <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DashboardCard className="h-full flex flex-col relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-6 right-6 text-indigo-100 dark:text-indigo-900/30">
                  <Quote className="w-12 h-12 rotate-180" />
                </div>

                <div className="relative mb-6">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                       {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-slate-400">
                           <User className="w-6 h-6" />
                         </div>
                       )}
                     </div>
                     <div>
                       <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                       <p className="text-xs text-slate-500">{item.role} {item.company && `at ${item.company}`}</p>
                     </div>
                   </div>
                </div>

                <div className="flex-1 mb-6 relative z-10">
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">"{item.content}"</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    item.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
                  )}>
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteId(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingItem ? 'Edit Testimonial' : 'New Testimonial'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex-shrink-0">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <Input
                    label="Image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="flex-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Client Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="CEO"
                    required
                  />
                </div>
                
                <Input
                  label="Company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Acme Inc."
                />
                
                <Textarea
                  label="Testimonial Content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What did they say?"
                  required
                />

                <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active (Visible)</span>
                  </label>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSaving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {editingItem ? 'Save Changes' : 'Create'}
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
        title="Delete Testimonial"
        description="Are you sure? This review will be permanently deleted."
        isDeleting={isDeleting}
      />
    </div>
  )
}
