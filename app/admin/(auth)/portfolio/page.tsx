'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Plus, Pencil, Trash2, ExternalLink, Image as ImageIcon, X, PlusCircle, MinusCircle } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ui/ImageUpload'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input, { Textarea, Select } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string
  tags: string[]
  category?: string
  isFeatured: boolean
  isActive: boolean
  slug?: string
  client?: string
  websiteType?: string
  technologies?: string[]
  featuresEn?: string[]
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    category: string;
    isFeatured: boolean;
    isActive: boolean;
    slug: string;
    client: string;
    websiteType: string;
    technologies: string[];
    features: string[];
    newTech: string;
    newFeature: string;
  }>({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    category: '',
    isFeatured: false,
    isActive: true,
    slug: '',
    client: '',
    websiteType: '',
    technologies: [],
    features: [],
    newTech: '',
    newFeature: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/portfolio')
      if (res.ok) setProjects(await res.json())
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        projectUrl: project.projectUrl || '',
        category: project.category || '',
        isFeatured: project.isFeatured,
        isActive: project.isActive,
        slug: project.slug || '',
        client: project.client || '',
        websiteType: project.websiteType || '',
        technologies: project.technologies || project.tags || [],
        features: project.featuresEn || [],
        newTech: '',
        newFeature: '',
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: '', description: '', imageUrl: '', projectUrl: '', 
        category: '', isFeatured: false, isActive: true,
        slug: '', client: '', websiteType: '', technologies: [], features: [],
        newTech: '', newFeature: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleAddTech = () => {
    if (formData.newTech.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTech.trim()],
        newTech: ''
      }))
    }
  }

  const handleRemoveTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }))
  }
  
  const handleAddFeature = () => {
    if (formData.newFeature.trim()) {
       setFormData(prev => ({
         ...prev,
         features: [...prev.features, prev.newFeature.trim()],
         newFeature: ''
       }))
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const url = editingProject ? `/api/portfolio/${editingProject.id}` : '/api/portfolio'
      const method = editingProject ? 'PUT' : 'POST'
      
      const payload = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        projectUrl: formData.projectUrl,
        category: formData.category,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        slug: formData.slug || undefined,
        client: formData.client,
        websiteType: formData.websiteType,
        tags: formData.technologies, // Using tags field for technologies in API for backward compat
        features: formData.features
      }
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        await fetchProjects()
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
      await fetch(`/api/portfolio/${deleteId}`, { method: 'DELETE' })
      setProjects(prev => prev.filter(p => p.id !== deleteId))
      setDeleteId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Portfolio" 
        subtitle="Manage your agency projects."
      >
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </PageHeader>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
             <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DashboardCard noPadding className="h-full flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Image Area */}
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button onClick={() => openModal(project)} className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg">
                       <Pencil className="w-5 h-5" />
                     </button>
                     <button onClick={() => setDeleteId(project.id)} className="p-3 bg-white text-red-600 rounded-full hover:scale-110 transition-transform shadow-lg">
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                     <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        project.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-100 text-slate-500"
                      )}>
                        {project.isActive ? 'Active' : 'Hidden'}
                      </span>
                      
                      {project.projectUrl && (
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          View Live <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
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
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 shrink-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b pb-2 mb-4">Basic Info</h3>
                    <Input
                      label="Project Title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. E-Commerce Redesign"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        options={[
                          { value: '', label: 'Select...' },
                          { value: 'E-commerce', label: 'E-commerce' },
                          { value: 'Corporate', label: 'Corporate' },
                          { value: 'SaaS', label: 'SaaS' },
                          { value: 'Business', label: 'Business' },
                          { value: 'Real Estate', label: 'Real Estate' },
                          { value: 'One Page', label: 'One Page' },
                        ]}
                      />
                      <Input
                        label="Website Type"
                        value={formData.websiteType}
                        onChange={(e) => setFormData(prev => ({ ...prev, websiteType: e.target.value }))}
                        placeholder="e.g. Corporate Portal"
                      />
                    </div>
                    
                    <Input
                       label="Client Name"
                       value={formData.client}
                       onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                       placeholder="Client Company Name"
                    />

                    <Textarea
                      label="Short Description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief overview..."
                      required
                      className="h-32"
                    />
                    
                    <ImageUpload
                      label="Cover Image"
                      value={formData.imageUrl}
                      onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b pb-2 mb-4">Details & Tech</h3>
                    
                    <Input
                      label="Project URL"
                      value={formData.projectUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                    
                    <div className="space-y-3">
                       <div className="flex justify-between items-center">
                         <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Technologies</label>
                       </div>
                       <div className="flex gap-2">
                         <input 
                           type="text" 
                           value={formData.newTech}
                           onChange={(e) => setFormData(prev => ({ ...prev, newTech: e.target.value }))}
                           placeholder="Add tech..."
                           className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                           onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                         />
                         <button type="button" onClick={handleAddTech} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                           <PlusCircle className="w-5 h-5 text-indigo-600" />
                         </button>
                       </div>
                       <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          {formData.technologies.map((tech, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs font-medium">
                              {tech}
                              <button type="button" onClick={() => handleRemoveTech(i)} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                          ))}
                          {formData.technologies.length === 0 && <span className="text-xs text-slate-400">No technologies added</span>}
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Features</label>
                       <div className="flex gap-2">
                         <input 
                           type="text" 
                           value={formData.newFeature}
                           onChange={(e) => setFormData(prev => ({ ...prev, newFeature: e.target.value }))}
                           placeholder="Add feature..."
                           className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                           onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                         />
                         <button type="button" onClick={handleAddFeature} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                           <PlusCircle className="w-5 h-5 text-indigo-600" />
                         </button>
                       </div>
                       <ul className="space-y-1 max-h-[200px] overflow-y-auto p-2">
                          {formData.features.map((feat, i) => (
                            <li key={i} className="flex items-center justify-between text-sm p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                              <span className="truncate pr-2">{feat}</span>
                              <button type="button" onClick={() => handleRemoveFeature(i)} className="text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured Project</span>
                  </label>
                  
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
                
                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSaving} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {editingProject ? 'Save Changes' : 'Create Project'}
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
        title="Delete Project"
        description="Are you sure? This project will be permanently deleted."
        isDeleting={isDeleting}
      />
    </div>
  )
}
