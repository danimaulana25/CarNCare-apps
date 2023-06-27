import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { app, db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;
  const [brands, setBrands] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  console.log(id);

  const [previewImage, setPreviewImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const [form, setForm] = React.useState({
    name: "",
    image: "",
    brandsName: "",
    typesName: "",
    price: 0,
    color: "",
    year: "",
    stok: 0,
  });
  React.useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await axios.get(
          `http://localhost:8000/api/cars/${id}`
        );
        console.log(response.data);
        const { image, ...formData } = response.data;
        setForm(formData);
        if (response.data.image) {
          setPreviewImage(`http://localhost:8000${response.data.image}`);
        }
        setIsLoading(false);
      }
    };

    const brand = onSnapshot(collection(db, "Brands"), (snapshot) => {
      setBrands(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setForm((prevForm) => ({
        ...prevForm,
        brandsName: snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0].name,
      }));
      setIsLoading(false);
    });
    const type = onSnapshot(collection(db, "Types"), (snapshot) => {
      setTypes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setForm((prevForm) => ({
        ...prevForm,
        typesName: snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0].name,
      }));
      setIsLoading(false);
    });
    return () => {
      brand();
      type();
      getData();
    };
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brandsName", form.brandsName);
      formData.append("typesName", form.typesName);
      formData.append("price", form.price);
      formData.append("color", form.color);
      formData.append("year", form.year);
      formData.append("stok", form.stok);
      if (form.image) {
        formData.append("image", form.image);
      }
      const res = await axios.post(
        "http://localhost:8000/api/cars/" + id + "?_method=PUT",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      router.push("/cars");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleImage = async (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    const file = e.target.files[0];
    setForm({
      ...form,
      image: file,
    });
  };
  return (
    <div className="m-10">
      <div className="py-4">
        <Link href="/cars">
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
            <p className="text-[#27374D]">Kembali</p>
          </div>
        </Link>
        <h1 className="mt-3 text-5xl font-semibold text-[#27374D]">Update </h1>
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
            value={form.name}
            onChange={handleChange}
            required
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-[#27374D]"
          >
            Photo
          </label>
          {previewImage && (
            <img
              src={previewImage}
              alt=""
              className="my-4 text-center rounded-lg w-82 h-52"
            />
          )}
          <input
            onChange={handleImage}
            name="image"
            type="file"
            className="w-1/2 px-3 py-2 bg-[#3b3b3b] placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="block mb-2 text-sm font-medium ">
          <label className="label">
            <span className="label-text text-[#27374D]">Brand</span>
          </label>
          <select
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            onChange={(event) => {
              setForm((prevForm) => ({
                ...prevForm,
                brandsName: event.target.value,
              }));
            }}
            value={form.brandsName} // Menyamakan nilai dengan form.brandsName
          >
            {brands.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="block mb-2 text-sm font-medium">
          <label className="label">
            <span className="label-text text-[#27374D]">Types</span>
          </label>
          <select
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            onChange={(event) => {
              setForm((prevForm) => ({
                ...prevForm,
                typesName: event.target.value,
              }));
            }}
            value={form.typesName} // Menyamakan nilai dengan form.typesName
          >
            {types.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-6">
          <label className="block mb-2 text-sm font-medium ">Brand</label>
          <input
            type="text"
            min={0}
            placeholder="Brand"
            name="brandsName"
            onChange={handleChange}
            value={form.brandsName}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div> */}
        {/* <div className="mb-6">
          <label className="block mb-2 text-sm font-medium ">Type</label>
          <input
            type="text"
            min={0}
            placeholder="Type"
            name="typesName"
            onChange={handleChange}
            value={form.typesName}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div> */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D]">
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
          <label className="block mb-2 text-sm font-medium text-[#27374D]">
            Color
          </label>
          <input
            type="text"
            min={0}
            placeholder="Color"
            name="color"
            onChange={handleChange}
            value={form.color}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D]">
            Year
          </label>
          <input
            type="text"
            min={0}
            placeholder="Year"
            name="year"
            onChange={handleChange}
            value={form.year}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#27374D]">
            Stok
          </label>
          <input
            type="text"
            min={0}
            placeholder="Stok"
            name="stok"
            onChange={handleChange}
            value={form.stok}
            className="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md max-md:w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <button
            disabled={isSubmitted}
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
