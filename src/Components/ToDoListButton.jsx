function ToDoListButton(props) {
  let id = props.id;
  let currentIndex = props.tasts.findIndex((item) => item.id == id)
  let prevIndex = currentIndex - 1;
  let nextIndex = currentIndex + 1;

  let prevButton = '';
  if(props.tasts[prevIndex] != undefined) {
    prevButton = '👆';
  }else {
    prevIndex = '';
  }

  let nextButton = '';
  if(props.tasts[nextIndex] != undefined) {
    nextButton = '👇';
  }else {
    nextIndex = '';
  }
  return (
    <>
        <span><button onClick={() => props.move(currentIndex, prevIndex)}>{prevButton}</button></span>
        <span><button onClick={() => props.move(currentIndex, nextIndex)}>{nextButton}</button></span>
        <span><button onClick={() => props.remove(props.id)}>🗑️</button></span>
    </>
  )
}

export default ToDoListButton