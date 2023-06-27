import React from "react";
import { app, db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

// const MySwal = withReactContent(Swal);

const BrandsIndex = () => {
  const [Brands, setBrand] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const brn = onSnapshot(collection(db, "Brands"), (snapshot) => {
      setBrand(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return brn;
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Brands", id));
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = async (id) => {
    try {
      setId(id);
      window.my_modal_2.showModal();
    } catch (error) {}
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
        <div className="p-2 bg-[#F5EFE7] h-full">
          <div className="flex items-center justify-between mt-2 mb-6">
            <h1 className="text-5xl text-[#27374D] font-semibold">
              List Brands
            </h1>
            <Link className="btn text-[#DDE6ED]" href={"/brands/create"}>
              Create data
            </Link>
          </div>
          <div className="flex flex-col shadow-xl">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full align-middle ">
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-[#F5EFE7] dark:divide-gray-700">
                      {Brands.map((brand, index) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap text-[#213555]">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm text-center  whitespace-nowrap text-[#213555]">
                            {brand.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={"/brands/update/" + brand.id}
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
                                onClick={() => handleDelete(brand.id)}
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
                  {/* <table className="min-w-full divide-y divide-[#DDE6ED] ">
                    <thead className="bg-[#a41b24]">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white bg-[#27374D] uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white bg-[#27374D] uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white bg-[#27374D] uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y bg-[#F5EFE7] text-[#213555] dark:divide-gray-700">
                      {Brands.map((brand, index) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#213555] bg-[#F5EFE7]">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#213555] bg-[#F5EFE7]">
                            {brand.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={"/brands/update/" + brand.id}
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
                                onClick={() => showModal(brand.id)}
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
                      {Brands.length === 0 && !isLoading && (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-6 py-4 whitespace-nowrap  text-[#F5EFE7] text-center text-2xl"
                          >
                            No data.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandsIndex;
