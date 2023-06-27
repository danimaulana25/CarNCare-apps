import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { app, db } from "../../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Create() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = React.useState("");
  const [brands, setBrands] = React.useState([]);
  const [types, setTypes] = React.useState([]);
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

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    setIsSubmitted(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image);
      formData.append("brandsName", form.brandsName);
      formData.append("typesName", form.typesName);
      formData.append("price", form.price);
      formData.append("color", form.color);
      formData.append("year", form.year);
      formData.append("stok", form.stok);
      const res = await axios.post("http://localhost:8000/api/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
  React.useEffect(() => {
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
    };
  }, []);
  console.log(brands);
  return (
    <div className="p-2">
      <Link href="/cars" className="mb-3 btn">
        {" "}
        Kembali
      </Link>
      <p className="mb-4 text-2xl font-semibold text-[#27374D]">Create Cars</p>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={form.name}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Photo</span>
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
          className="w-full max-w-xs  file-input file-input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Brand</span>
        </label>
        <select
          className="w-full max-w-xs input input-bordered"
          onChange={(event) => {
            setForm((prevForm) => ({
              ...prevForm,
              brandsName: event.target.value,
            }));
          }}
        >
          {brands.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Types</span>
        </label>
        <select
          className="w-full max-w-xs input input-bordered"
          onChange={(event) => {
            setForm((prevForm) => ({
              ...prevForm,
              typesName: event.target.value,
            }));
          }}
        >
          {types.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text">Brand</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Brand"
          name="brandsName"
          onChange={handleChange}
          value={form.brandsName}
          className="w-full max-w-xs input input-bordered"
        />
      </div> */}
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Price</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={form.price}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Color</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Color"
          name="color"
          onChange={handleChange}
          value={form.color}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Year</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Year"
          name="year"
          onChange={handleChange}
          value={form.year}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D]">Stok</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Stok"
          name="stok"
          onChange={handleChange}
          value={form.stok}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <button
        disabled={isSubmitted}
        className="bg-[#9DB2BF]-500 border-0 hover:bg-blue-600 btn text-[#DDE6ED]"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
