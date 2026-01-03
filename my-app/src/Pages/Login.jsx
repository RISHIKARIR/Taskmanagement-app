import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
 import api from '../Services/Api';
 import logotag from "../assets/logotag.png";



export default function LoginPage({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 const navigate = useNavigate();



 

const handleLogin = async (e) => {
     e.preventDefault();
  console.log("Login clicked");

  try{
  const res = await api.post("/login", {
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", res.data.name);
  navigate('./Dashboard');
}
catch(e){
alert(e.response?.data?.message || "Invalid credentials");

}};






  

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="text-center mb-8">
            <div className='flex items-center justify-center'><img className='h-20' src={logotag}></img><h1 className="text-white font-extrabold text-lg">Primetrade.AI</h1></div>
            <h2 className="text-white text-md font-bold mb-2">Hello User, Welcome Back</h2>
            <p className="text-slate-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
               
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
              
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-slate-400 text-sm">Remember me</span>
              </label>
           


            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors shadow-lg"
            >
              Sign In
            </button>

            
             
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{' '}
             <button onClick={()=>navigate('./Register')} className='text-sky-600 cursor-pointer'>Sign Up?</button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
