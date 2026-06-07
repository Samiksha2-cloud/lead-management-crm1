import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateLead, getAllLeads } from '../api/leads'
import axios from 'axios'

export default function EditLead() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', status: 'New', notes: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/leads/${id}`)
      setForm(res.data.data)
    }
    fetch()
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateLead(id, form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Lead</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'text' },
          { label: 'Company', name: 'company', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-sm text-gray-600 mb-1 block">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        ))}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
                      {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="border border-gray-200 px-6 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}