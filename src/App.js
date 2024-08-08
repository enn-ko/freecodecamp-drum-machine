import { useCallback, useEffect, useMemo, useState } from "react";


const App = () => {
  const drumPads1 = useMemo(()=>[
    {
      keyCode : 81,
      key : 'Q',
      text : 'Heater-1',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
    },
    {
      keyCode : 87,
      key : 'W',
      text : 'Heater-2',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
    },
    {
      keyCode : 69,
      key : 'E',
      text : 'Heater-3',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
    },
    {
      keyCode : 65,
      key : 'A',
      text : 'Heater-4',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
    },
    {
      keyCode : 83,
      key : 'S',
      text : 'Clap',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
    },
    {
      keyCode : 68,
      key : 'D',
      text : 'Open-HH',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
    },
    {
      keyCode : 90,
      key : 'Z',
      text : 'Kick-n-Hat',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
    },
    {
      keyCode : 88,
      key : 'X',
      text : 'Kick',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
    },
    {
      keyCode : 67,
      key : 'C',
      text : 'Closed-HH',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
    }
  ],[])

  const drumPads2 = useMemo(()=> [
    {
      keyCode : 81,
      key : 'Q',
      text : 'Chord-1',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode : 87,
      key : 'W',
      text : 'Chord-2',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode : 69,
      key : 'E',
      text : 'Chord-3',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode : 65,
      key : 'A',
      text : 'Give us a light',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode : 83,
      key : 'S',
      text : 'Bld H1',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode : 68,
      key : 'D',
      text : 'Punchy Kich 1',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode : 90,
      key : 'Z',
      text : 'Kick-n-Hat',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
    },
    {
      keyCode : 88,
      key : 'X',
      text : 'Kick',
      src : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
    },
    {
      keyCode : 67,
      key : 'C',
      text : 'Brk snr',
      src : 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ],[])

  const [currentDrum,setCurrentDrum] = useState(drumPads1)
  const [active,setActive] = useState()
  const [playing,setPlaying] = useState(true)
  const [volume,setVolume] = useState(1)

  const playSound =useCallback((selector)=>{
   if(playing){
    const audio = document.getElementById(selector.key);
    if(audio){
      audio.volume = volume
      
      audio.play().catch((error)=>{
        console.log(`Error message ${error.message}`);
        
      })
      setActive(selector.text)
    }
            
   }
  },[playing,volume])


  const playClicked = ()=>setPlaying(prev=>!prev)

  const volumeChange = (e) => setVolume(e.target.value)

  const toggleSound = ()=>{
    setCurrentDrum(prev => prev === drumPads1 ? drumPads2 : drumPads1)
  }

useEffect(()=>{
  const handleDown = (event) =>{
    const pad = currentDrum.find(pad => pad.key === event.key.toUpperCase())
    if(pad){
      playSound(pad)
      }
  };
  document.addEventListener('keydown', handleDown)

  return () => {
    document.removeEventListener('keydown', handleDown)
  }
},[currentDrum,playSound])


  return (
   <div className="App flex flex-col justify-center items-center h-screen text-white bg-gray-800">
      <h2 className="flex items-center mb-10 text-3xl">FreeCode Camp Drum Machine</h2>

     <div id="drum-machine" className="flex gap-4">
      <div className="drum-pads grid grid-cols-3 gap-2">
      {currentDrum.map((drumPad)=>{
        return (
          <div onClick={()=>playSound(drumPad)} className="drum-pad p-10 rounded bg-gray-900" id={drumPad.src} key={drumPad.src}>
            {drumPad.key}
            <audio className="clip" id={drumPad.key} src={drumPad.src}></audio>
            </div>
        )
      })}
      </div>
      <div>
       <p id="display" className="mt-5 flex justify-center items-center">Drum : {active}</p>
       <div className="controls mt-5">
          <div className="mt-3 flex gap-8">
            <button onClick={playClicked} className="p-2 bg-blue-600 rounded">
              {playing ? 'Stop' : 'Play'}
            </button>
            <button className=" p-2 rounded-md bg-blue-600" onClick={toggleSound}>Switch play sound</button>
          </div>
          <div className="mt-3">
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={volumeChange} className="w-full" />
            <label className="block text-gray-300">Volume: {Math.round(volume * 100)}</label>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default App