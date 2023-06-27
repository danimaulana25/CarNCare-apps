import Image from "next/image";
import { Inter } from "next/font/google";
import { app, db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [brand, setBrand] = React.useState("");
  const [bank, setBank] = React.useState("");
  const [listBank, setListBank] = React.useState([]);
  const [cars, setcars] = React.useState("");
  const [transactions, settransactions] = React.useState("");

  React.useEffect(() => {
    const brn = onSnapshot(collection(db, "Brands"), (snapshot) => {
      setBrand(snapshot.docs.length);
    });
    const bnk = onSnapshot(collection(db, "Banks"), (snapshot) => {
      setListBank(snapshot.docs.map((doc) => doc.data()));
      setBank(snapshot.docs.length);
    });
    const cars = async () => {
      const res = await axios.get("http://localhost:8000/api/cars");
      setcars(res.data.length);
    };
    cars();
    const transactions = async () => {
      const tes = await axios.get("http://localhost:8000/api/transactions");
      settransactions(tes.data.transactions.length);
      console.log(tes);
    };
    transactions();
    return () => {
      brn();
      bnk();
    };
  }, []);

  return (
    <div className=" h-full w-full p-2">
      <div class="text-6xl font-bold mt-2 mb-6 text-[#27374D]">
        Dealer <span className="text-[#9DB2BF]">Apps</span>
      </div>
      {/* <p className="font-semibold text-xl max-xl:hidden text-[#030303]">
        Dealer<span className="text-[#e6d2f3]">Apps</span>
      </p> */}
      <div class="grid grid-cols-4 max-md:grid-cols-2 gap-2 mb-5">
        <div className="bg-white shadow-xl card">
          {/* <div className="card-body">
            <h2 className="card-title">Brand Total</h2>
            <p>{brand}</p>
          </div> */}
          <div class="flex items-center justify-evenly h-full p-5">
            <Image src={"/bank.png"} width={50} height={50} />
            <div class="divider divider-horizontal my-3"></div>
            <div class="flex flex-col">
              <p class="text-md font-bold text-[#27374D]">Accounts Total</p>
              <p className="mt-2 text-5xl font-extrabold text-center text-[#27374D]">
                {bank}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl card">
          <div class="flex items-center justify-evenly h-full p-5">
            <Image src={"/tag.png"} width={50} height={50} />
            <div class="divider divider-horizontal my-3"></div>
            <div class="flex flex-col">
              <p class="text-md font-bold text-[#27374D]">Number Of Brands</p>
              <p className="mt-2 text-5xl font-extrabold text-center text-[#27374D]">
                {brand}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl card">
          <div class="flex items-center justify-evenly h-full p-5">
            <Image src={"/cars.png"} width={60} height={50} />
            <div class="divider divider-horizontal my-3"></div>
            <div class="flex flex-col">
              <p class="text-md font-bold text-[#27374D]">Cars Total</p>
              <p className="mt-2 text-5xl font-extrabold text-center text-[#27374D]">
                {cars}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl card">
          <div class="flex items-center justify-evenly h-full p-5">
            <Image src={"/money-transfer.png"} width={60} height={50} />
            <div class="divider divider-horizontal my-3"></div>
            <div class="flex flex-col">
              <p class="text-md font-bold text-[#27374D]">Transaction Total</p>
              <p className="mt-2 text-5xl font-extrabold text-center text-[#27374D]">
                {transactions}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="flex items-center justify-center mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide className="py-10">
            <div class="flex justify-center items-center h-full">
              <div className="h-full bg-white shadow-xl card">
                <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper> */}

      <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1 mb-5">
        <div className="bg-white shadow-xl card">
          <div class="text-2xl text-center my-2 font-bold text-[#27374D]">
            Our Location
          </div>
          <div class="p-2 mb-1">
            <iframe
              className="shadow-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.50444412852!2d112.61309347349695!3d-7.946708279161526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827687d272e7%3A0x789ce9a636cd3aa2!2sState%20Polytechnic%20of%20Malang!5e0!3m2!1sen!2sid!4v1687321301537!5m2!1sen!2sid"
              style={{
                border: 0,
                borderRadius: 15,
                height: 400,
                width: "100%",
              }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="max-h-[468px] overflow-auto bg-white shadow-xl card">
          <div class="text-2xl text-center my-2 font-bold text-[#27374D]">
            List Banks
          </div>
          <div class="p-2 mb-1">
            {listBank.map((item, index) => (
              <div className="mb-2 shadow-xl card">
                <div class="flex items-center p-2 gap-4">
                  <img
                    src={item.image}
                    height={75}
                    width={75}
                    className="rounded-md"
                  />
                  <div className="flex flex-col items-start gap-2 ">
                    <p class="text-xl font-semibold text-[#526D82] ">
                      {item.name}
                    </p>
                    <p class="text-xl font-semibold text-[#526D82]">
                      {item.noRek}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
