import { useState } from "react";
import DataTable from "./Component/dataTable";
import axiosClient from "./utils/axiosClient";

function App() {

  const [message, setMessage] = useState('');
  const [ isData , setIsData ] = useState(false);
  
// inserting task in db
  const handleSubmit = async () => {
    try {
      
      if(!message)
        return alert('Enter task first');

      await axiosClient.post('/create', { message });
      // alert('Task added');
      setMessage('')
      setIsData(!isData);
    }
    catch (err) {
      console.log('Error: ', err);

    }

  }



  return (
    <>
      <div>
        <h1 className="text-5xl text-center font-bold "></h1>
        <div>

          {/* entering  task */}
          <div className="flex gap-2 justify-center mt-10">
            <input type="text" placeholder="enter your task here" value={message} onChange={(e) => setMessage(e.target.value)} className="input" />
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>

          {/* showing data */}
          <div>
            <DataTable data={isData}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;