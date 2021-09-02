import React, { useState } from 'react'
import { useTodoProvider } from '../../Context/TodoProvider'
import Button from '../Button/Button'
import TodoInputForm from '../TodoInputForm/TodoInputForm'

function TodoItem({todo}) {
    const [edit, setEdit ]= useState(false)
    const { deleteItem,updateItem } = useTodoProvider();
    async function update(value){
        const details = {
            id : value.id,
            name : value.name,
            description : value.description
        }
        await updateItem(details)
        setEdit(false)
    }
    return (
        <div >
            {
                edit ? 
                <TodoInputForm onSubmitTodo={update} initialState={todo} buttonValue="update"/>
                :
                <div className="p-2 m-2 border-2 border-black">
            <div className="flex justify-between">
            <p className="text-2xl font-medium">{todo.name}</p>
            <div>
            <Button content="Edit" onClick={()=> setEdit(true)}/>
            <Button content="Delete" onClick={()=>deleteItem(todo.id)}/>
            </div>
            </div>
            <p >{todo.description}</p>
          </div>
            }
        </div>
    )
}

export default TodoItem
