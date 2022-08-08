
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

//
import Modal from '../components/modal/Modal'
import { myAxios } from '../sevices/axios/index'


export default function Todo() {
    const [modal, setModal] = useState(false)
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [addLoading, setAddLoading] = useState(false)
    const [currentTodo, setCurrentTodo] = useState(null)
  
    useEffect(() => {
      getAllTodos()
    }, [])
  
    async function getAllTodos() {
      setIsLoading(true)
      try {
        const res = await myAxios('/api/todo')
        setTodos(res.data.data);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        setError('Server bilan muammo yuzaga keldi')
      }
    }
  
    async function onAddTodo() {
      setAddLoading(true)
      try {
        const res = await myAxios.post('/api/todo', { name, color: genColor() })
        toast.success(res.data.msg)
        getAllTodos()
        setAddLoading(false)
        setName('')
      } catch (error) {
        setAddLoading(false)
        toast.error("Serverda xatolik, qaytadan urinib ko'ring !!!")
      }
    }
  
    function randNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  
    function genColor() {
      let color = '#'
      for (let i = 0; i < 6; i++) {
        let rn = randNumber(0, 15)
        color += rn.toString(16)
      }
      return color;
    }
  
    async function onDeleteTodo(id) {
      setIsLoading(true)
      try {
        const res = await myAxios.delete('/api/todo/' + id)
        toast.success(res.data.msg)
        getAllTodos()
      } catch (error) {
        toast.error("Serverda muammo yuzaga keldi, qaytadan urinib ko'ring")
        setIsLoading(false)
  
      }
    }
  
    async function onCheckedTodo(id) {
      setIsLoading(true)
      try {
        const res = await myAxios('/api/todo/toggleComplete/' + id)
        toast.success(res.data.msg)
        getAllTodos()
      } catch (error) {
        toast.error("Serverda muammo yuzaga keldi, qaytadan urinib ko'ring")
        setIsLoading(false)
      }
    }
  return (
    
    <div className='container py-5' >
      <header>
        <div className='row'>
          <div className='col-10'>
            <input type="text" className='form-control' placeholder='Name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='col-2'>
            <button type='button' className='btn btn-primary w-100'
              onClick={onAddTodo}
              disabled={addLoading}
            >
              Add
            </button>
          </div>
        </div>
      </header>
      <main className='mt-5'>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <ul className='list-unstyled'>
            {todos.map((i) => (
              <li key={i._id} className='shadow p-3 mb-3 rounded d-flex align-items-center justify-content-between'
                style={{ backgroundColor: i.color }}
              >
                <div className='form-check'>
                  <input type="checkbox"
                    className='form-check-input'
                    checked={i.isCompleted}
                    onChange={() => onCheckedTodo(i._id)}
                  />
                </div>
                <p className='m-0'
                style={{fontSize:'24px', fontWeight:'500'}}>{i.name}</p>
                <div className='d-flex gap-3'>
                  <button type='button' className='btn btn-warning btn-sm'
                    onClick={() => {
                      setCurrentTodo(i)
                      setModal(true)
                    }}
                  >Edit
                  </button>
                  <button type='button' className='btn btn-danger btn-sm'
                    onClick={() => onDeleteTodo(i._id)}
                  >Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </main>
      <Modal modal={modal} onClose={() => setModal(false)}
        todo={currentTodo}
        getAllTodos={getAllTodos} />
    </div>
  )
}
