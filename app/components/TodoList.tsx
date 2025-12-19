"use client"

import { Todo } from "@/types/todo"

type Props = {
  todos: Todo[]
  pendingId: string | null
  onToggle: (id: string, isDone: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function TodoList({ todos, pendingId, onToggle, onDelete }: Props) {
  const working = !!pendingId

  if (!todos.length) {
    return <p className="muted">No todos yet. Add your first one!</p>
  }

  return (
    <div className="stack gap-lg">
      {todos.map((todo) => (
        <article
          key={todo.id}
          className={`todo ${todo.is_done ? "done" : ""}`}
          aria-busy={working}
        >
          <div className="row between wrap">
            <div className="stack">
              <h3 className="title">{todo.title}</h3>
              <p className="muted">Created {new Date(todo.created_at).toLocaleString()}</p>
            </div>
            <span className={`pill ${todo.is_done ? "done" : ""}`}>
              {todo.is_done ? "Done" : "Open"}
            </span>
          </div>
          <div className="row gap-lg">
            <button
              type="button"
              className="secondary"
              disabled={working}
              onClick={() => onToggle(todo.id, !todo.is_done)}
            >
              {working ? "Working…" : todo.is_done ? "Mark open" : "Mark done"}
            </button>
            <button
              type="button"
              className="danger"
              disabled={working}
              onClick={() => onDelete(todo.id)}
            >
              {working ? "Working…" : "Delete"}
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

