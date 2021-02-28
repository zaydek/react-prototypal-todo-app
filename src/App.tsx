import * as closure from "./closure"
import * as React from "react"

function useRender() {
	const [, setState] = React.useState(0)
	return (_: void) => setState(s => s + 1)
}

export default function App() {
	const app = React.useMemo(() => closure.newTodoApp(), [])
	const render = useRender()

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault()
					render(app.add())
				}}
			>
				<input
					type="checkbox"
					checked={app.state.todo.state.done}
					onChange={e => render(app.state.todo.setDone(e.target.checked))}
				/>
				<input
					type="text"
					value={app.state.todo.state.text}
					onChange={e => render(app.state.todo.setText(e.target.value))}
				/>
				<button type="submit">+</button>
			</form>

			{app.state.todos.map(todo => (
				<div key={todo.state.id}>
					<input type="checkbox" checked={todo.state.done} onChange={e => render(todo.setDone(e.target.checked))} />
					<input type="text" value={todo.state.text} onChange={e => render(todo.setText(e.target.value))} />
					<button onClick={e => render(app.remove(todo.state.id))}>-</button>
				</div>
			))}

			<pre>{JSON.stringify(app, null, 2)}</pre>
		</div>
	)
}
