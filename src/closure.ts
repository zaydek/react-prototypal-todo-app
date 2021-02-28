export interface Todo {
	state: {
		id: string
		done: boolean
		text: string
	}
	reset(): void
	setDone(done: boolean): void
	setText(text: string): void
}

export interface TodoApp {
	state: {
		todo: Todo
		todos: Todo[]
	}
	add(): void
	remove(id: string): void
}

export const newTodo = ({ done, text } = { done: false, text: "" }): Todo => ({
	state: {
		id: Math.random().toString(36).slice(2, 6),
		done,
		text,
	},
	reset() {
		const { state } = this
		Object.assign(state, {
			done: false, // Reset
			text: "", // Reset
		})
	},
	setDone(done: boolean) {
		const { state } = this
		state.done = done
	},
	setText(text: string) {
		const { state } = this
		state.text = text
	},
})

export const newTodoApp = (): TodoApp => ({
	state: {
		todo: newTodo(),
		todos: [],
	},
	add() {
		const { state } = this
		if (state.todo.state.text === "") {
			// No-op
			return
		}
		state.todos.unshift(state.todo)
		state.todo = newTodo()
	},
	remove(id: string) {
		const { state } = this
		state.todos = state.todos.filter(each => each.state.id !== id)
	},
})
