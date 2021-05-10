import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModuleItems from './ModuleItems'

export default function Module() {
    toast.configure()
    const [module_name, setModule_name] = useState('')
    const [coefficient, setCoefficient] = useState('')
    const [search, setSearch] = useState([])
    const [allModule, setAllModule] = useState([])
    
    function addModule() {
        // console.log(process.env.REACT_APP_API_URL);
        axios.post(process.env.REACT_APP_API_URL + 'module/', { module_name, coefficient })
            .then(response => {
                toast.success('module ajoute')
                getAll()
            })
            .catch(err => console.log(err))
    }

    function serch(value) {
        axios.get(process.env.REACT_APP_API_URL + 'module/search/' + value)
            .then(response => setSearch(response.data))
            .catch(err => console.log(err))
    }

    function getAll() {
        axios.get(process.env.REACT_APP_API_URL + 'module/')
            .then(response => setAllModule(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className="container shadow-lg my-5 py-5 rounded text-center">
            <form className="form-inline mr-auto" target="_self">
                <div className="form-group">
                    <label htmlFor="search-field">
                        <i className="fa fa-search mr-2"></i>
                    </label>
                    <input className="form-control search-field" type="search" name="search" id="search-field" placeholder="nom de module" onKeyUp={(e) => serch(e.target.value)} />
                </div>
            </form>
            {search.length > 0
                ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">nom de module</th>
                            <th scope="col">coefficient</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    {search.map(module => (
                        <ModuleItems moduleList={module} key={module.id} serch={serch} />
                    ))}
                </table>
                : ''
            }
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">nom du module</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(e) => setModule_name(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">coefficient</label>
                <input type="number" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => setCoefficient(e.target.value)}
                />
            </div>

            <button className="btn btn-primary mb-3" onClick={() => addModule()}>ajoute module</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">nom de module</th>
                        <th scope="col">coefficient</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                {allModule && allModule.map(module => (
                    <ModuleItems moduleList={module} key={module.id} serch={getAll} />
                ))}
            </table>
        </div>
    )
}
