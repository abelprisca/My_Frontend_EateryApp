import { useEffect, useState } from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import API from "../../services/api";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/users");

      setCustomers(data.data || []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Customers ({customers.length})
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Phone</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>

            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                        {(customer.fullName || customer.name)
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {customer.fullName || customer.name}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {customer.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      {customer.phone || "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm capitalize">
                      {customer.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CustomersTable;