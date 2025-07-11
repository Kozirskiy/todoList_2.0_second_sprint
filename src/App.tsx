import './App.css'
import {useReducer, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './components/TodolistItem.tsx'
import {CreateItemForm} from "./CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {containerSx} from "./components/TodolistItem.styles.ts.tsx";
import {NavButton} from './components/NavButton.ts'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolistsReducer.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type ThemeMode = 'dark' | 'light'
export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}


const todolistId1 = v1();
const todolistId2 = v1();


export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [

        {id: todolistId1, title: 'Whatto learn', filter: 'all'},
        {id: todolistId2, title: 'Whatto buy', filter: 'all'}

    ])


    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Laptop', isDone: true},
            {id: v1(), title: 'Mobile phone', isDone: true},
            {id: v1(), title: 'Flat', isDone: false},
        ]
    })
    const changeFilter = (todolistId: string, filter: FilterValues) => {

        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))

    }

    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTasks({...tasks, [action.payload.id]: []})
    }
    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }
    ///////////

    const deleteTodolist = (todolistId: string) => {

        dispatchToTodolists(deleteTodolistAC(todolistId))
        const  copy = {...tasks}
        delete copy[todolistId]
        setTasks(copy)
    }
    ///////////////


    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists!.map(todolist => {

                            const todolistTasks = tasks[todolist.id]

                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodolistItem key={todolist.id}
                                                      todolistId={todolist.id}
                                                      todolist={todolist}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>

                            )
                        })}
                    </Grid>


                </Container>
            </ThemeProvider>


        </div>
    )
}
