import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
// import {Button} from './Button'
// import Button from '@mui/material/Button'
import {TextField} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title}*/}
            {/*       onChange={changeItemTitleHandler}*/}
            {/*       onKeyDown={createItemOnEnterHandler}/>*/}
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={title}
                       size={'small'}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}