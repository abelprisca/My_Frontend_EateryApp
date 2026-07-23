import { useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import API from "../../services/api";
import MenuTable from "../../components/admin/MenuTable";
import MenuFormModal from "../../components/admin/MenuFormModal";
import DeleteMenuModal from "../../components/admin/DeleteMenuModal";


const ManageMenu = () => {

  const [menuItems,setMenuItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [deleteLoading,setDeleteLoading] = useState(false);
  const [error,setError] = useState("");
  const [formOpen,setFormOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [selectedMeal,setSelectedMeal] = useState(null);


  const fetchMenu = async () => {
    try {

      setLoading(true);

      const {data} = await API.get("/menu");

      setMenuItems(data.data.menuItems || []);

      setError("");

    } catch(err) {

      console.log(err);

      setError("Failed to load menu");

      toast.error("Unable to fetch menu");

    } finally {

      setLoading(false);

    }
  };


  useEffect(()=>{
    fetchMenu();
  },[]);



  const handleEdit = (meal)=>{
    setSelectedMeal(meal);
    setFormOpen(true);
  };


  const handleDeleteClick = (meal)=>{
    setSelectedMeal(meal);
    setDeleteOpen(true);
  };


  const handleDelete = async()=>{

    if(!selectedMeal) return;

    try{

      setDeleteLoading(true);

      await API.delete(`/menu/${selectedMeal._id}`);

      toast.success("Menu deleted");

      setDeleteOpen(false);
      setSelectedMeal(null);

      fetchMenu();

    }catch(err){

      console.log(err);

      toast.error("Delete failed");

    }finally{

      setDeleteLoading(false);

    }

  };


  return (

    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">


      <motion.div

        initial={{opacity:0,y:-20}}

        animate={{opacity:1,y:0}}

        className="
          flex
          flex-col
          lg:flex-row
          justify-between
          items-start
          lg:items-center
          gap-5
        "

      >


        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-black
            dark:text-white
          ">
            Manage Menu
          </h1>


          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Create, update and manage meals
          </p>


        </div>



        <div className="
          flex
          flex-col
          sm:flex-row
          w-full
          lg:w-auto
          gap-3
        ">


          <button

            onClick={fetchMenu}

            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              sm:w-auto
              border
              px-5
              py-3
              rounded-xl
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
            "

          >

            <RefreshCw size={18}/>

            Refresh

          </button>



          <button

            onClick={()=>{
              setSelectedMeal(null);
              setFormOpen(true);
            }}

            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              sm:w-auto
              bg-red-500
              hover:bg-red-600
              text-white
              px-6
              py-3
              rounded-xl
              transition
              shadow-lg
            "

          >

            <Plus size={20}/>

            Add New Meal

          </button>


        </div>


      </motion.div>





      {error && (

        <div className="
          bg-red-50
          text-red-600
          p-4
          rounded-xl
          text-sm
        ">

          {error}

        </div>

      )}





      <div className="w-full overflow-hidden">

        <MenuTable
          meals={menuItems}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

      </div>





      <MenuFormModal

        open={formOpen}

        onClose={()=>{

          setFormOpen(false);

          setSelectedMeal(null);

        }}

        meal={selectedMeal}

        refreshMenu={fetchMenu}

      />





      <DeleteMenuModal

        open={deleteOpen}

        onClose={()=>{

          setDeleteOpen(false);

          setSelectedMeal(null);

        }}

        meal={selectedMeal}

        loading={deleteLoading}

        onConfirm={handleDelete}

      />


    </div>

  );

};


export default ManageMenu;