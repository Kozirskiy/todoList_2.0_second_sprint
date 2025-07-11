import type {TasksState} from '../App'
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {

        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }

        case 'delete_todolist': {
            const  newState = {...state}
            delete newState[action.payload.id]
            return newState
        }

        default:
            return state
    }
}


export const deleteTodolistAC =(id: string)=> {
    return {
        type: 'delete_todolist',
        payload: {
            id
        }
    } as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>


export const createTodolistAC = (title: string)=> {
    return {
        type: 'create_todolist',
        payload: {
            id: v1(),
            title
        }
    } as const
}
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>




type Actions = CreateTodolistAction | DeleteTodolistAction