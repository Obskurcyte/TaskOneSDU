import React, {useState} from 'react';
import {Table} from "react-bootstrap";
import {Formik} from 'formik';
import './App.css';
import axios from 'axios';
import bestScores from './bestscores.json';

function App() {

    const [isUser, setIsUser] = useState(false);
    const [hp, setHp] = useState(100);
    const [xp, setXp] = useState(0);
    const [score, setScore] = useState(0);
    const [firstRoom, setFirstRoom] = useState(true);
    const [secondRoom, setSecondRoom] = useState(false);
    const [thirdRoom, setThirdRoom] = useState(false);
    const [img, setImg] = useState('https://cdn.akamai.steamstatic.com/steam/apps/1240730/extras/Details_Img05.jpg?t=1605642252')
    const [text, setText] = useState('');
    const [username, setUsername] = useState('');

    let isUserLost = false
    let unknown = false
    if (hp === 0) {
        isUserLost = true
        window.location.reload()
        bestScores.push({
            name: username,
            score: score
        })
        axios.post('http://localhost:5000/writefile', {
                bestscores: bestScores
            }
        )

    }
    const initialValues = {
        email: ''
    }

    const initialValues2 = {
        action: ''
    }
    console.log(isUser)

    console.log(bestScores)
    console.log(isUserLost)

  return (
    <div className="App" style={{padding: '1%'}}>
        <h1 style={{textAlign: 'center'}}>Task1_Simple Game</h1>
        <p style={{textAlign: 'center'}}>Good morning, new player, welcome to this new game. <br/>You first need to enter your username. <br/>
            Currently you are in the main room but as soon as you'll have entered your username, you'll be able to move between
            rooms by clicking on the 'next room' button. To play this game, you have to enter in the input field below some actions
            (search, kill or quit). According to the actions you chose, you will receive some experience, and your score will increase.
            The aim of the game, like in most games, is to have the best score possible. Good luck new player !
            <br/>To begin, first enter your username !
        </p>

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Players</th>
                <th>Best scores</th>
            </tr>
            </thead>
            <tbody>
            {bestScores.map(item => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                </tr>
            ))}
            </tbody>
        </Table>

        {isUserLost && (
            <p>Oh no ! You lost !</p>

        )}
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values)
                    setIsUser(true)
                    isUserLost = false
                    console.log(isUserLost)
                    setUsername(values.username)
                }}
            >
                {props => (
                    <div>
                        <label htmlFor="">Please enter your username</label>
                        <input
                            type="text"
                            value={props.values.username}
                            onChange={props.handleChange('username')}
                        />
                        <button onClick={props.handleSubmit}>Submit</button>
                    </div>
                )}

            </Formik>
        </div>


        {(isUser && !isUserLost && firstRoom) && (
            <div style={{padding: '2% 2%'}}>
                <h1>Welcome to the Game {username} ! You are in the main room</h1>

                <p>Your status is now : </p>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '80%', margin: '0 auto'}}>
                    <p>Hp : {hp}</p>
                    <p>XP: {xp}</p>
                    <p>Score: {score}</p>
                </div>

                <div className="imgContainer">
                    <img src={img} alt="" className='imageDarkroom'/>
                </div>
                <p>You are in a dark room, no windows, but there is a candle and some strange shapes in the corners of the room. There is a door on the west wall. What do you want do to?</p>



                    <Formik
                        initialValues={initialValues2}
                        onSubmit={async values => {
                            console.log(values)
                            if (values.action === 'search') {
                                let dice = Math.floor(Math.random() * 6) + 1;
                                if (dice === 1) {
                                    setText('You found some coins !')
                                    setScore(score + 250)
                                    setXp(xp + 20)
                                }
                                if (dice === 2) {
                                    setText('You found a treasure !')
                                    setScore(score + 350)
                                    setXp(xp + 40)
                                }
                                if (dice === 3) {
                                    setText('You found poisonous mushrooms !')
                                    setScore(score - 50)
                                    setXp(xp + 5)
                                }
                                if (dice === 4) {
                                    setText('You found a ghost !')
                                    setScore(score - 50)
                                    setXp(xp + 5)
                                }
                                if (dice === 5) {
                                    setText('You found nothing...')
                                }
                                if (dice === 6) {
                                    setText('You found nothing...')
                                }
                            }
                            if (values.action === 'kill') {
                                let dice = Math.floor(Math.random() * 6) + 1;
                                if (dice === 1) {
                                    setText('You killed a goblin !')
                                    setScore(score + 250)
                                    setXp(xp + 20)
                                }
                                if (dice === 2) {
                                    setText('You killed a huge monster !')
                                    setScore(score + 350)
                                    setXp(xp + 40)
                                }
                                if (dice === 3) {
                                    setText('You were injured !')
                                    setScore(score - 50)
                                    setXp(xp + 5)
                                    setHp(hp - 5)
                                }
                                if (dice === 4) {
                                    setText('You were seriously injured !')
                                    setScore(score - 50)
                                    setXp(xp + 5)
                                    setHp(hp - 10)
                                }
                                if (dice === 5) {
                                    setText('Oh no ! You lost your sword !...')
                                }
                                if (dice === 6) {
                                    setText('You are too scared to move...')
                                }
                            }
                            if (values.action === 'quit') {
                                if (score > 1000) {
                                    setIsUser(false)
                                    bestScores.push({
                                        name: username,
                                        score: score
                                    })
                                    await axios.post('http://localhost:5000/writefile', {
                                            bestscores: bestScores
                                        }
                                    )

                                } else {
                                    setIsUser(false)
                                    bestScores.push({
                                        name: username,
                                        score: 1000
                                    })
                                    await axios.post('http://localhost:5000/writefile', {
                                        bestscores: bestScores
                                        }
                                    )
                                }

                            }
                            else {
                                unknown = true
                            }
                        }}
                    >
                        {props => (
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                {unknown && (
                                    <p>This command is unknown...</p>
                                )}
                            <div>
                                <label htmlFor="">What do you want to do ? (search/kill/quit)</label>
                                <input
                                    type="text"
                                    value={props.values.action}
                                    onChange={props.handleChange('action')}
                                />
                                <button onClick={props.handleSubmit}>Submit</button>
                                <p>{text}</p>
                            </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        setFirstRoom(false)
                                        setThirdRoom(false)
                                        setSecondRoom(true)
                                        setText(null)
                                        setImg('https://st.depositphotos.com/2627989/4694/i/600/depositphotos_46941945-stock-photo-spring-forrest-sunset.jpg')
                                    }}>Go to the next room</button>
                                </div>
                            </div>

                        )}
                    </Formik>
            </div>
        )}

        {(isUser && secondRoom) && (
            <div style={{padding: '2% 2%'}}>
                <h1>You are in the second room</h1>

                <p>Your status is now : </p>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '80%', margin: '0 auto'}}>
                    <p>Hp : {hp}</p>
                    <p>XP: {xp}</p>
                    <p>Score: {score}</p>
                </div>

                <div className="imgContainer">
                    <img src={img} alt="" className='imageDarkroom'/>
                </div>
                <p>You are now in the forrest room. This may seem like a peaceful place, but careful young adventurer...
                    What do you want do to?</p>

                <Formik
                    initialValues={initialValues2}
                    onSubmit={async values => {
                        console.log(values)
                        if (values.action === 'search') {
                            let dice = Math.floor(Math.random() * 6) + 1;
                            if (dice === 1) {
                                setText('You found some coins !')
                                setScore(score + 250)
                                setXp(xp + 20)
                            }
                            if (dice === 2) {
                                setText('You found a treasure !')
                                setScore(score + 350)
                                setXp(xp + 40)
                            }
                            if (dice === 3) {
                                setText('You found poisonous mushrooms !')
                                setScore(score - 50)
                                setXp(xp + 5)
                            }
                            if (dice === 4) {
                                setText('You found a troll !')
                                setScore(score - 100)
                                setXp(xp + 5)
                            }
                            if (dice === 5) {
                                setText('You found nothing...')
                            }
                            if (dice === 6) {
                                setText('You found nothing...')
                            }
                        }
                        if (values.action === 'kill') {
                            let dice = Math.floor(Math.random() * 6) + 1;
                            if (dice === 1) {
                                setText('You killed a goblin !')
                                setScore(score + 250)
                                setXp(xp + 20)
                            }
                            if (dice === 2) {
                                setText('You killed a huge monster !')
                                setScore(score + 350)
                                setXp(xp + 40)
                            }
                            if (dice === 3) {
                                setText('You were injured !')
                                setScore(score - 50)
                                setXp(xp + 5)
                                setHp(hp - 5)
                            }
                            if (dice === 4) {
                                setText('You were seriously injured !')
                                setScore(score - 50)
                                setXp(xp + 5)
                                setHp(hp - 10)
                            }
                            if (dice === 5) {
                                setText('Oh no ! You lost your sword !...')
                            }
                            if (dice === 6) {
                                setText('You are too scared to move...')
                            }
                        }
                        if (values.action === 'quit') {
                            if (score > 1000) {
                                setIsUser(false)
                                bestScores.push({
                                    name: username,
                                    score: score
                                })
                                await axios.post('http://localhost:5000/writefile', {
                                        bestscores: bestScores
                                    }
                                )

                            } else {
                                setIsUser(false)
                                bestScores.push({
                                    name: username,
                                    score: 1000
                                })
                                await axios.post('http://localhost:5000/writefile', {
                                        bestscores: bestScores
                                    }
                                )
                            }

                        }
                        unknown = true
                    }}
                >
                    {props => (
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <button onClick={() => {
                                    setFirstRoom(true)
                                    setThirdRoom(false)
                                    setSecondRoom(false)
                                    setText(null)
                                    setImg('https://cdn.akamai.steamstatic.com/steam/apps/1240730/extras/Details_Img05.jpg?t=1605642252')
                                }}>Go to the previous room</button>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {unknown && (
                                    <p>This command is unknown...</p>
                                )}
                                <div>
                                    <label htmlFor="">What do you want to do ? (search/kill/quit)</label>
                                    <input
                                        type="text"
                                        value={props.values.action}
                                        onChange={props.handleChange('action')}
                                    />
                                    <button onClick={props.handleSubmit}>Submit</button>
                                    <p>{text}</p>
                                </div>
                            </div>

                            <div>
                                <button onClick={() => {
                                    setFirstRoom(false)
                                    setThirdRoom(true)
                                    setSecondRoom(false)
                                    setText(null)
                                    setImg('https://static.euronews.com/articles/stories/05/00/14/58/1440x810_cmsv2_3031d677-63ce-54f2-baa9-1deb93f016c1-5001458.jpg')
                                }}>Go to the next room</button>
                            </div>
                        </div>

                    )}
                </Formik>
            </div>
        )}

        {(isUser && thirdRoom) && (
            <div style={{padding: '2% 2%'}}>
                <h1>You are in the third room</h1>

                <p>Your status is now : </p>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '80%', margin: '0 auto'}}>
                    <p>Hp : {hp}</p>
                    <p>XP: {xp}</p>
                    <p>Score: {score}</p>
                </div>

                <div className="imgContainer">
                    <img src={img} alt="" className='imageDarkroom'/>
                </div>
                <p>You are now in the ocean room. Be careful to the creature you find around you
                    What do you want do to?</p>


                <Formik
                    initialValues={initialValues2}
                    onSubmit={async values => {
                        console.log(values)
                        if (values.action === 'search') {
                            let dice = Math.floor(Math.random() * 6) + 1;
                            if (dice === 1) {
                                setText('You found some coins !')
                                setScore(score + 250)
                                setXp(xp + 20)
                            }
                            if (dice === 2) {
                                setText('You found a treasure !')
                                setScore(score + 350)
                                setXp(xp + 40)
                            }
                            if (dice === 3) {
                                setText('You found a poisonous fish !')
                                setScore(score - 50)
                                setXp(xp + 5)
                            }
                            if (dice === 4) {
                                setText('You found a shark !')
                                setScore(score - 100)
                                setXp(xp + 5)
                            }
                            if (dice === 5) {
                                setText('You found nothing...')
                            }
                            if (dice === 6) {
                                setText('You found nothing...')
                            }
                        }
                        if (values.action === 'kill') {
                            let dice = Math.floor(Math.random() * 6) + 1;
                            if (dice === 1) {
                                setText('You killed a whale !')
                                setScore(score + 250)
                                setXp(xp + 20)
                            }
                            if (dice === 2) {
                                setText('You killed a shark !')
                                setScore(score + 350)
                                setXp(xp + 40)
                            }
                            if (dice === 3) {
                                setText('You were injured !')
                                setScore(score - 50)
                                setXp(xp + 5)
                                setHp(hp - 5)
                            }
                            if (dice === 4) {
                                setText('You were seriously injured !')
                                setScore(score - 50)
                                setXp(xp + 5)
                                setHp(hp - 10)
                            }
                            if (dice === 5) {
                                setText('Oh no ! You lost your harpoon !...')
                            }
                            if (dice === 6) {
                                setText('You are too scared to move...')
                            }
                        }
                        if (values.action === 'quit') {
                            if (score > 1000) {
                                setIsUser(false)
                                bestScores.push({
                                    name: username,
                                    score: score
                                })
                                await axios.post('http://localhost:5000/writefile', {
                                        bestscores: bestScores
                                    }
                                )

                            } else {
                                setIsUser(false)
                                bestScores.push({
                                    name: username,
                                    score: 1000
                                })
                                await axios.post('http://localhost:5000/writefile', {
                                        bestscores: bestScores
                                    }
                                )
                            }

                        }
                        else {
                            unknown = true
                        }
                    }}
                >
                    {props => (
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <button onClick={() => {
                                    setFirstRoom(false)
                                    setThirdRoom(false)
                                    setSecondRoom(true)
                                    setText(null)
                                    setImg('https://st.depositphotos.com/2627989/4694/i/600/depositphotos_46941945-stock-photo-spring-forrest-sunset.jpg')
                                }}>Go to the previous room</button>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {unknown && (
                                    <p>This command is unknown...</p>
                                )}
                                <div>
                                    <label htmlFor="">What do you want to do ? (search/kill/quit)</label>
                                    <input
                                        type="text"
                                        value={props.values.action}
                                        onChange={props.handleChange('action')}
                                    />
                                    <button onClick={props.handleSubmit}>Submit</button>
                                    <p>{text}</p>
                                </div>
                            </div>
                        </div>

                    )}
                </Formik>
            </div>
        )}


    </div>
  );
}

export default App;
