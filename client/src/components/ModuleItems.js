import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useHistory,Link} from 'react-router-dom'


export default function ModuleItems(props) {
    const history = useHistory()
    const {moduleList,serch} =props
    toast.configure()
    function deleteModule(id){
        axios.delete(process.env.REACT_APP_API_URL + 'module/'+id)
            .then(response => {
                serch()
                toast.error('module supprime')
            })
            .catch(err => console.log(err))
    }
    return (
        <tbody>
            <tr>
                
                <td>{moduleList.module_name}</td>
                <td>{moduleList.coefficient}</td>
                <td>
                    <Link className="btn btn-warning mx-2" to={'/'+moduleList.id}>modifier</Link>
                    <button className="btn btn-danger mx-2" onClick={()=>deleteModule(moduleList.id)}>supprime</button>
                </td>
            </tr>
        </tbody>
    )
}
