import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import API from "../../services/api";

import StatsCards from "../../components/admin/StatsCards";

import OrdersBarChart from "../../components/admin/charts/OrdersBarChart";
import OrderStatusPieChart from "../../components/admin/charts/OrderStatusPieChart";


const Analytics = () => {


  const [loading, setLoading] = useState(true);



  const [analytics, setAnalytics] = useState({

    totalOrders: 0,

    totalRevenue: 0,

    pendingOrders: 0,

    deliveredOrders: 0,

    totalMeals: 0,

    monthlyOrders: [],

    orderStatus: []

  });






  useEffect(() => {


    const fetchAnalytics = async () => {


      try {


        setLoading(true);



        // ======================================
        // FETCH BACKEND DATA
        // ======================================


        const [

          ordersResponse,

          menuResponse


        ] = await Promise.all([


          API.get("/orders/admin/all"),


          API.get("/menu")


        ]);







        // ======================================
        // EXTRACT DATA SAFELY
        // ======================================


        const orders =

          ordersResponse.data.data?.orders ||

          ordersResponse.data.data ||

          ordersResponse.data ||

          [];





        const menuItems =

          menuResponse.data.data?.menu ||

          menuResponse.data.data ||

          menuResponse.data ||

          [];








        // ======================================
        // STATISTICS
        // ======================================


        const totalOrders = orders.length;





        const pendingOrders =

          orders.filter(

            (order) =>

              order.status?.toLowerCase() === "pending"

          ).length;






        const deliveredOrders =

          orders.filter(

            (order) =>

              order.status?.toLowerCase() === "delivered"

          ).length;








        const totalRevenue =


          orders

          .filter(

            (order)=>

              order.status?.toLowerCase()
              === "delivered"

          )


          .reduce(

            (sum, order)=>

              sum +

              Number(

                order.total ||

                order.totalAmount ||

                0

              ),


              0

          );










        // ======================================
        // BAR CHART
        // MONTHLY ORDERS
        // ======================================


        const months = [

          "Jan",

          "Feb",

          "Mar",

          "Apr",

          "May",

          "Jun",

          "Jul",

          "Aug",

          "Sep",

          "Oct",

          "Nov",

          "Dec"

        ];





        const monthlyObject = {};





        orders.forEach((order)=>{


          const date = new Date(

            order.createdAt

          );



          const month =

            months[date.getMonth()];



          monthlyObject[month] =

            (monthlyObject[month] || 0) + 1;



        });







        const monthlyOrders =


          Object.entries(monthlyObject)

          .map(([month,value])=>({


            name: month,


            orders: value


          }));









        // ======================================
        // PIE CHART
        // ORDER STATUS
        // ======================================


        const statusObject = {};





        orders.forEach((order)=>{


          const status =

            order.status || "Unknown";



          statusObject[status] =

            (statusObject[status] || 0) + 1;



        });







        const orderStatus =


          Object.entries(statusObject)

          .map(([status,value])=>({


            name: status,


            value


          }));









        // ======================================
        // UPDATE STATE
        // ======================================


        setAnalytics({


          totalOrders,


          totalRevenue,


          pendingOrders,


          deliveredOrders,


          totalMeals: menuItems.length,


          monthlyOrders,


          orderStatus


        });






      } catch(error) {


        console.error(

          "Analytics Error:",

          error.response?.data || error.message

        );


      } finally {


        setLoading(false);


      }


    };




    fetchAnalytics();



  }, []);









  return (

    <div className="space-y-8">





      {/* PAGE HEADER */}


      <motion.div


        initial={{

          opacity:0,

          y:-20

        }}


        animate={{

          opacity:1,

          y:0

        }}


        transition={{

          duration:0.5

        }}


      >


        <h1 className="
          text-3xl
          font-black
          text-gray-900
          dark:text-white
        ">

          Analytics Dashboard

        </h1>




        <p className="
          mt-2
          text-gray-500
          dark:text-gray-400
        ">

          Restaurant performance overview

        </p>



      </motion.div>









      {/* STATISTICS CARDS */}


      <StatsCards


        totalOrders={

          analytics.totalOrders

        }


        totalRevenue={

          analytics.totalRevenue

        }


        pendingOrders={

          analytics.pendingOrders

        }


        deliveredOrders={

          analytics.deliveredOrders

        }


        totalMeals={

          analytics.totalMeals

        }


        loading={loading}


      />









      {/* CHART AREA */}


      <div className="

        grid

        grid-cols-1

        xl:grid-cols-3

        gap-6

      ">





        <motion.div


          className="xl:col-span-2"


          initial={{

            opacity:0,

            x:-30

          }}


          animate={{

            opacity:1,

            x:0

          }}


        >


          <OrdersBarChart


            data={

              analytics.monthlyOrders

            }


          />


        </motion.div>









        <motion.div


          initial={{

            opacity:0,

            x:30

          }}


          animate={{

            opacity:1,

            x:0

          }}


        >


          <OrderStatusPieChart


            data={

              analytics.orderStatus

            }


          />


        </motion.div>





      </div>






    </div>

  );

};



export default Analytics;