// prettier-ignore
export interface TodoType {
	id:   string
	done: boolean
	text: string

	reset(): void
	setDone(done: boolean): void
	setText(text: string): void
}

// prettier-ignore
export interface TodoAppType {
	todo:  TodoType
	todos: TodoType[]

	add(): void
	remove(id: string): void
}

////////////////////////////////////////////////////////////////////////////////

export function Todo(this: TodoType, { done, text }: { done: boolean; text: string } = { done: false, text: "" }) {
	const id = Math.random().toString(36).slice(2, 6)
	Object.assign(this, {
		id,
		done,
		text,
	})
	return this
}

Todo.prototype.reset = function (this: TodoType) {
	this.done = false
	this.text = ""
}

Todo.prototype.setDone = function (this: TodoType, done: boolean) {
	this.done = done
}

Todo.prototype.setText = function (this: TodoType, text: string) {
	this.text = text
}

////////////////////////////////////////////////////////////////////////////////

export function TodoApp(this: TodoAppType) {
	Object.assign(this, {
		//@ts-ignore
		todo: new Todo(),
		todos: [],
	})
	return this
}

TodoApp.prototype.add = function (this: TodoAppType) {
	if (this.todo.text === "") return
	this.todos.unshift(this.todo)
	//@ts-ignore
	this.todo = new Todo()
}

TodoApp.prototype.remove = function (this: TodoAppType, id: string) {
	this.todos = this.todos.filter(each => each.id !== id)
}
