import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentItems from './StudentItems'

export default function Student() {
    toast.configure()
    const [name, setName] = useState('')
    const [cin, setCin] = useState('')
    const [date_naissance, setDate_naissance] = useState('')
    const [filiere, setFiliere] = useState('')
    const [niveau, setNiveau] = useState('')
    const [ModuleId, setModuleId] = useState('')
    const [search, setSearch] = useState([])
    const [allStudent, setAllStudent] = useState([])
    const [allModule, setAllModule] = useState([])

    function addStudent() {
        axios.post(process.env.REACT_APP_API_URL + 'student/', { name, cin,date_naissance,filiere,ModuleId,niveau })
            .then(response => {
                console.log(response.data);
                toast.success('student ajoute')
                getAll()
            })
            .catch(err => console.log(err))
    }
    function getModule() {
        axios.get(process.env.REACT_APP_API_URL + 'module/')
            .then(response => {
                setAllModule(response.data)
            })
            .catch(err => console.log(err))
    }
    function serch(value) {
        axios.get(process.env.REACT_APP_API_URL + 'student/search/' + value)
            .then(response => setSearch(response.data))
            .catch(err => console.log(err))
    }
    function getAll() {
        axios.get(process.env.REACT_APP_API_URL + 'student/')
            .then(response => {
                setAllStudent(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAll()
        getModule()
    }, [])
    return (
        <div className="container shadow-lg my-5 py-5 rounded text-center">
            <form className="form-inline mr-auto" target="_self">
                <div className="form-group">
                    <label htmlFor="search-field">
                        <i className="fa fa-search mr-2"></i>
                    </label>
                    <input className="form-control search-field" type="search" name="search" id="search-field" placeholder="cin de l'etudient" onKeyUp={(e) => serch(e.target.value)} />
                </div>
            </form>
            {search.length > 0
                ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">nom </th>
                            <th scope="col">cin</th>
                            <th scope="col">date de naissance</th>
                            <th scope="col">filiere</th>
                            <th scope="col">module</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    {search && search.map((std,index) => (
                        <StudentItems studentList={std} key={index} serch={serch} getAll={getAll} />
                    ))}
                </table>
                : ''
            }
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">nom </label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">cin</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setCin(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">date de naissance</label>
                <input type="date" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setDate_naissance(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">filiere</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setFiliere(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">niveau</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setNiveau(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select htmlFor="exampleInputPassword1" className="form-control"
                onChange={(e) => setModuleId(e.target.value)}
                >Module
                    <option value="" defaultValue>select module</option>
                    {allModule && allModule.map(module => (
                        <option className="form-control" key={module.id} value={module.id}>{module.module_name}</option>
                    ))}

                </select>
            </div>

            <button className="btn btn-primary mb-3" onClick={() => addStudent()}>ajoute Etudient</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">nom </th>
                        <th scope="col">matricule</th>
                        <th scope="col">date d'insription</th>
                        <th scope="col">filiere</th>
                        <th scope="col">module</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                {allStudent && allStudent.map((std,index) => (
                    <StudentItems studentList={std} key={index} serch={serch} getAll={getAll} />
                ))}
            </table>
        </div>
    )
}
