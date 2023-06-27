import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Create() {
  const router = useRouter();

  const [form, setForm] = React.useState({
    name: "",
    color: "",
    material: "",
    price: 0,
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
      formData.append("color", form.color);
      formData.append("material", form.material);
      formData.append("price", form.price);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/spareparts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      router.push("/spareparts");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="p-2">
      <Link href="/spareparts" className="mb-3 btn bg-[#27374D] text-[#F5EFE7]">
        {" "}
        Kembali
      </Link>
      <p className="mb-4 text-2xl font-semibold text-[#27374D]">
        Create Spareparts
      </p>
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
          <span className="label-text text-[#27374D]">Material</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Material"
          name="material"
          onChange={handleChange}
          value={form.material}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
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
      <button
        disabled={isSubmitted}
        className="bg-[#27374D] text-[#F5EFE7] border-0 hover:bg-[#9DB2BF]] btn"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
