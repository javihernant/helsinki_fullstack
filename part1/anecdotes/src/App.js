import { useState } from 'react'

const Anecdote = ({anecdote, rating}) => {
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {rating} votes</p>
    </div>
  )
}

const Anecdotes = ({anecdotes, ratings, setRatings, selected, setSelected}) => {
  const nextAnecdote = () => {
    const next = Math.floor(Math.random() * (anecdotes.length - 1))
    console.log(next)
    setSelected(next)
  }

  const voteAnecdote = () => {
    const ratingsCopy = [...ratings]
    ratingsCopy[selected] += 1
    setRatings(ratingsCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} rating={ratings[selected]} />
      <div>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
      <div>
        <button onClick={voteAnecdote}>vote</button>
      </div>
    </div>
    
  )
}

const MostVoted = ({anecdotes, ratings}) => {
  const findMax = () => {
    if (ratings.length === 0) {
      return -1
    }
    var idx = 0
    var max = ratings[0]
    for (var i=1; i < ratings.length; i++) {
      if (ratings[i] > max) {
        max = ratings[i]
        idx = i
      }
    }
    return idx
  }

  const maxIdx = findMax(ratings)

  return (
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[maxIdx]} rating={ratings[maxIdx]} />
      </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [ratings, setRatings] = useState(Array(anecdotes.length).fill(0))
  



  return (
    <div>
      <Anecdotes anecdotes={anecdotes} ratings={ratings} selected={selected} setRatings={setRatings} setSelected={setSelected} />
      <MostVoted anecdotes={anecdotes} ratings={ratings} />
    </div>
    
  )
}

export default App