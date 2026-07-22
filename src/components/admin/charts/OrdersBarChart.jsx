import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";


const OrdersBarChart = ({ data = [] }) => {


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
        Monthly Orders Overview
      </h2>




      <div className="h-[350px]">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <BarChart data={data}>


            <CartesianGrid
              strokeDasharray="3 3"
            />



            <XAxis

              dataKey="name"

            />



            <YAxis />



            <Tooltip />



            <Bar

              dataKey="orders"

              radius={[10,10,0,0]}

              fill="#ef4444"

            />



          </BarChart>


        </ResponsiveContainer>


      </div>



    </motion.div>

  );

};


export default OrdersBarChart;