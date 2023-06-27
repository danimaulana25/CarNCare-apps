import React from "react";
import Link from 'next/link'
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();


  const [form, setForm] = React.useState({
    name: "",
    noRek: "",
    image: "",
  })

  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    try {
      const docRef = await addDoc(collection(db, "Banks"), form);
      router.push('/banks');
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="p-2">
      <Link href="/banks" className="mb-3 btn text-[#F5EFE7] ">
        {" "}
        Kembali
      </Link>
      <p className="mb-4 text-2xl font-semibold text-[#27374D] ">
        Create Banks
      </p>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D] ">Name</span>
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
          <span className="label-text text-[#27374D] ">Nomor Rekening</span>
        </label>
        <input
          type="text"
          min={0}
          placeholder="Nomor Rekening"
          name="noRek"
          onChange={handleChange}
          value={form.noRek}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs mb-4 form-control">
        <label className="label">
          <span className="label-text text-[#27374D] ">Image</span>
        </label>
        {form.image !== "" && (
          <img
            src={form.image}
            alt=""
            width={200}
            height={200}
            className="my-4"
          />
        )}
        <input
          type="text"
          min={0}
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={form.image}
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <button
        disabled={isSubmitted}
        className="bg-[#27374D] text-[#F5EFE7] border-0 hover:bg-[#526D82] btn"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
