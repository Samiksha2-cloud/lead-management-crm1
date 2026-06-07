import { useNavigate } from 'react-router-dom'
import { deleteLead } from '../api/leads'

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Converted: 'bg-purple-100 text-purple-700',
  Lost: 'bg-red-100 text-red-700',
}

export default function LeadCard({ lead, onDelete }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(lead._id)
      onDelete()
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-800">{lead.name}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{lead.company}</td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
          {lead.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 flex gap-3">
        <button
          onClick={() => navigate(`/edit/${lead._id}`)}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}