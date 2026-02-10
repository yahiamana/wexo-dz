'use client'

import React, { useEffect, useState } from 'react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { DataGrid } from '@/components/admin/ui/DataGrid'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import { DeleteConfirmation } from '@/components/admin/DeleteConfirmation'
import { Mail, Trash2, Eye, EyeOff, Phone, Building2, Calendar, User, Zap } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string | null
  businessType?: string | null
  budget?: string | null
  objective?: string | null
  message: string
  status: 'NEW' | 'QUALIFIED' | 'STRATEGY_CALL' | 'PROPOSAL_SENT' | 'REJECTED' | 'ARCHIVED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  adminNotes?: string | null
  createdAt: string
  isRead: boolean
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  
  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts')
      if (res.ok) {
        const data = await res.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setIsDeleting(true)
    try {
      await fetch(`/api/contacts/${deleteId}`, { method: 'DELETE' })
      setContacts(prev => prev.filter(c => c.id !== deleteId))
      if (selectedContact?.id === deleteId) setSelectedContact(null)
      setDeleteId(null)
    } catch (error) {
      console.error('Failed to delete', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      
      if (res.ok) {
        setContacts(prev => prev.map(c => 
          c.id === id ? { ...c, ...updates } : c
        ))
        if (selectedContact?.id === id) {
          setSelectedContact(prev => prev ? { ...prev, ...updates } : null)
        }
      }
    } catch (error) {
      console.error('Failed to update contact', error)
    }
  }

  const toggleRead = async (contact: Contact) => {
    updateContact(contact.id, { isRead: !contact.isRead })
  }

  const getBusinessTypeLabel = (type: string | null | undefined) => {
    if (!type) return 'Inquiry'
    if (type.includes('Level:')) {
      return type.split('|')[0].replace('Level:', '').trim()
    }
    const types: Record<string, string> = {
      'restaurant': 'Restaurant / Café',
      'retail': 'Retail / Shop',
      'professional': 'Professional Services',
      'startup': 'Startup',
      'other': 'Other'
    }
    return types[type] || type
  }

  const getBudgetLabel = (budget: string | null | undefined) => {
    if (!budget) return 'Not Specified'
    const budgets: Record<string, string> = {
      'under-10m': '< 10M DA',
      '10m-30m': '10M - 30M DA',
      '30m-100m': '30M - 100M DA',
      'over-100m': '> 100M DA'
    }
    return budgets[budget] || budget
  }

  const columns = [
    {
      key: 'pipeline',
      header: 'Pipeline',
      className: 'w-32',
      render: (item: Contact) => (
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
          item.status === 'ARCHIVED' 
            ? "bg-slate-50 text-slate-500 border-slate-200"
            : item.status === 'QUALIFIED'
            ? "bg-green-50 text-green-700 border-green-200"
            : item.status === 'STRATEGY_CALL'
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-amber-50 text-amber-700 border-amber-200"
        )}>
          {item.status.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'name',
      header: 'Partner Info',
      render: (item: Contact) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            {item.name}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
             <Mail className="w-3 h-3" />
             {item.email || 'No email'}
          </div>
          {item.phone && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <Phone className="w-3 h-3" />
               <span className="font-medium text-slate-700 dark:text-slate-300">{item.phone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'budget',
      header: 'Investment',
      render: (item: Contact) => {
        const budget = getBudgetLabel(item.budget)
        const isHigh = item.budget === 'over-100m' || item.budget === '30m-100m'
        return (
          <div className="flex items-center gap-2 font-bold">
            <span className={cn(
              "px-2 py-1 rounded text-[10px] uppercase tracking-wider",
              isHigh ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600 border border-slate-200"
            )}>
              {budget}
            </span>
          </div>
        )
      }
    },
    {
      key: 'businessType',
      header: 'Solution Level',
      render: (item: Contact) => (
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Building2 className="w-4 h-4 text-blue-500" />
          <span className="font-semibold">
            {getBusinessTypeLabel(item.businessType)}
          </span>
        </div>
      )
    },
    {
      key: 'date',
      header: 'Date',
      render: (item: Contact) => (
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Calendar className="w-3 h-3" />
          {format(new Date(item.createdAt), 'MMM d, yyyy')}
        </div>
      )
    },
    {
      key: 'actions',
      header: '',
      className: 'w-20 text-right',
      render: (item: Contact) => (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleRead(item); }}
            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-300"
            title={item.isRead ? "Mark as Unread" : "Mark as Read"}
          >
            {item.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }}
            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:border-red-300"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Messages" 
        subtitle="Manage inquiries from your contact form."
      />

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* List View */}
        <div className={cn("flex-1 w-full transition-all duration-300", selectedContact ? "xl:w-1/2 hidden xl:block" : "")}>
           <DataGrid 
            columns={columns} 
            data={contacts} 
            isLoading={isLoading}
            onRowClick={setSelectedContact}
            emptyState={
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No messages yet</h3>
                <p className="text-slate-500 text-sm">New inquiries will appear here.</p>
              </div>
            }
          />
        </div>

        {/* Detail View (Side Panel) */}
        {selectedContact && (
          <div className="w-full xl:w-1/2 animate-in slide-in-from-right-8 duration-300 xl:sticky xl:top-6">
              <DashboardCard className="relative overflow-hidden border-blue-100 dark:border-blue-900/20 shadow-xl shadow-blue-500/5">
                {/* Header Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 pointer-events-none" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent border border-white/50 dark:border-slate-700">
                           {selectedContact.name.charAt(0)}
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedContact.name}</h2>
                           <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {getBusinessTypeLabel(selectedContact.businessType)}
                              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                              <span className={cn(selectedContact.isRead ? "text-slate-500" : "text-blue-600 font-medium")}>
                                {selectedContact.isRead ? 'Read' : 'New Message'}
                              </span>
                           </div>
                        </div>
                     </div>
                     <button 
                       onClick={() => setSelectedContact(null)}
                       className="p-2 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all xl:hidden"
                     >
                       Close
                     </button>
                  </div>

                  {/* Contact Details Grid */}
                      <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                         <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Expected Investment</label>
                         <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
                            <Zap className="w-4 h-4 text-amber-500" />
                            {getBudgetLabel(selectedContact.budget)}
                         </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                         <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Business Goal</label>
                         <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            {selectedContact.objective || 'N/A'}
                         </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                         <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Quick Status</label>
                         <div className="flex flex-wrap gap-2">
                            {['NEW', 'QUALIFIED', 'STRATEGY_CALL', 'REJECTED'].map(s => (
                              <button 
                                key={s}
                                onClick={() => updateContact(selectedContact.id, { status: s as any })}
                                className={cn(
                                  "px-2 py-1 rounded text-[10px] font-bold border transition-all",
                                  selectedContact.status === s 
                                    ? "bg-slate-900 text-white border-slate-900" 
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                                )}
                              >
                                {s.replace('_', ' ')}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                         <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Urgency</label>
                         <div className="flex gap-2">
                            {['LOW', 'MEDIUM', 'HIGH', 'URGENT'].map(p => (
                              <button 
                                key={p}
                                onClick={() => updateContact(selectedContact.id, { priority: p as any })}
                                className={cn(
                                  "w-6 h-6 rounded flex items-center justify-center text-[10px] font-black border transition-all",
                                  selectedContact.priority === p 
                                    ? p === 'URGENT' ? "bg-red-600 text-white border-red-600" : "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                                )}
                                title={p}
                              >
                                {p.charAt(0)}
                              </button>
                            ))}
                         </div>
                      </div>

                  {/* Message Body */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block flex items-center gap-2">
                       Strategic Objective & Growth Constraints
                    </label>
                    <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed text-xl font-medium italic border-l-4 border-blue-500 pl-6">
                      "{selectedContact.message}"
                    </p>
                  </div>
                  
                  {/* Strategic Note */}
                  <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
                    <p className="text-sm text-amber-800 dark:text-amber-400 flex items-center gap-2">
                       <Zap className="w-4 h-4" />
                       <strong>Sales Intel:</strong> This partner is interested in <b>{getBusinessTypeLabel(selectedContact.businessType)}</b> with an investment of <b>{getBudgetLabel(selectedContact.businessType)}</b>.
                    </p>
                  </div>
                  
                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-3">
                       <a href={`mailto:${selectedContact.email}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                          <Mail className="w-4 h-4" /> Reply via Email
                       </a>
                       {selectedContact.phone && (
                         <a href={`tel:${selectedContact.phone}`} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Call
                         </a>
                       )}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleRead(selectedContact)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        Mark as {selectedContact.isRead ? 'Unread' : 'Read'}
                      </button>
                      <button 
                        onClick={() => setDeleteId(selectedContact.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </DashboardCard>
          </div>
        )}
      </div>

       <DeleteConfirmation
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  )
}
