import * as creators from "./creators"
import * as React from "react"

function useRender() {
	const [, setState] = React.useState(0)
	return (_: void) => setState(s => s + 1)
}

export default function App() {
	// @ts-ignore
	const app = React.useMemo(() => new creators.TodoApp() as creators.TodoAppType, [])
	const render = useRender()

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault()
					render(app.add())
				}}
			>
				<input type="checkbox" checked={app.todo.done} onChange={e => render(app.todo.setDone(e.target.checked))} />
				<input type="text" value={app.todo.text} onChange={e => render(app.todo.setText(e.target.value))} />
				<button type="submit">+</button>
			</form>

			{app.todos.map(todo => (
				<div key={todo.id}>
					<input type="checkbox" checked={todo.done} onChange={e => render(todo.setDone(e.target.checked))} />
					<input type="text" value={todo.text} onChange={e => render(todo.setText(e.target.value))} />
					<button onClick={e => render(app.remove(todo.id))}>-</button>
				</div>
			))}

			<pre>{JSON.stringify(app, null, 2)}</pre>
		</div>
	)
}
