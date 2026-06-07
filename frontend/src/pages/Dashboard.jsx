import { useEffect, useState } from 'react'
import { getAllLeads, getStats } from '../api/leads'
import LeadCard from '../components/LeadCard'

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({})
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLeads = async () => {
    const res = await getAllLeads({ search, status, page, limit: 10 })
    setLeads(res.data.data)
    setTotalPages(res.data.pagination.totalPages)
  }

  const fetchStats = async () => {
    const res = await getStats()
    setStats(res.data.data)
  }

  useEffect(() => {
    fetchLeads()
    fetchStats()
  }, [search, status, page])

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-800' },
          { label: 'New', value: stats.New, color: 'text-blue-600' },
          { label: 'Contacted', value: stats.Contacted, color: 'text-yellow-600' },
          { label: 'Converted', value: stats.Converted, color: 'text-green-600' },
          { label: 'Lost', value: stats.Lost, color: 'text-red-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value || 0}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, company..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Name', 'Email', 'Phone', 'Company', 'Status', 'Created', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">
                  No leads found. Click "+ Add Lead" to get started.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <LeadCard key={lead._id} lead={lead} onDelete={fetchLeads} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded text-sm ${
                page === p ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}