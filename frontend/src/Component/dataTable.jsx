import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";


           
function DataTable() {

    console.log();
    
    const [tasks, setTasks] = useState([]);

// fetching all tasks
    useEffect(() => {
        async function fetchTask() {
            const { data } = await axiosClient.get('/getalltask');
            setTasks(data);
        }

        fetchTask()
    }, [])

    // handling delete button
    const handleDelete = async (_id) => {
        try {
            await axiosClient.delete(`/delete/${_id}`);
            alert('Task deleted sucessfully');
            setTasks(tasks.filter(item => item._id !== _id));

        }
        catch (err) {
            console.log('Error: ', err);

        }
    }


    return (
        <>
            {
                tasks.length !== 0 ?
                    <div className="mt-10 w-4xl mx-auto h-100  rounded-2xl overflow-auto shadow-xl">
                        <div className="   flex justify-center items-center  rounded-2xl   ">
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
                                                <td><button className="btn btn-primary" onClick={()=> handleUpdate(item?._id)}>update</button> 

                                                {/* delete button */}
                                                <button className="btn btn-secondary" type="button" onClick={() => handleDelete(item?._id)}>delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {/* </div> */}
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

export default DataTable;