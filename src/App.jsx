import { useEffect, useRef, useState } from 'react'
import './App.css'
import Form from './Components/Form'
import ToDoList from './Components/ToDoList'
function App() {
  const newTask = useRef('');
  const STORAGE = 'TODOLIST_APP';
  const [tasts,setTasts] = useState(()=>{
    return JSON.parse(localStorage.getItem(STORAGE)) || []
  });
  
  const [taskCompleted, setTaskCompleted] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE,JSON.stringify(tasts));
    const complete = tasts.filter((item) => item.completed == true).length
    setTaskCompleted(complete)
    }, [tasts])

  function setId() {
    if(tasts == '') {
      return 1
    }else {
      return tasts[0].id + 1
    }
  }

  function addTask(event) {
    event.preventDefault();
    if(newTask.current.valueOf == '') {
      alert('Silahkan masukkan kata/angka terlebih dahulu');
      return false
    }
    const data = {
      id: setId(),
      task: newTask.current.value,
      completed: false
    }
    newTask.current.value = ''
    setTasts([...tasts,data]);
  }

  function setCompleted(id) {
    let taskItem = [];
    tasts.map((item,index) => {
      if(item.id == id) {
       taskItem[index] = { ...item, completed: !item.completed }
      }else {
        taskItem[index]= item
      }
    })
    setTasts(taskItem)
  }

  function move(currentIndex, updateIndex) {
    const currentData = tasts[currentIndex]
    const updateData = tasts[updateIndex]

    tasts[currentIndex] = {...currentData, id: updateData.id }
    tasts[updateIndex] = {...updateData, id: currentData.id }

    const newData = [...tasts]
    setTasts(newData)
}

  function remove(id) {
    if(window.confirm('yakin mau di hapus')) {
      setTasts(tasts.filter((item) => item.id != id))
    }
  }


  return (
    <>

    <Form addTask={addTask} newTask={newTask} taskCompleted={taskCompleted} task={tasts}/>
    <ToDoList tasks={tasts} setCompleted={setCompleted} move={move} remove={remove} />
    </>
  )
}

export default App;
