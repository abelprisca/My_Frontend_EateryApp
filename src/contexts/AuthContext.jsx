import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("eatery_token") || null
  );

  const [loading, setLoading] = useState(false);


  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("eatery_theme") === "dark";
  });



  // ==========================
  // LOAD USER WHEN APP STARTS
  // ==========================

  useEffect(() => {

    const savedUser = localStorage.getItem("eatery_user");
    const savedToken = localStorage.getItem("eatery_token");


    if(savedUser && savedToken){

      try {

        setUser(JSON.parse(savedUser));
        setToken(savedToken);

      } catch(error){

        console.log("Invalid saved user data");

        localStorage.removeItem("eatery_user");
        localStorage.removeItem("eatery_token");

      }

    }

  }, []);




  // ==========================
  // DARK MODE
  // ==========================

  useEffect(()=>{

    if(darkMode){

      document.documentElement.classList.add("dark");
      localStorage.setItem(
        "eatery_theme",
        "dark"
      );

    }else{

      document.documentElement.classList.remove("dark");
      localStorage.setItem(
        "eatery_theme",
        "light"
      );

    }


  },[darkMode]);



  const toggleDarkMode = ()=>{
    setDarkMode(prev=>!prev);
  };





  // ==========================
  // LOGIN
  // ==========================


  const login = async(email,password)=>{

    setLoading(true);


    try{


      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );


      const user = response.data.data.user;
      const token = response.data.token;



      setUser(user);
      setToken(token);



      localStorage.setItem(
        "eatery_user",
        JSON.stringify(user)
      );


      localStorage.setItem(
        "eatery_token",
        token
      );


      toast.success(
        `Welcome back, ${user.name}!`
      );


      return user;



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Invalid email or password"
      );


      throw error;


    }finally{

      setLoading(false);

    }

  };







  // ==========================
  // REGISTER
  // ==========================


  const register = async(userData)=>{


    setLoading(true);


    try{


      const response = await API.post(
        "/auth/signup",
        userData
      );



      const user = response.data.data.user;
      const token = response.data.token;



      setUser(user);
      setToken(token);



      localStorage.setItem(
        "eatery_user",
        JSON.stringify(user)
      );


      localStorage.setItem(
        "eatery_token",
        token
      );



      toast.success(
        `Welcome ${user.name}!`
      );


      return user;



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );


      throw error;


    }finally{

      setLoading(false);

    }

  };







  // ==========================
  // GET PROFILE
  // ==========================


  const getProfile = async()=>{


    try{


      const response = await API.get(
        "/auth/profile"
      );


      const profileUser =
        response.data.data?.user ||
        response.data.user ||
        response.data;



      setUser(profileUser);



      localStorage.setItem(
        "eatery_user",
        JSON.stringify(profileUser)
      );



      return profileUser;



    }catch(error){


      console.log(
        "Profile error:",
        error
      );


      throw error;

    }


  };







  // ==========================
  // UPDATE PROFILE
  // ==========================


  const updateProfile = async(userData)=>{


    setLoading(true);


    try{


      const response = await API.put(
        "/users/profile",
        userData
      );


      const updatedUser =
      response.data.data?.user ||
      response.data;



      setUser(updatedUser);



      localStorage.setItem(
        "eatery_user",
        JSON.stringify(updatedUser)
      );



      toast.success(
        "Profile updated successfully"
      );


      return updatedUser;



    }catch(error){


      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );


      throw error;


    }finally{

      setLoading(false);

    }

  };






  // ==========================
  // LOGOUT
  // ==========================


  const logout = ()=>{


    localStorage.removeItem(
      "eatery_user"
    );


    localStorage.removeItem(
      "eatery_token"
    );


    setUser(null);
    setToken(null);



    toast.success(
      "Logged out successfully"
    );


  };






  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        loading,

        darkMode,

        toggleDarkMode,


        login,

        register,

        logout,


        getProfile,

        updateProfile,


        isAuthenticated: !!token,


        isAdmin:
        user?.role === "ADMIN"

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};