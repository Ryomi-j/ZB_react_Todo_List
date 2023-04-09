import { useTodoState } from "../Todo/TodoProvider";
import styles from "./TodoHeader.module.css";

export const TodoHeader = () => {
	const todoState = useTodoState();
	const count = todoState.todos.filter((todo) => !todo.isChecked).length;

	return (
		<header>
			<h1>
				<mark className={styles.todoCount}>{count}</mark>
				개의 할 일
			</h1>
		</header>
	);
};
