import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE_URL = 'http://localhost:8000'
const TASKS_ENDPOINT = `${API_BASE_URL}/api/tasks/`

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const trimmedTitle = useMemo(() => title.trim(), [title])

  async function fetchTasks() {
    setError('')
    const res = await fetch(TASKS_ENDPOINT)
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    let cancelled = false

    async function init() {
      try {
        await fetchTasks()
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load tasks')
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])


  async function addTask(e) {
    e.preventDefault()
    if (!trimmedTitle) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch(TASKS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trimmedTitle }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.title?.[0] || 'Failed to create task')
      }

      setTitle('')
      // Refresh list
      await fetchTasks()
    } catch (err) {
      setError(err?.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '24px auto', fontFamily: 'system-ui' }}>
      <h1>Task Management System</h1>

      <form onSubmit={addTask} style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading || !trimmedTitle} style={{ padding: '10px 16px' }}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {error ? <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div> : null}

      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {tasks.map((t) => (
            <li key={t.id} style={{ margin: '8px 0' }}>
              <span style={{ textDecoration: t.is_completed ? 'line-through' : 'none' }}>{t.title}</span>
              <span style={{ marginLeft: 10, fontSize: 12, color: '#666' }}>
                {t.is_completed ? 'Completed' : 'Not completed'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App

