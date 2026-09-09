import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import API from "../../services/api";
import { getImageUrl } from "../../utils/imageUrl";


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



  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (meal) {
      setForm({
        name: meal.name || "",
        description: meal.description || "",
        price: meal.price || "",
        category: meal.category || "Mains",
        isDietary: meal.isDietary ?? false,
        isAvailable: meal.isAvailable ?? true,
      });

      if (meal.image) {
        setPreview(getImageUrl(meal));
      } else {
        setPreview("");
      }
      setImageFile(null);
      setBase64Image("");
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        category: "Mains",
        isDietary: false,
        isAvailable: true,
      });

      setImageFile(null);
      setBase64Image("");
      setPreview("");
    }
  }, [meal, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64Image(base64String);
      setPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("isDietary", form.isDietary);
      formData.append("isAvailable", form.isAvailable);

      // Append actual File object if present so backend multer receives req.file!
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (base64Image) {
        formData.append("image", base64Image);
      }

      if (base64Image) {
        formData.append("imageBase64", base64Image);
      }

      let res;
      if (meal) {
        res = await API.patch(`/menu/${meal._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Meal updated successfully");
      } else {
        res = await API.post("/menu", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Meal created successfully");
      }

      // Cache base64 image locally so client never loses original upload image
      const createdItem = res?.data?.data?.meal || res?.data?.data?.menuItem || res?.data?.data || {};
      const mealId = createdItem._id || meal?._id;
      if (base64Image && typeof window !== "undefined") {
        if (mealId) {
          localStorage.setItem(`eatery_img_${mealId}`, base64Image);
        }
        if (form.name) {
          localStorage.setItem(`eatery_img_${form.name.trim()}`, base64Image);
        }
      }

      refreshMenu();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
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