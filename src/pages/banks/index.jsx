import React from "react";
import { app, db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

const BanksIndex = () => {
  const [Banks, setBanks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const brn = onSnapshot(collection(db, "Banks"), (snapshot) => {
      setBanks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return brn;
  }, []);

  console.log(Banks);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Banks", id));
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
            <p className="text-5xl font-bold text-[#27374D]">List Banks</p>
            <Link
              href={"/banks/create"}
              className="btn bg-[#27374D] text-[#F5EFE7]"
            >
              Create
            </Link>
          </div>
          <div className="flex flex-col shadow-xl">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border rounded-lg shadow-xl dark:border-gray-700">
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
                          Image
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
                          Account Number
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
                      {Banks.map((bank, index) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="flex items-center justify-center px-6 py-4 text-center text-gray-800 whitespace-nowrap ">
                            <img
                              src={bank.image}
                              alt=""
                              className="rounded-md"
                              width={100}
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            {bank.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ">
                            {bank.noRek}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={"/banks/update/" + bank.id}
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
                                onClick={() => handleDelete(bank.id)}
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

export default BanksIndex;
