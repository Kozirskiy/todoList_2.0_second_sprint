import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

const todolistId1 = v1();
const todolistId2 = v1();

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([

    {id: todolistId1, title: 'Whatto learn', filter: 'all'},
    {id: todolistId2, title: 'Whatto buy', filter: 'all'}

  ])


  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQl', isDone: true },
      { id: v1(), title: 'Node JS', isDone: false },
    ]
  })



  const deleteTask = (taskId: string, todolistId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
  }

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
      ...todolist, filter} : todolist) )
  }



  const createTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }



  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
    setTasks(newState)
  }

  return (
      <div className="app">
        {todolists.map(todolist => {

          let filteredTasks = tasks
          if (todolist.filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
          }
          if(todolist.filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
          }
          return (
              <TodolistItem key={todolist.id}
                            todolist={todolist}
                            tasks={filteredTasks}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            createTask={createTask}
                            changeTaskStatus={changeTaskStatus}
                            />
          )
        })}

      </div>
  )
}
