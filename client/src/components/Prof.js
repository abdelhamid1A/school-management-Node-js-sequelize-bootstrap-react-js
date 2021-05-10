import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfItems from './ProfItems'

export default function Prof() {
    toast.configure()
    const [name, setName] = useState('')
    const [matricule, setMatricule] = useState('')
    const [date_inscription, setDate_inscription] = useState('')
    const [ModuleId, setModuleId] = useState('')
    const [search, setSearch] = useState([])
    const [allProf, setAllProf] = useState([])
    const [allModule, setAllModule] = useState([])

    function addProf() {
        axios.post(process.env.REACT_APP_API_URL + 'prof/', { name, matricule,date_inscription,ModuleId })
            .then(response => {
                console.log(response.data);
                toast.success('module ajoute')
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
        axios.get(process.env.REACT_APP_API_URL + 'prof/search/' + value)
            .then(response => setSearch(response.data))
            .catch(err => console.log(err))
    }
    function getAll() {
        axios.get(process.env.REACT_APP_API_URL + 'prof/')
            .then(response => {
                setAllProf(response.data)
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
                    <input className="form-control search-field" type="search" name="search" id="search-field" placeholder="matricule de Prof" onKeyUp={(e) => serch(e.target.value)} />
                </div>
            </form>
            {search.length > 0
                ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">nom </th>
                            <th scope="col">matricule</th>
                            <th scope="col">date d'insription</th>
                            <th scope="col">module</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    {search && search.map(prof => (
                        <ProfItems profList={prof} key={prof.id} serch={serch} />
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
                <label htmlFor="exampleInputPassword1" className="form-label">matricule</label>
                <input type="number" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setMatricule(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">date_inscription</label>
                <input type="number" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setDate_inscription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select htmlFor="exampleInputPassword1" className="form-control"
                onChange={(e) => setModuleId(e.target.value)}
                >Module
                    <option value="" selected>select module</option>
                    {allModule && allModule.map(module => (
                        <option className="form-control" value={module.id}>{module.module_name}</option>
                    ))}

                </select>
            </div>

            <button className="btn btn-primary mb-3" onClick={() => addProf()}>ajoute module</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">nom </th>
                        <th scope="col">matricule</th>
                        <th scope="col">date d'insription</th>
                        <th scope="col">module</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                {allProf && allProf.map(prof => (
                    <ProfItems profList={prof} key={prof.id} serch={getAll} />
                ))}
            </table>
        </div>
    )
}
