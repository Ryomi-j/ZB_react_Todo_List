import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { TodoInputActionType, todoInputReducer, TodoInputStateType } from "./todoInputReducer";
import { TodoActionType, todoReducer, TodoStateType } from "./todoReducer";
import { loadTodos } from "./todoStorage";

// TodoProvider 컴포넌트가 children을 포함하고 있으며 자식 요소들을 렌더링 할 수 있도록 함
// children은 react 노드 타입을 가짐
interface TodoProviderProps {
	children: ReactNode;
}

const TodoStateContext = createContext<TodoStateType | null>(null);
const TodoDispatchContext = createContext<Dispatch<TodoActionType> | null>(null);
const InputTodoContext = createContext<TodoInputStateType | null>(null);
const InputTodoDispatchContext = createContext<Dispatch<TodoInputActionType> | null>(null);

export const TodoProvider = (props: TodoProviderProps) => {
	const [todoState, todoDispatch] = useReducer(todoReducer, { todos: loadTodos() });
	const [inputState, inputDispatch] = useReducer(todoInputReducer, { text: "" });

    // Provider를 사용하면 하위 컴포넌트는 전달하는 value값에 접근할 수 있고 value값이 변하면 리렌더링
	// context는 value 값이 바꾸면 하위가 리렌더링
	// dispatch는 값이 바뀌지 않으면 리렌더링되지 않음
	return (
		<TodoStateContext.Provider value={todoState}>
			<TodoDispatchContext.Provider value={todoDispatch}>
				<InputTodoContext.Provider value={inputState}>
					<InputTodoDispatchContext.Provider value={inputDispatch}>{props.children}</InputTodoDispatchContext.Provider>
				</InputTodoContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	);
};

export const useTodoState = () => {
	const value = useContext(TodoStateContext);

	if (!value) {
		throw new Error("cannot find todoState");
	}
	return value;
};

export const useTodoDispatch = () => {
	const value = useContext(TodoDispatchContext);

	if (!value) {
		throw new Error("cannot find todoDispatch");
	}
	return value;
};

export const useInputTodoState = () => {
	const value = useContext(InputTodoContext);

	if (!value) {
		throw new Error("cannot find inputTodoState");
	}
	return value;
};

export const useInputTodoDispatch = () => {
	const value = useContext(InputTodoDispatchContext);

	if (!value) {
		throw new Error("cannot find inputTodoDispatch");
	}
	return value;
};
