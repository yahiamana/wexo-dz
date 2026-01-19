'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DataGrid } from '@/components/admin/ui/DataGrid'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Plus, Pencil, Trash2, Folder, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

interface Category {
  id: string
  slug: string
  nameEn: string
  nameFr: string
  nameAr: string
  order: number
  isActive: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    nameEn: '',
    nameFr: '',
    nameAr: '',
    order: 0,
    isActive: true
  })
  const [isSaving, setIsSaving] = useState(false)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Load Data
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) setCategories(await res.json())
    } finally {
      setIsLoading(false)
    }
  }

  // Modal Handlers
  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        slug: category.slug,
        nameEn: category.nameEn,
        nameFr: category.nameFr,
        nameAr: category.nameAr,
        order: category.order,
        isActive: category.isActive
      })
    } else {
      setEditingCategory(null)
      setFormData({ slug: '', nameEn: '', nameFr: '', nameAr: '', order: categories.length + 1, isActive: true })
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        await fetchCategories()
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
      await fetch(`/api/categories/${deleteId}`, { method: 'DELETE' })
      setCategories(prev => prev.filter(c => c.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  // Columns definition
  const columns = [
    {
      key: 'icon',
      header: '',
      className: 'w-12',
      render: () => (
        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Folder className="w-4 h-4" />
        </div>
      )
    },
    {
      key: 'info',
      header: 'Category',
      render: (c: Category) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{c.nameEn}</p>
          <p className="text-xs text-slate-500">/{c.slug}</p>
        </div>
      )
    },
    {
      key: 'translations',
      header: 'Translations',
      render: (c: Category) => (
        <div className="flex gap-2">
          <span className="px-2 py-0.5 text-xs rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600">FR: {c.nameFr}</span>
          <span className="px-2 py-0.5 text-xs rounded bg-green-50 dark:bg-green-900/30 text-green-600">AR: {c.nameAr}</span>
        </div>
      )
    },
    {
      key: 'order',
      header: 'Order',
      className: 'w-20',
      render: (c: Category) => <span className="text-slate-500">#{c.order}</span>
    },
    {
      key: 'status',
      header: 'Status',
      className: 'w-24',
      render: (c: Category) => (
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          c.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
        )}>
          {c.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20 text-right',
      render: (c: Category) => (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openModal(c)} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Categories" 
        subtitle="Manage portfolio project categories."
      >
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </PageHeader>

      <DataGrid 
        columns={columns} 
        data={categories} 
        isLoading={isLoading}
        onRowClick={(c) => openModal(c)}
        emptyState={<p className="text-slate-500">No categories found. Create one!</p>}
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
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  label="Slug (URL-friendly)"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  placeholder="e.g. ecommerce"
                  required
                />
                
                <Input
                  label="Name (English)"
                  value={formData.nameEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                  placeholder="e.g. E-commerce"
                  required
                />
                
                <Input
                  label="Name (French)"
                  value={formData.nameFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameFr: e.target.value }))}
                  placeholder="e.g. E-commerce"
                  required
                />
                
                <Input
                  label="Name (Arabic)"
                  value={formData.nameAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="e.g. التجارة الإلكترونية"
                  required
                  dir="rtl"
                />
                
                <Input
                  label="Order"
                  type="number"
                  value={formData.order.toString()}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                />

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
                    {editingCategory ? 'Save Changes' : 'Create Category'}
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
        title="Delete Category"
        description="Are you sure? This category will be removed permanently."
        isDeleting={isDeleting}
      />
    </div>
  )
}
