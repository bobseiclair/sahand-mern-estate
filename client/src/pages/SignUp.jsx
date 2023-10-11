import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="txt-3xl text-center font-semibold my-7">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Utilisateur ..."
          className="border p-3 rounded-lg"
          id="username"
        />
        <input 
          type="email" 
          placeholder="Adresse email ..."
          className="border p-3 rounded-lg"
          id="email"
        />
        <input 
          type="password" 
          placeholder="Mot de passe ..."
          className="border p-3 rounded-lg"
          id="password"
        />
        <button 
          className="bg-slate-700 text-white p-3 
            rounded-lg uppercase hover:opcity-95 disabled:opacity-80"
        >
            Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Alreday have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  )
}
