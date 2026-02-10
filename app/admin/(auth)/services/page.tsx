'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DataGrid } from '@/components/admin/ui/DataGrid'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Plus, Pencil, Trash2, Globe, Zap, Palette, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input, { Textarea } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'globe',
    order: 0,
    isActive: true
  })
  const [isSaving, setIsSaving] = useState(false)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Load Data
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      if (res.ok) setServices(await res.json())
    } finally {
      setIsLoading(false)
    }
  }

  // Modal Handlers
  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        order: service.order,
        isActive: service.isActive
      })
    } else {
      setEditingService(null)
      setFormData({ title: '', description: '', icon: 'globe', order: services.length + 1, isActive: true })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services'
      const method = editingService ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        await fetchServices()
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
      await fetch(`/api/services/${deleteId}`, { method: 'DELETE' })
      setServices(prev => prev.filter(s => s.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  // Columns definition
  const columns = [
    {
      key: 'icon',
      header: 'Icon',
      className: 'w-16',
      render: (s: Service) => {
        const Icon = s.icon === 'zap' ? Zap : s.icon === 'palette' ? Palette : Globe;
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Icon className="w-4 h-4" />
          </div>
        )
      }
    },
    {
      key: 'info',
      header: 'Service Info',
      render: (s: Service) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{s.title}</p>
          <p className="text-xs text-slate-500 max-w-xs truncate">{s.description}</p>
        </div>
      )
    },
    {
      key: 'order',
      header: 'Order',
      className: 'w-20',
      render: (s: Service) => <span className="text-slate-500">#{s.order}</span>
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-24',
      render: (s: Service) => (
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          s.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
        )}>
          {s.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20 text-right',
      render: (s: Service) => (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openModal(s)} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteId(s.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Outcome Solutions" 
        subtitle="Manage the strategic high-impact solutions you offer to partners."
      >
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Define New Solution</span>
        </button>
      </PageHeader>

      <DataGrid 
        columns={columns} 
        data={services} 
        isLoading={isLoading}
        onRowClick={(s) => openModal(s)}
        emptyState={<p className="text-slate-500">No services found. create one!</p>}
      />

       {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  label="Service Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Web Development"
                  required
                />
                
                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service..."
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Icon</label>
                    <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-lg">
                      {['globe', 'zap', 'palette'].map((bg) => (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: bg }))}
                          className={cn(
                            "flex-1 py-2 rounded-md flex justify-center transition-all",
                            formData.icon === bg 
                              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600" 
                              : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {bg === 'globe' ? <Globe className="w-4 h-4" /> : bg === 'zap' ? <Zap className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Input
                    label="Order"
                    type="number"
                    value={formData.order.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-slate-700 dark:text-slate-300 select-none">
                    Active (visible on website)
                  </label>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSaving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {editingService ? 'Save Changes' : 'Create Service'}
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
        title="Delete Service"
        description="Are you sure? This service will be removed permanently."
        isDeleting={isDeleting}
      />
    </div>
  )
}
