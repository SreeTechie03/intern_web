import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, X, CheckCircle } from "lucide-react";
import { supabase } from "../../lib/supabase.js";
import toast, { Toaster } from 'react-hot-toast';

const AuthModal = ({ onLoginSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkEmailExists = async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false
        }
      });
      
      // If we get here without an error, the email exists
      return !error;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Check if email is confirmed
        if (!data.user.email_confirmed_at) {
          toast.error('Please confirm your email before logging in');
          setIsLoading(false);
          return;
        }

        toast.success('Successfully signed in!');
        onLoginSuccess({ 
          username: formData.email.split('@')[0],
          ...data.user
        });
      } else {
        // Check if email already exists
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
          toast.error('This email is already registered. Please use a different email or sign in.');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        setShowConfirmationMessage(true);
        toast.success('Registration successful! Please check your email.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowConfirmationMessage(false);
    setFormData({ username: "", password: "", email: "" });
  };

  if (showConfirmationMessage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="relative w-full max-w-md transform transition-all">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="text-green-500 w-16 h-16" />
              <h2 className="text-2xl font-bold text-gray-800">Check Your Email</h2>
              <p className="text-gray-600 max-w-sm">
                We've sent a confirmation link to <strong>{formData.email}</strong>. 
                Please check your email and click the link to activate your account.
              </p>
              <div className="pt-4 border-t border-gray-200 w-full">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setShowConfirmationMessage(false);
                  }}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Return to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Toaster position="top-center" />
      <div className="relative w-full max-w-md transform transition-all">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-blue-100">
              {isLogin 
                ? "Sign in to access your account" 
                : "Join us and start your journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="space-y-6">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold 
                         hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 
                         flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}</span>
                {!isLoading && (
                  <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={18} />
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {isLogin 
                    ? "Don't have an account? Create one" 
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;