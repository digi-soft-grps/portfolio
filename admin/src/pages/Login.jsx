import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      const { token, admin } = response.data;
      
      // Save info to local storage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminInfo', JSON.stringify(admin));
      
      toast.success("Welcome back! Redirecting...");
      
      // Successful login
      setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard'); 
          console.log("Logged in successfully");
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Login detail error:", error);
      const message = error.response?.data?.message || "Login failed. Please check connectivity or credentials.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-persian-blue-950 px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-persian-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-persian-blue-400/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[460px] glass-card !bg-white/95 rounded-[2.5rem] p-8 md:p-12 relative z-10">
        <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-persian-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-5 shadow-2xl shadow-persian-blue-600/30">
                DD
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-persian-blue-950 mb-2">Dual Dreams Admin</h1>
            <p className="text-persian-blue-500 font-medium">Identity Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-sm font-bold text-persian-blue-900 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-400 group-focus-within:text-persian-blue-600 transition-colors" size={18} />
              <input
                type="email"
                id="email"
                placeholder="admin@dualdigital.com"
                className="admin-input pl-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="password" className="text-sm font-bold text-persian-blue-900 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-persian-blue-400 group-focus-within:text-persian-blue-600 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="admin-input pl-12 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-persian-blue-400 hover:text-persian-blue-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-btn admin-btn-primary mt-4 w-full text-lg h-14"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <LogIn size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
            <p className="text-sm text-persian-blue-400 font-medium">
                © 2026 Dual Dreams Digital. Internal Access Only.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
