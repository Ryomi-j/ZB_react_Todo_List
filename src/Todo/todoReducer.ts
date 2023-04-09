import { saveTodos } from "./todoStorage";

export type TodoType = {
	id: number;
	text: string;
	isChecked: boolean;
};

export type TodoStateType = {
	todos: TodoType[];
};

export type TodoActionType =
	| {
			type: "add";
			payload: {
				text: string;
			};
	  }
	| {
			type: "remove";
			payload: {
				id: number;
			};
	  }
	| {
			type: "checked";
			payload: {
				id: number;
			};
	  }
	| {
			type: "allChecked";
			payload: boolean;
	  }
	| {
			type: "allRemove";
	  };

// state : 로컬 스토리지에 저장된 todos
export const todoReducer = (state: TodoStateType, action: TodoActionType) => {
	switch (action.type) {
		case "add": {
            // 로컬 스토리지에 저장된 todos와 새로 들어온 데이터를 합쳐 준다
			const newTodos = state.todos.concat({
				id: Date.now(),
				text: action.payload.text,
				isChecked: false,
			});

            // 로컬 스토리지에 합친 내용을 저장해준다
			saveTodos(newTodos);

            // reducer 함수는 현재 상태와 action 객체를 받아 새로운 상태를 반환한다.
			return {
				todos: newTodos,
			};
		}

		case "remove": {
			const newTodos = state.todos.filter((todo) => {
				return todo.id !== action.payload.id;
			});
            
			saveTodos(newTodos);

			return {
				todos: newTodos,
			};
		}

		case "checked": {
            const newTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        isChecked: !todo.isChecked,
                    };
                }
                return todo;
            })
            saveTodos(newTodos)

            return {
				todos: newTodos
			}; 
        }
			
		case "allChecked":
            {
                const newTodos = state.todos.map((todo) => {
                    return { ...todo, isChecked: !action.payload };
                })

                saveTodos(newTodos)

                return {
                    todos: newTodos
                };
            }
            
		case "allRemove":{
            saveTodos([])
			return {
				todos: [],
			};
        }
	}
};
