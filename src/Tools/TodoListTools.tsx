import styles from "./TodoListTools.module.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useTodoDispatch, useTodoState } from "../Todo/TodoProvider";


export const TodoListTools = () => {
	const todoState = useTodoState()
	const todoDispatch = useTodoDispatch()
	
	const isTodoAllChecked = () => {
		return todoState.todos.every((todo) => todo.isChecked);
	};

	const handleToggleAllCLick = () => {
		todoDispatch({
			type: "allChecked",
			payload: isTodoAllChecked(),
		});
	};
	const handleRemoveAllClick = () => {
		todoDispatch({
			type: "allRemove",
		});
	};

	return (
		<section className={styles.container}>
			<button className={styles.button} onClick={handleToggleAllCLick}>
				{isTodoAllChecked() ? (
					<>
						<MdOutlineRadioButtonUnchecked className={styles.checkAllIcon} /> 전체해제
					</>
				) : (
					<>
						<IoCheckmarkDoneCircleOutline className={styles.checkAllIcon} />
						전체완료
					</>
				)}
			</button>
			{/* 여러개의 class를 넣는 경우 */}
			<button className={[styles.button, styles.removeAllBtn].join(" ")} onClick={handleRemoveAllClick}>
				<MdDelete className={styles.removeAllIcon} />
				전체 삭제
			</button>
		</section>
	);
};
