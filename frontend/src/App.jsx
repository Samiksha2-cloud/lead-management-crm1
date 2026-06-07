import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddLead from './pages/AddLead'
import EditLead from './pages/EditLead'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddLead />} />
            <Route path="/edit/:id" element={<EditLead />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App