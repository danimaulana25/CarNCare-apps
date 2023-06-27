import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/transactions/" + id
      );
      setData(response.data);
      setIsLoading(false);
    };
    getData();
  }, []);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  return isLoading ? (
    <div className="flex items-center justify-center h-full">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-24 h-24 mr-2 text-gray-200 animate-spin  fill-[#FF4C29]"
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
    <div className="flex flex-col w-full h-full">
      <Link
        href={"/transactions"}
        className="hover:text-[#FF4C29] text-[#D65A31]"
      >
        <div className="flex items-center gap-1 text-[#27374D] ">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Arrow / Chevron_Left_MD">
              <path
                id="Vector"
                d="M14 16L10 12L14 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>{" "}
          Kembali
        </div>
      </Link>
      <div className="flex items-center justify-center text-4xl font-semibold text-[#27374D]  mb-5">
        Detail Transactions
      </div>
      <div className="flex items-center justify-center h-full gap-8 p-7 pb-10">
        <div className="w-full h-full bg-[#1f2029] p-5 rounded-lg">
          <p className="text-3xl font-semibold">Information Order</p>

          <div class="relative overflow-x-auto mt-10">
            <table class="w-full text-sm text-left text-gray-500">
              <tbody>
                <tr class=" border-b  ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-[#f9f9f9] whitespace-nowrap "
                  >
                    Customer Name
                  </th>
                  <td class="px-6 py-4">:</td>
                  <td class="px-6 py-4 text-[#f9f9f9]">
                    {data.transaction.customer_name}
                  </td>
                </tr>
                <tr class="  border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-[#f9f9f9] whitespace-nowrap "
                  >
                    Order Date
                  </th>
                  <td class="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#f9f9f9]">
                    {formatDate(data.transaction.created_at)}
                  </td>
                </tr>
                <tr class="  border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-[#f9f9f9] whitespace-nowrap "
                  >
                    Payment
                  </th>
                  <td class="px-6 py-4">:</td>
                  <td class="px-6 py-4 text-[#f9f9f9]">
                    {data.transaction.payment}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full h-full bg-[#1f2029] p-5 rounded-lg">
          <p className="text-3xl font-semibold">List Orders</p>
          <div class="relative overflow-x-auto mt-10">
            <table class="w-full text-sm text-left text-gray-500 ">
              <tbody>
                {data.details.map((detail, index) => (
                  <tr class=" border-b  ">
                    {/* <td class="px-6 py-4">
                        {index + 1}
                      </td> */}
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-[#f9f9f9] whitespace-nowrap "
                    >
                      {detail.cars.name}
                    </th>
                    <td class="px-6 py-4 text-[#f9f9f9]">
                      x {detail.quantity}
                    </td>
                    <td class="px-6 py-4 text-[#f9f9f9]">
                      Rp {new Intl.NumberFormat(["id"]).format(detail.price)}
                    </td>
                    <td class="px-6 py-4 text-[#f9f9f9] font-bold text-end">
                      Rp{" "}
                      {new Intl.NumberFormat(["id"]).format(
                        detail.cars.price * detail.quantity
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-b">
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-xl font-semibold text-center text-[#f9f9f9]"
                  >
                    Total
                  </td>
                  <td class="px-6 py-4 text-[#f9f9f9] font-bold text-end text-xl">
                    Rp{" "}
                    {new Intl.NumberFormat(["id"]).format(
                      data.transaction.total_price
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
