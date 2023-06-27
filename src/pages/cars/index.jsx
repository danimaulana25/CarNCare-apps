import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CarsIndex = () => {
  const router = useRouter();
  const [id, setId] = React.useState("");
  const [Datas, setCars] = useState([]);
  const [alert, setAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getCars = async () => {
      const response = await axios.get("http://localhost:8000/api/cars");
      setCars(response.data);
      setIsLoading(false);
    };
    getCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8000/api/cars/" + id);
      setCars((prevCar) => prevCar.filter((item) => item.id !== id));
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
            <p className="text-5xl font-bold text-[#213555]">List Cars</p>
            <Link href={"/cars/create"} className="btn text-[#DDE6ED] ">
              Create
            </Link>
          </div>
          <div className="flex flex-col shadow-xl">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border border-transparent rounded-xl dark:border-gray-700">
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
                          Image
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-center text-white bg-[#27374D] uppercase"
                        >
                          Type
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-[#F5EFE7] dark:divide-gray-700">
                      {Datas.map((car, index) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap text-[#213555]">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-center  whitespace-nowrap text-[#213555]">
                            {car.name}
                          </td>
                          <td className="flex items-center justify-center px-6 py-4 text-center  whitespace-nowrap text-[#213555]">
                            <img
                              src={`http://localhost:8000${car.image}`}
                              alt=""
                              className="rounded-md"
                              width={200}
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-center  whitespace-nowrap text-[#213555]">
                            {car.brandsName}
                          </td>
                          <td className="px-6 py-4 text-sm text-center  whitespace-nowrap text-[#213555]">
                            {car.typesName}
                          </td>
                          <td className="px-6 py-4 text-sm text-center  whitespace-nowrap text-[#213555]">
                            {car.color}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={"/cars/" + car.id}
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
                                onClick={() => handleDelete(car.id)}
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

      {/* <div className="py-12">
        {Datas.map((cars) => (
          <div key={cars.id}>
            <div>
              <p>{cars.name}</p>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default CarsIndex;
