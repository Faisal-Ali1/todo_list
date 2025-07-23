import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";



function DataTable({data}) {

    // console.log('data: ', data);

    const [tasks, setTasks] = useState([]);
    const [ updateTask , setUpdateTask ] = useState('');
    const [isChange , setIsChange] = useState(false);
    
    
    // fetching all tasks
    useEffect(() => {

        // console.log('data: ' ,data);
        
        async function fetchTask() {
            const { data } = await axiosClient.get('/getalltask');
            setTasks(data);
        }

        fetchTask()
    }, [data , isChange])

    // handling Delete button
    const handleDelete = async (_id) => {
        try {
            await axiosClient.delete(`/delete/${_id}`);
            setTasks(tasks.filter(item => item._id !== _id));

        }
        catch (err) {
            console.log('Error: ', err);

        }
    }

    // handling Update button
    const handleUpdate = async(id) => {
            try{
                let { data } = await axiosClient.get(`/getsingletask/${id}`)
                // console.log(data);

                setUpdateTask(data);
                
            }
            catch(err){
                console.log('Error: ' , err.message);
                
            }
    }

    // handling dataUpdating submit
    const handleUpdateSubmit = async(id) => {
        try{
            await axiosClient.patch(`/update/${id}` , {message: updateTask.message});
            setUpdateTask('');
            setIsChange(!isChange);
        }
        catch(err){
            console.log('Error: ' , err.message);
            
        }
    }


    return (
        <>
            {
                tasks.length !== 0 ?
                    <div className="mt-10 w-4xl mx-auto h-100  rounded-2xl overflow-auto shadow-xl relative ">
                        <div className="   flex justify-center items-center  rounded-2xl">
                            {/* <div> */}

                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><p className="w-150 overflow-auto">{item?.message}</p></td>

                                                {/* update button */}
                                                <td><button className="btn btn-primary mr-2" onClick={() => handleUpdate(item?._id)}>update</button>

                                                    {/* delete button */}
                                                    <button className="btn btn-secondary" type="button" onClick={() => handleDelete(item?._id)}>delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {
                                updateTask ? <div className="absolute z-99 bg-black h-70 w-100 top-10 rounded-2xl shadow-xl flex flex-col gap-7 justify-center items-center">

                                    {/* cut button */}
                                <button className="font-bold btn absolute top-2 right-2 text-red-500 hover:bg-gray-400 bg-black w-5 cursor-pointer rounded-xl border" onClick={() => setUpdateTask('')}>X</button>

                                {/* input field */}
                                    <input type="text" value={updateTask.message} onChange={(e)=> setUpdateTask({...updateTask , message:e.target.value})} className="input"/>

                                {/* submit button */}
                                    <button className="btn btn-primary" onClick={() => handleUpdateSubmit(updateTask._id)}>Submit</button>
                            </div> : ""
                            }

                            
                            {/* </div> */}
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

export default DataTable;