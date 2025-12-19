'use client'
import { useEffect, useState } from "react"
import { TodoForm } from "@/app/components/TodoForm"
import { TodoList } from "@/app/components/TodoList"
import { supabaseBrowser as supabase } from "@/lib/supabaseBrowser"
import { Todo } from "@/types/todo"

export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [pendingId, setPendingId] = useState<string | null>(null)

    useEffect(() => {
        const load = async () => {
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("created_at", { ascending: false })
            if (error) {
                console.error("[Supabase] fetchTodos error", error)
            } else {
                setTodos(data ?? [])
            }
            setLoading(false)
        }

        void load()
    }, [])

    const handleAdd = async (title: string) => {
        setAdding(true)
        const { data, error } = await supabase
            .from("todos")
            .insert({ title })
            .select()
            .single()
        setAdding(false)

        if (error) {
            console.error("[Supabase] createTodo error", error)
            return
        }

        if (data) {
            setTodos((prev) => [data as Todo, ...prev])
        }
    }

    const handleToggle = async (id: string, isDone: boolean) => {
        setPendingId(id)
        const { error } = await supabase.from("todos").update({ is_done: isDone }).eq("id", id)
        setPendingId(null)

        if (error) {
            console.error("[Supabase] toggleTodo error", error)
            return
        }

        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, is_done: isDone } : t)))
    }

    const handleDelete = async (id: string) => {
        setPendingId(id)
        const { error } = await supabase.from("todos").delete().eq("id", id)
        setPendingId(null)

        if (error) {
            console.error("[Supabase] deleteTodo error", error)
            return
        }

        setTodos((prev) => prev.filter((t) => t.id !== id))
    }

    return (
        <main className="container">
            <div className="card stack gap-lg">
                <div className="stack">
                    <h1 className="title">Next.js + Supabase CRUD</h1>
                    <p className="subtitle">
                        Client-only CRUD with Supabase JavaScript client—no server actions or Express.
                    </p>
                </div>

                <TodoForm pending={adding} onSubmit={handleAdd} />

                <div className="stack gap-lg">
                    <h2 className="title">Todos</h2>
                    {loading ? (
                        <p className="muted">Loading…</p>
                    ) : (
                        <TodoList
                            todos={todos}
                            pendingId={pendingId}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}
