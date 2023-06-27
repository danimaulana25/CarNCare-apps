import React from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [name, setNama] = React.useState("");

  React.useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "Brands", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setNama(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    };
    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await updateDoc(doc(db, "Brands", id), {
        name,
      });
      router.push("/brands");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding document: ", e);
      // MySwal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Something went wrong!',
      // });
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
          Update Brands{" "}
        </h1>
      </div>
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#27374D]"
          >
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nama"
            value={name}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-yellow-500 btn hover:bg-yellow-600 text-[#27374D]"
          >
            Edit Data
          </button>
        </div>
      </form>
    </div>
  );
}
