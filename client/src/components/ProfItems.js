import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, Link } from 'react-router-dom'


export default function ProfItems(props) {
    const history = useHistory()
    const { profList, serch,getAll } = props
    toast.configure()
    function deleteProf(id) {
        axios.delete(process.env.REACT_APP_API_URL + 'prof/' + id)
            .then(response => {
                console.log(response.data);
                toast.error('Prof supprime')
                serch()
                getAll()
            })
            .catch(err => console.log(err))
    }
    return (
        <tbody>
            <tr>

                <td>{profList.name}</td>
                <td>{profList.matricule}</td>
                <td scope="col">{profList.date_inscription}</td>
                <td scope="col">{profList.module_name || profList.ModuleId}</td>
                <td>
                    <button className="btn btn-warning mx-2" onClick={()=>{
                        toast.warning('Sorry this function incompleted but work in module update you can check it :)')
                    }}>modifier</button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteProf(profList.id)}>supprime</button>
                </td>
            </tr>
        </tbody>
    )
}
