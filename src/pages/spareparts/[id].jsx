import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [form, setForm] = React.useState({
    name: "",
    color: "",
    material: "",
    price: 0,
  });
  React.useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await axios.get(
          `http://localhost:8000/api/spareparts/${id}`
        );
        const { image, ...formData } = response.data;
        setForm(formData);
      }
    };
    getData();
  }, [id]);

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await axios.post(
        `http://localhost:8000/api/spareparts/${id}?_method=PUT`,
        form
      );
      router.push("/spareparts");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="m-10">
      <div className="py-4">
        <Link href="/spareparts">
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
            <p className="text-[#27374D] ">Kembali</p>
          </div>
        </Link>
        <h1 className="mt-3 text-5xl font-semibold text-[#27374D] ">Update </h1>
      </div>
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#27374D] "
          >
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            required
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D] ">
            Color
          </label>
          <input
            type="text"
            min={0}
            id="color"
            placeholder="Color"
            name="color"
            onChange={handleChange}
            value={form.color}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D] ">
            Material
          </label>
          <input
            type="text"
            min={0}
            id="material"
            placeholder="material"
            name="material"
            onChange={handleChange}
            value={form.material}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D] ">
            Price
          </label>
          <input
            type="text"
            min={0}
            placeholder="Price"
            name="price"
            onChange={handleChange}
            value={form.price}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <button
            disabled={isSubmitted}
            type="submit"
            onClick={handleSubmit}
            className="bg-yellow-500 btn hover:bg-yellow-600 text-[#27374D] "
          >
            Edit Data
          </button>
        </div>
      </form>
    </div>
  );
}
