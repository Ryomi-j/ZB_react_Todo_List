import { TodoItem } from "../ListItem/TodoItem";
import { useTodoState } from "../Todo/TodoProvider";
import { TodoType } from "../Todo/todoReducer";
import styles from "./TodoList.module.css";

interface TodoListProps {
	todos: TodoType[];
}

export const TodoList = () => {
	const todoState = useTodoState()
	return (
		<section>
			<ol className={styles.olContainer}>
				{todoState.todos.map((todo) => {
					return (
						<TodoItem
							key={todo.id}
							id={todo.id}
							text={todo.text}
							isChecked={todo.isChecked}
						/>
					);
				})}
			</ol>
		</section>
	);
};
