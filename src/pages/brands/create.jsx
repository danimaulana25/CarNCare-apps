import React from "react";
import Link from "next/link";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

// const MySwal = withReactContent(Swal);

const BrandsCreate = () => {
  const router = useRouter();

  const [name, setNama] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const docRef = await addDoc(collection(db, "Brands"), {
        name,
      });
      router.push("/brands");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="m-10">
      <div className="py-4">
        <Link href="/brands">
          <div className="flex items-center">
            <svg
              className="w-10 rounded-lg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Arrow / Chevron_Left">
                <path
                  id="Vector"
                  d="M15 19L8 12L15 5"
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            <p className="text-[#213555]">Kembali</p>
          </div>
        </Link>
        <h1 className="mt-3 text-5xl font-semibold text-[#27374D]">
          Create Brand
        </h1>
      </div>
      <form>
        <div className="w-full max-w-xs mb-4 form-control">
          <label className="label">
            <span className="label-text text-[#27374D]">Nama</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setNama(e.target.value)}
            className="w-full max-w-xs input input-bordered"
          />
        </div>
        {/* <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#213555] "
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setNama(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 max-md:w-full p-2.5 "
            required
          />
        </div> */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-[27374D] btn hover:bg-[#9DB2BF]"
          disabled={isSubmitted}
        >
          Create Data
        </button>
      </form>
    </div>
  );
};

export default BrandsCreate;
