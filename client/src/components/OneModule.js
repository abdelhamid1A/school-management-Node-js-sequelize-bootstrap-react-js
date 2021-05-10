import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function OneModule(props) {
    const history = useHistory()
    const id = props.match.params.id
    const [module, setModule] = useState({})
    const [module_name, setModule_name] = useState(module.module_name)
    const [coefficient, setCoefficient] = useState(module.coefficient)

    function getModule() {
        axios.get(process.env.REACT_APP_API_URL + 'module/' + id)
            .then(response => {
                console.log(response.data);
                setModule(response.data)
            })
            .catch(err => console.log(err))
    }

    function updateModule() {
        axios.put(process.env.REACT_APP_API_URL + 'module/' + id, { module_name, coefficient })
            .then(response => {
                history.push('/module')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getModule()
    }, [])
    return (
        <div className="container shadow-lg my-5 p-3 rounded">
            {module
                ?
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">nom du module</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            onChange={(e) => setModule_name(e.target.value)}
                            defaultValue={module.module_name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">coefficient</label>
                        <input type="number" className="form-control" id="exampleInputPassword1"
                            defaultValue={module.coefficient}
                            onChange={(e) => setCoefficient(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-warning" onClick={() => updateModule()}>modifier</button>
                </div>
                :
                <div className="alert alert-warning text-center">module not found</div>
            }
        </div>
    )
}
