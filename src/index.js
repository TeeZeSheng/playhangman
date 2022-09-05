import React, { useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';

class Menu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.status === 0){
      return(
        <Box textAlign='center' sx={{py: 30}}>
          <h1 className="text">HANGMAN</h1>
          <Button selected className="ply" variant="contained" onClick={this.props.onclick} color={'success'}>
            Play
          </Button>
        </Box> 
      )
    }else if(this.props.status === 1){
      return(
        <div>
          <Word />
        </div>
        
      )
    }
    
}
}

class Word extends React.Component{
  constructor(props){
    super(props);
    this.state = {word: "", begin: 0};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlerChange = this.handlerChange.bind(this);

  }

  handlerChange(e){
    this.setState({word: e.target.value});
  }

  handleSubmit(e){
    this.setState({begin: 1});
    e.preventDefault();
    
    
  }
  
  handleEnter(e){
    if (e.key === 'Enter'){
      this.handleSubmit();
    }
  }
    
  render(){
    const w = this.state.word;
    if (this.state.begin === 0){
    return(
      <Box sx={{my: 10, py: 10, width: 1000, border: 1, borderRadius: 5, bgcolor: '#9ea9b1' }} m='auto' display='flex' justifyContent="center" alignItems="center">
        <Stack sx={{py: 10, bgcolor:'#9ea9b1'}} justifyContent="center" alignItems="center" spacing={2}>
          <h1 className='text'>Enter Word</h1>
          <form>
          <TextField sx={{borderColor: 'black'}}type="text" id="word" name="word" autoComplete='off' value={this.state.word} onChange={this.handlerChange} onKeyDown={this.handleEnter}></TextField>
          </form>
          <Button onClick={this.handleSubmit} variant="contained" size='large'>BEGIN</Button>
        </Stack>
      </Box>

    )}else if (this.state.begin === 1){
      return(
        <Start userWord = {w}/>
      )
    }
  }

}

function Start(props){
  let blanks = [];
  const l = props.userWord.length
  for(let i = 0; i < l; i++){
    blanks.push("_ ");
  }
  for(let i = 0; i < blanks.length; i++){
    if(props.userWord[i] === " "){
      blanks[i] = <br></br>
    }
  }
  const [space, setspace] = useState(blanks);
  const [letter, setLetter] = useState("");
  const [life, setLife] = useState(5);
  const [counter, setCounter] = useState(0);
  const [usedLetter, setUsedLetter] = useState([]);
  const [repeat, setRepeat] = useState([])
  const [index, setIndex] = useState(0)
  const displayHeart = []

  

  function check(){
    var letters = /^[0-9a-zA-Z]+$/;
    let checkAns = 0;
    let minus_one = 1;
    let is_repeated = 0;
    let userLetter = letter.toUpperCase();
    let userWord = props.userWord.toUpperCase();
    if (userLetter.match(letters))
    if (userLetter.match(letters)){
     for(let j = 0; j<repeat.length; j++){
        if(userLetter === repeat[j] || userLetter === ""){
          is_repeated = 1
          minus_one = 0
        }
      }
      if (is_repeated === 0){
        for(let i = 0; i < l; i++){
          if(userLetter === userWord[i]){
            space[i] = userLetter;
            checkAns += 1;
            minus_one = 0
          }
        }

      }
      setCounter(counter + checkAns)
      if (minus_one === 1){
        setLife(life-1)
        setUsedLetter([...usedLetter, {id: index, letter: userLetter}])
        setIndex(index+1)
      }
      setLetter("");
      setspace(space);
      setRepeat([...repeat, userLetter])
    }else{
      alert("Please enter a valid alphabet")
    }
  }

  if (life > 0 && counter !== l){
    for(let l = 0; l < life; l++){
      displayHeart[l] = {id: l+1, h: <FavoriteIcon sx={{color: "red", width: 100}} />}

    }
    return(
      <div>
      <h1 className = "blankSpace">{space}</h1> 
      <Box direction='row' sx={{mt: 5}}>
        <Stack direction='row' spacing={10} sx={{height: 500}}>
          <Card sx={{width: 200}}>
            <Stack justifyContent="center" alignItems="center">
              <u><h1 className='text'>LIFE</h1></u>
              {displayHeart.map((hearts) => 
              <h1 key = {hearts.id}>
                {hearts.h}
              </h1>)}
            </Stack>
          </Card>
          <Card sx={{radius:25, width: 400, py:20, px: 35, ml:45, mt: 10, bgcolor:'#ffdd72'}}>
            <h1 className='text'>TYPE YOUR ANSWER HERE</h1>
            <hr></hr>
            <form>
              <input type="text" id="word" name="word" maxLength={1} autoComplete='off' value={letter} onChange={(e) => setLetter(e.target.value)}
              placeholder='Enter a letter' className='answerForm' onKeyDown={(e) => {if (e.key === 'Enter')
              { e.preventDefault();
                check()}}}></input>
            </form>
            <Button onClick={check} color='success' variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Card>
          <Card sx={{bgcolor: '#9ea9b1', px: 4}}>
            <u><h1 className='text'>LETTERUSED</h1></u>
            <Stack justifyContent="center" alignItems="center">
              {usedLetter.map((letters) => (
                <div key={letters.id}>
                  <h1 className = 'usedLetter'>{letters.letter}</h1>
                  <br></br>
                </div>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Box>
      </div>
    )

  }else if (life === 0){
    return(
      <Box sx={{my: 10, py: 10, width: 1000, border: 1, borderRadius: 5, bgcolor: '#9ea9b1' }} m='auto' display='flex' justifyContent="center" alignItems="center">
        <Stack justifyContent="center" alignItems="center">
          <h1 className='text'>
            The Correct Word Is {props.userWord.toUpperCase()}
          </h1>
          <br></br>
          <Button onClick={() => 
            game.render(<Word />)
          } variant='contained' endIcon={<ReplayIcon />} sx={{bgcolor: '#64dd17'}}>
            Play Again
          </Button>
        </Stack>
    </Box>
    )
  }else if (counter === l){
    return(
      <Box sx={{my: 10, py: 10, width: 1000, border: 1, borderRadius: 5, bgcolor: '#9ea9b1' }} m='auto' display='flex' justifyContent="center" alignItems="center">
        <Stack justifyContent="center" alignItems="center">
          <h1 className='text'>
            Congratulations You've Won !!!!
          </h1>
          <Button onClick={() =>
            {
            const game = ReactDOM.createRoot(document.getElementById("root"));
            game.render(<Word />);}
          } variant='contained' endIcon={<ReplayIcon />} sx={{bgcolor: '#64dd17'}}> 
            Play Again
          </Button>
        </Stack>
      </Box>
    )
  }
}

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {status: 0}
    this.handlerPlay = this.handlerPlay.bind(this);
    this.handlerJoin = this.handlerJoin.bind(this);
  }

  handlerPlay(){
    this.setState({status: 1 });
  }

  handlerJoin(){
    this.setState({status: 2});
  }


  render(){
    if(this.state.status === 0){
      return(
        <Menu status={this.state.status} onclick={this.handlerPlay} onclick2={this.handlerJoin}/>
      )
    }else if(this.state.status === 1){
      return(
        <Menu status={this.state.status} />
      )
    }else if(this.state.status === 2){
      return(
        <Menu status={this.state.status} />
      )
    }
  }
}



const game = ReactDOM.createRoot(document.getElementById("root"));
game.render(<Game />);

// const title = ReactDOM.createRoot(document.getElementById("title"));
// title.render(<Title/>);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
