//Audio clips from FreeCodeCamp challenge
const soundFiles = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
  ];

function App(){
// Volume slider to control volume of the sounds 
  const [volume, setVolume] = React.useState(1);
// Records keys pressed and gives option to play saved keys or clear
  const [recording, setRecording] = React.useState("");
  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {  
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 300);
    // Waits to clear the interval
    setTimeout(
      () => clearInterval(interval), 300 * recordArray.length -1
    );
  };
    return  (
    <div className="bg-warning min-vh-100 text-white">
        <div className="text-center">
            <h2>Sound Machine</h2>
            {soundFiles.map((file) => (
                <Pad key={file.id} file={file} volume={volume} setRecording={setRecording} />
            ))}
            <br/>
            
            <h4>Volume Control</h4>
            <input 
            type="range" 
            step="0.01" 
            onChange={(event) => setVolume(event.target.value)} 
            value={volume} 
            max="1" 
            min="0" 
            lassName="w-50" 
            />
            <h3>{recording}</h3>
            {recording && (
              <>
              <button onClick={playRecording}className="btn btn-success">Play</button>
              <button onClick={() => setRecording("")}className="btn btn-danger">Clear</button>

              </>
            
            )}
            
        </div>
     </div>
    );
}

// Child component of App
function Pad({file, volume, setRecording}){
  
  const [active, activeStyle] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };

  }, [])
// When correct keyboard key is pressed, it will play the sound corresponding to the Sound keycode
  const handleKeyPress = (event) => {
    if(event.keyCode === file.keyCode){
      playNoise();
    }
  };

const playNoise = () => {
  const audioTag = document.getElementById(file.keyTrigger);
  // When button or correct keyboard key are pressed, the button will light up red
  activeStyle(true);
  setTimeout(() => activeStyle(false), 150);
  audioTag.volume = volume;
  audioTag.currentTime = 0;
  audioTag.play();
  //Records keys pressed to display
  setRecording((prev) => prev + file.keyTrigger + " ");
}
  return (
    //
        <div onClick={playNoise} className={`btn btn-secondary p-4 m-3 ${active && `btn-danger`}`}>
            <audio className="file" id={file.keyTrigger} src={file.url} />            
            {file.keyTrigger} 
        </div>
    );
        
    
    
}

ReactDOM.render(<App/>, document.getElementById("root"))