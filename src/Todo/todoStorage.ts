import { TodoType } from "./todoReducer";

// TodoType의 배열 데이터를 로컬 스토리지에 저장하기 위한 함수를 정의하고 있다.
// 이 함수를 사용해 TodoType 배열 데이터를 로컬 스토리지에 저장하고 이후 해당 데이터를 불러와 사용 가능
export const saveTodos = (todos:TodoType[]) => {
    // localStorage.setItem(key, value)
    // localStorage에 'todos'라는 키로 JSON.stringify(todos)를 값으로 저장
    // JSON.stringify() 함수는 js 객체나 배열을 JSON 문자열로 변환하는 함수
    // 로컬스토리지에는 문자열 형태로 데이터를 저장해야 하므로 사용
    localStorage.setItem('todos', JSON.stringify(todos))
}

export const loadTodos = () => {
    const todoJson = localStorage.getItem('todos')

    if(!todoJson) return []

    // JSON은 JavaScript Object Notation의 약자로 js 객체를 문자열 형태로 표현하기 위한 포맷
    // JSON.parse()는 JSON 형태의 문자열을 파싱해 js 객체로 변환하는 함수
    try {
        return  JSON.parse(todoJson)
    } catch (e) {
        console.error(e)
        return []
    }
}