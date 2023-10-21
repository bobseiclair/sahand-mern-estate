import { useNavigate, Link } from 'react-router-dom'
import { useState } from "react";
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        setLoading(true)

        const res = await fetch('/api/auth/signup', 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        
        const data = await res.json()
        console.log(data)
        
        if (data.success === false) {
          setLoading(false)
          setError(data.message)
          return
        }
        
        setLoading(false)
        setError(null)
        //
        navigate('/sign-in')
    } catch (error) {
        setLoading(false)
        setError(error.message)
    }
    
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign Up
      </h1>
      <form 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          placeholder="Utilisateur ..."
          className="border p-3 rounded-lg"
          id="username" onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder="Adresse email ..."
          className="border p-3 rounded-lg"
          id="email" onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder="Mot de passe ..."
          className="border p-3 rounded-lg"
          id="password" onChange={handleChange}
        />
        <button disabled={loading}
          className="bg-slate-700 text-white p-3 
            rounded-lg uppercase hover:opcity-95 disabled:opacity-80"
        >
            {loading ? 'Loading ...' : 'Sign up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account ? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 font-semibold">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p> }
    </div>
  )
}
