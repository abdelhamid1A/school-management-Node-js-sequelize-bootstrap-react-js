import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, Link } from 'react-router-dom'

export default function StudentItems(props) {
    const history = useHistory()
    const { studentList, serch,getAll } = props
    console.log(studentList);
    toast.configure()
    function deleteStudent(id) {
        console.log(id);
        axios.delete(process.env.REACT_APP_API_URL + 'student/' + id)
            .then(response => {
                serch()
                getAll()
                toast.error('student supprime')
            })
            .catch(err => console.log(err))
    }
    return (
        <tbody>
            <tr>

                <td>{studentList.name}</td>
                <td>{studentList.cin}</td>
                <td scope="col">{studentList.date_naissance}</td>
                <td scope="col">{studentList.filiere}</td>
                <td scope="col">{studentList.module_name || studentList.ModuleId}</td>
                <td>
                    <button className="btn btn-warning mx-2" onClick={()=>{
                        toast.warning('Sorry this function incompleted but work in module update you can check it :)')
                    }}>modifier</button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteStudent(studentList.id)}>supprime</button>
                </td>
            </tr>
        </tbody>
    )
}
