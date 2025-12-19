"use client"

import { FormEvent, useState } from "react"

type Props = {
  pending: boolean
  onSubmit: (title: string) => Promise<void>
}

export function TodoForm({ pending, onSubmit }: Props) {
  const [title, setTitle] = useState("")

  return (
    <form
      className="stack gap-lg"
      onSubmit={async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const value = title.trim()
        if (!value) return
        await onSubmit(value)
        setTitle("")
      }}
    >
      <div className="stack">
        <label htmlFor="title">Create a todo</label>
        <input
          id="title"
          placeholder="Buy milk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={120}
          disabled={pending}
        />
      </div>
      <div className="row between">
        <span className="muted">Submit to insert a new row in Supabase</span>
        <button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Add"}
        </button>
      </div>
    </form>
  )
}

