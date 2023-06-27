import React from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SparepartsIndex = () => {
  const router = useRouter();
  const [id, setId] = React.useState("");
  const [Sparepart, setSpareparts] = useState([]);
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getSpareparts = async () => {
      const response = await axios.get("http://localhost:8000/api/spareparts");
      console.log(response.data);
      setSpareparts(response.data);
      setIsLoading(false);
    };
    getSpareparts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/api/spareparts/" + id);
      setSpareparts((prevCar) => prevCar.filter((item) => item.id !== id));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full bg-[#F5EFE7]">
          <div className="flex justify-center ">
            <span className="circle animate-loader"></span>
            <span className="circle animate-loader animation-delay-200"></span>
            <span className="circle animate-loader animation-delay-400"></span>
            <span className="circle animate-loader animation-delay-600"></span>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex items-center justify-between mt-2 mb-6">
            <p className="text-5xl font-bold first-letter: text-[#27374D]">
              List Spareparts
            </p>
            <Link
              href={"/spareparts/create"}
              className="btn bg-[#27374D] text-[#F5EFE7]"
            >
              Create
            </Link>
          </div>
          <div className="flex flex-col shadow-xl">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border rounded-lg  dark:border-gray-700 ">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Color
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Material
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {Sparepart.map((sparepart, index) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            {sparepart.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            {sparepart.color}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            {sparepart.material}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            Rp{" "}
                            {new Intl.NumberFormat(["id"]).format(
                              sparepart.price
                            )}
                            ,-
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={"/spareparts/" + sparepart.id}
                                className="duration-300 hover:-translate-y-1"
                              >
                                <Image
                                  src={"/edit.png"}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                              <button
                                className="duration-300 hover:-translate-y-1"
                                onClick={() => handleDelete(sparepart.id)}
                              >
                                <Image
                                  src={"/delete.png"}
                                  width={55}
                                  height={55}
                                ></Image>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SparepartsIndex;
