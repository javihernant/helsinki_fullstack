import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Feedback = ({state}) => {
  const {good, neutral, bad} = state
  return (
    <div>
      <h1>give feedback</h1>  
      <Button handleClick={() => good.setter(good.count + 1)} text='good' />
      <Button handleClick={() => neutral.setter(neutral.count + 1)} text='neutral' />
      <Button handleClick={() => bad.setter(bad.count + 1)} text='bad' />
    </div>
    
  )
}

const StatisticLine = ({text, value}) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Stats = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const score = good - bad
  const avg = score / total
  const pos = good / total * 100
  return (
    <div>
      <h1>statistics</h1>
      <div>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={pos + ' %'} />
      </div>
    </div>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const state = {
    good: {
      count: good,
      setter: setGood,
    },
    neutral: {
      count: neutral,
      setter: setNeutral,
    },
    bad: {
      count: bad,
      setter: setBad,
    }
  }

  return (
    <div>
      <Feedback state={state} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App