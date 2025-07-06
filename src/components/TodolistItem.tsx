import type {FilterValues, Task, Todolist} from '../App.tsx'
// import {Button} from "./Button.tsx";
import Button from '@mui/material/Button'
import {CreateItemForm} from "../CreateItemForm.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "../EditableSpan.tsx";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Checkbox} from '@mui/material';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from './TodolistItem.styles.ts.tsx'


type Props = {
    todolistId: string
    todolist: Todolist
    tasks: Task[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        todolistId,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={deleteTodolistHandler}/>*/}
            </div>

            <CreateItemForm onCreateItem={createTaskHandler}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {

                        const deleteTaskHandler = () => {
                            deleteTask(task.id, todolistId)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolistId, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}>
                                {/*<input type="checkbox" checked={task.isDone}*/}
                                {/*       onChange={changeTaskStatusHandler}/>*/}
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                {/*<Button title={'x'} onClick={deleteTaskHandler}/>*/}
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            {/*<div>*/}
            {/*    <Button className={filter === 'all' ? 'active-filter' : ''}*/}
            {/*            title={'All'}*/}
            {/*            onClick={() => changeFilterHandler('all')}/>*/}
            {/*    <Button className={filter === 'active' ? 'active-filter' : ''}*/}
            {/*            title={'Active'}*/}
            {/*            onClick={() => changeFilterHandler('active')}/>*/}
            {/*    <Button className={filter === 'completed' ? 'active-filter' : ''}*/}
            {/*            title={'Completed'}*/}
            {/*            onClick={() => changeFilterHandler('completed')}/>*/}
            {/*</div>*/}

            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
