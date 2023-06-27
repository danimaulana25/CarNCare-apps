import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { app, db } from "../../../firebase";

export default function Index() {
  const router = useRouter();
  const [cars, setCars] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [transactionDetailData, setTransactionDetailData] = React.useState([]);
  const [bank, setBank] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [alert, setAlert] = React.useState(false);

  const [form, setForm] = React.useState({
    order: {
      customer_name: "",
      payment: "",
      total_price: 0,
    },
    transactionDetail: [],
  });
  const fetchData = async () => {
    const updatedTransactionDetailData = [];

    for (const orderDetail of form.transactionDetail) {
      const res = await axios.get(
        `http://localhost:8000/api/cars/${orderDetail.cars_id}`
      );
      const cars = res.data;
      updatedTransactionDetailData.push({
        ...orderDetail,
        cars,
      });
    }
    setTransactionDetailData(updatedTransactionDetailData);
  };

  const handleCreateTransactionDetail = async (id) => {
    const carsFound = await axios.get(`http://localhost:8000/api/cars/${id}`);
    let cars = carsFound.data;
    // push cars_id to transactionDetail if cars_id is not exist in transactionDetail and if cars_id is exist, increase the quantity
    let transactionDetail = form.transactionDetail;
    let carsFoundIntransactionDetail = transactionDetail.find(
      (orderDetail) => orderDetail.cars_id === cars.id
    );
    if (carsFoundIntransactionDetail) {
      carsFoundIntransactionDetail.quantity += 1;
    } else {
      transactionDetail.push({
        cars_id: cars.id,
        quantity: 1,
        price: cars.price,
      });
    }
    // calculate total price
    let totalPrice = 0;
    for (const orderDetail of transactionDetail) {
      totalPrice += orderDetail.price * orderDetail.quantity;
    }
    setTotalPrice(totalPrice);
    setForm({
      ...form,
      transactionDetail: transactionDetail,
    });
    fetchData();

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    console.log(form);
    const response = await axios.post(
      "http://localhost:8000/api/transaction-details",
      form
    );
    router.push("/transactions");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    const bank = onSnapshot(collection(db, "Banks"), (snapshot) => {
      setBank(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setForm((prevForm) => ({
        ...prevForm,
        order: {
          ...prevForm.order,
          payment: snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))[0].name,
        },
      }));
      setIsLoading(false);
    });

    const getCars = async () => {
      const response = await axios.get("http://localhost:8000/api/cars");
      setCars(response.data);

      setIsLoading(false);
    };
    getCars();

    return () => {
      bank();
    };
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-full">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-24 h-24 mr-2 text[-gray-200] animate-spin  fill-[#FF4C29]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="flex justify-center gap-4">
      {alert && (
        <div className="z-50 toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Berhasil menambahkan pesanan</span>
          </div>
        </div>
      )}
      <div className="w-9/12 p-10">
        <div className="mb-16">
          <p className="mt-2 mb-4 text-4xl font-semibold text-[#27374D]">
            List Cars
          </p>
          {cars.length === 0 ? (
            <div className="flex justify-center items-center h-[30vh]">
              <h1 className="text-3xl ">Tidak ada data</h1>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
              {cars.map((item, index) => (
                <div className="shadow-xl card bg-[#213555]" key={index}>
                  <div className="flex items-center justify-center h-full p-2 ">
                    <img
                      src={`http://localhost:8000${item.image}`}
                      alt="Shoes"
                      className="w-full rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-between p-5 ">
                    <div className="p-1">
                      <h2 className="text-lg font-semibold capitalize text-[#DDE6ED] ">
                        {item.name}
                      </h2>
                      <p className="text-[#DDE6ED] font-extrabold text-base">
                        Rp {new Intl.NumberFormat(["id"]).format(item.price)},-
                      </p>
                      <h4 className="text-xs font-semibold capitalize">
                        year-
                        {item.year}
                      </h4>
                    </div>
                    <div>
                      <svg
                        onClick={() => handleCreateTransactionDetail(item.id)}
                        className="cursor-pointer w-7 h-7 hover:w-[30px]  hover:h-[30px] duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                          fill="#FF4C29"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-3/12 custom-scrollbar">
        <p className="mt-2 mb-4 text-4xl font-semibold text-[#27374D]">Order</p>
        <div className="max-h-[50vh] overflow-y-auto p-2 mb-8">
          {transactionDetailData.length === 0 ? (
            <p className="text-xl">Tidak ada pesanan</p>
          ) : (
            transactionDetailData.map((item, index) => (
              <div className="shadow-xl card bg-[#27374D] mb-3" key={index}>
                <div className="flex items-center justify-between gap-2 p-2">
                  <img
                    src={`http://localhost:8000${item.cars.image}`}
                    alt="Shoes"
                    className="rounded-full "
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg text-[#DDE6ED]">{item.cars.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.cars.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end font-semibold">
                    <p className="text-lg text-[#DDE6ED] ">x {item.quantity}</p>
                    <p className="text-base text-[#DDE6ED]">
                      Rp {new Intl.NumberFormat(["id"]).format(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {form.transactionDetail.length > 0 && (
          <div className="h-fit bg-[#27374D] rounded-xl p-4">
            <div className="flex justify-between mb-6">
              <p className="text-base font-medium text-[#DDE6ED]">Total</p>
              <p className="text-base font-bold text-[#DDE6ED]">
                Rp. {new Intl.NumberFormat(["id"]).format(totalPrice)}
              </p>
            </div>
            <div className="flex items-center justify-center ">
              <label
                htmlFor="my_modal_7"
                className="px-4 py-2 font-semibold text-[#DDE6ED] bg-[#FF6000] rounded-md hover:bg-[#FF4C29] hover:shadow-lg focus:ring-opacity-50 cursor-pointer"
              >
                Proceed Order
              </label>
            </div>
          </div>
        )}
      </div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="text-[#F5EFE7] bg-[#27374D] modal-box">
          <h3 className="mb-6 text-lg font-bold">Create new order!</h3>
          <div className="w-full mb-3 form-control">
            <label className="label">
              <span className="label-text text-[#DDE6ED]">Nama Pelanggan</span>
            </label>
            <input
              type="text"
              min={0}
              placeholder="customer name"
              name="customer_name"
              onChange={(event) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  order: {
                    ...prevForm.order,
                    customer_name: event.target.value,
                  },
                }));
              }}
              value={form.order.customer_name}
              className="w-full max-w-xs input input-bordered text-[#DDE6ED] "
            />
          </div>
          <div className="w-full mb-3 form-control">
            <label className="label">
              <span className="label-text text-[#DDE6ED]">Pembayaran</span>
            </label>
            <select
              className="w-full text-[#DDE6ED] select select-bordered"
              onChange={(e) =>
                setForm({
                  ...form,
                  order: { ...form.order, payment: e.target.value },
                })
              }
            >
              {bank.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 font-semibold text-[#DDE6ED] bg-[#D65A31] rounded-md hover:bg-[#FF4C29] hover:shadow-lg focus:ring-opacity-50 cursor-pointer"
            >
              Create Data
            </button>
          </div>
        </div>
        <label className="cursor-pointer modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
}
