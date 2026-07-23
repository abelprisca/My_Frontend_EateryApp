import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import API from "../../services/api";


const categories = [
  "Appetizers",
  "Mains",
  "Sides",
  "Desserts",
  "Drinks",
  "Fast Food",
  "Rice Dishes",
  "Grilled Meals",
  "Soups",
  "Salads",
];


const MenuFormModal = ({
  open,
  onClose,
  meal,
  refreshMenu,
}) => {


  const [loading, setLoading] =
    useState(false);


  const [form, setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "Mains",
      isDietary: false,
      isAvailable: true,
    });



  const [image, setImage] =
    useState(null);



  const [preview, setPreview] =
    useState("");




  useEffect(() => {

    if (meal) {

      setForm({

        name: meal.name || "",

        description:
          meal.description || "",

        price:
          meal.price || "",

        category:
          meal.category || "Mains",

        isDietary:
          meal.isDietary ?? false,

        isAvailable:
          meal.isAvailable ?? true,

      });



      if (meal.image) {

        setPreview(

          meal.image.startsWith("http")
            ? meal.image
            : `${import.meta.env.VITE_API_URL}/${meal.image}`

        );

      }


    } else {


      setForm({

        name: "",
        description: "",
        price: "",
        category: "Mains",
        isDietary: false,
        isAvailable: true,

      });


      setImage(null);

      setPreview("");

    }


  }, [meal, open]);








  const handleChange = (e) => {


    const {
      name,
      value,
      type,
      checked,
    } = e.target;



    setForm((prev) => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));


  };







  const handleImage = (e) => {


    const file =
      e.target.files[0];


    if (!file) return;



    setImage(file);


    setPreview(
      URL.createObjectURL(file)
    );


  };







  const handleSubmit = async (e) => {


    e.preventDefault();



    try {


      setLoading(true);



      const formData =
        new FormData();



      formData.append(
        "name",
        form.name
      );


      formData.append(
        "description",
        form.description
      );


      formData.append(
        "price",
        form.price
      );


      formData.append(
        "category",
        form.category
      );


      formData.append(
        "isDietary",
        form.isDietary
      );


      formData.append(
        "isAvailable",
        form.isAvailable
      );




      if (image) {

        formData.append(
          "image",
          image
        );

      }

      if (meal) {


       await API.patch(`/menu/${meal._id}`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

        toast.success(
          "Meal updated successfully"
        );

      } else {



        await API.post(
          "/menu",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );



        toast.success(
          "Meal created successfully"
        );


      }






      refreshMenu();


      onClose();




    } catch (error) {


      console.log(error);


      toast.error(

        error.response?.data?.message ||
        "Something went wrong"

      );



    } finally {


      setLoading(false);


    }


  };







  if (!open) return null;







  return (

    <AnimatePresence>


      <div
        className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          p-4
        "
      >



        <motion.div

          initial={{
            scale: 0.8,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          exit={{
            scale: 0.8,
            opacity: 0,
          }}

          className="
            bg-white
            dark:bg-gray-900
            rounded-3xl
            w-full
            max-w-2xl
            shadow-2xl
            max-h-[90vh]
            overflow-y-auto
          "

        >




          {/* Header */}

          <div
            className="
              flex
              justify-between
              items-center
              p-6
              border-b
              dark:border-gray-700
            "
          >

            <h2
              className="
                text-2xl
                font-black
                dark:text-white
              "
            >

              {meal
                ? "Edit Meal"
                : "Add New Meal"}

            </h2>



            <button
              onClick={onClose}
            >

              <X />

            </button>


          </div>







          <form
            onSubmit={handleSubmit}
            className="
              p-6
              space-y-5
            "
          >





            {/* Image */}

            <div
              className="
                flex
                flex-col
                items-center
              "
            >

              <label
                className="
                  cursor-pointer
                "
              >

                <div
                  className="
                    w-36
                    h-36
                    rounded-2xl
                    border-2
                    border-dashed
                    border-red-300
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                >

                  {preview ? (

                    <img
                      src={preview}
                      alt="preview"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  ) : (

                    <Upload size={40}/>

                  )}

                </div>



                <input

                  type="file"

                  hidden

                  accept="image/*"

                  onChange={handleImage}

                />


              </label>


            </div>







            <input

              name="name"

              value={form.name}

              onChange={handleChange}

              placeholder="Meal Name"

              className="
                w-full
                border
                rounded-xl
                p-3
                dark:bg-gray-800
                dark:text-white
              "

              required

            />







            <textarea

              name="description"

              value={form.description}

              onChange={handleChange}

              placeholder="Description"

              rows={4}

              className="
                w-full
                border
                rounded-xl
                p-3
                dark:bg-gray-800
                dark:text-white
              "

              required

            />








            <div
              className="
                grid
                grid-cols-2
                gap-4
              "
            >


              <input

                type="number"

                name="price"

                value={form.price}

                onChange={handleChange}

                placeholder="Price"

                className="
                  border
                  rounded-xl
                  p-3
                  dark:bg-gray-800
                  dark:text-white
                "

                required

              />





              <select

                name="category"

                value={form.category}

                onChange={handleChange}

                className="
                  border
                  rounded-xl
                  p-3
                  dark:bg-gray-800
                  dark:text-white
                "

              >

                {categories.map((category)=>(

                  <option
                    key={category}
                    value={category}
                  >

                    {category}

                  </option>

                ))}


              </select>



            </div>









            {/* Options */}


            <label
              className="
                flex
                items-center
                gap-3
                dark:text-white
              "
            >

              <input

                type="checkbox"

                name="isDietary"

                checked={form.isDietary}

                onChange={handleChange}

                className="
                  w-5
                  h-5
                  accent-red-500
                "

              />


              Dietary Meal


            </label>






            <label
              className="
                flex
                items-center
                gap-3
                dark:text-white
              "
            >

              <input

                type="checkbox"

                name="isAvailable"

                checked={form.isAvailable}

                onChange={handleChange}

                className="
                  w-5
                  h-5
                  accent-red-500
                "

              />


              Available


            </label>









            {/* Buttons */}

            <div
              className="
                flex
                justify-end
                gap-3
                pt-4
              "
            >


              <button

                type="button"

                onClick={onClose}

                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                "

              >

                Cancel


              </button>





              <button

                disabled={loading}

                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                "

              >

                {loading
                  ? "Saving..."
                  : meal
                  ? "Update Meal"
                  : "Create Meal"}


              </button>



            </div>




          </form>




        </motion.div>



      </div>



    </AnimatePresence>

  );

};



export default MenuFormModal;