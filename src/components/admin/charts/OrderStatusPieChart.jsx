import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import { motion } from "framer-motion";



const COLORS = [

  "#22c55e",

  "#f59e0b",

  "#ef4444",

  "#3b82f6",

  "#8b5cf6"

];




const OrderStatusPieChart = ({data = []}) => {


  return (

    <motion.div


      initial={{
        opacity:0,
        y:30
      }}


      animate={{
        opacity:1,
        y:0
      }}


      transition={{
        duration:0.5
      }}


      className="
        bg-white
        dark:bg-gray-900
        rounded-3xl
        p-6
        shadow-lg
        border
        border-gray-200
        dark:border-gray-700
      "


    >



      <h2 className="
        text-lg
        font-black
        text-gray-800
        dark:text-white
        mb-6
      ">

        Order Status

      </h2>





      <div className="h-[350px]">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <PieChart>


            <Pie

              data={data}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="50%"

              outerRadius={110}

              label


            >


              {
                data.map((entry,index)=>(

                  <Cell

                    key={`cell-${index}`}

                    fill={
                      COLORS[index % COLORS.length]
                    }

                  />

                ))
              }


            </Pie>



            <Tooltip />

            <Legend />


          </PieChart>


        </ResponsiveContainer>


      </div>



    </motion.div>


  );

};


export default OrderStatusPieChart;