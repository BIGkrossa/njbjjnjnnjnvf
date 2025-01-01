import {useState, useEffect} from "react";
const tg = window.Telegram.WebApp;

function App() {
    useEffect( () => {
        tg.expand();
    }, []);

  const ID = Number(tg.initDataUnsafe?.user?.id);
  const [count, setCount] = useState(0);


  useEffect (() => {
      fetch('/count', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              "id": ID
          })
      }).then(response => response.json()).then(response => setCount(response))
  }, [])


  const handleImageClick = (event) => {
    setCount(count + 1);
      fetch('/inc', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              "id": ID
          })
      });
      if ("vibrate" in navigator) {
          navigator.vibrate(200);
      }
  };

    useEffect(() => {
        tg.ready();
    }, []);
  return (
      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1>{count}</h1>

        <img className={"circle"}
             id={"circ"}
            src={`/images/homyak.png`}
            alt={"qq"}
            onClick={handleImageClick}
        />

      </div>
  );
}

export default App;
