const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
const Part = (props) => {
    return (
      <p>
          {props.name} {props.exercises}
      </p>
    )
}
  
const Content = ({parts}) => {
    return (
        <div>
            <ul>
                {parts.map((part) => <li key={part.id}><Part name={part.name} exercises={part.exercises} /></li>)}
            </ul>    
        </div>
    )
}
  
const Total = ({parts}) => {
    return (
        <p>Number of exercises {parts.reduce((acc, part)=> acc + part.exercises, 0)}</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

export default Course