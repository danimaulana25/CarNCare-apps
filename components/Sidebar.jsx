import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { asPath } = router;
  console.log(asPath);

  return (
    <div className="bg-[#27374D] w-[15%] fixed min-h-screen text-[#e6d2f3]">
      <Link href={"/"} className="select-none">
        <div className="flex items-center justify-center xl:fixed ">
          <svg
            fill="#000"
            className="xl:w-[70px] w-24 xl:h-[70px] h-24"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128 209c-44.735 0-81-36.265-81-81s36.265-81 81-81 81 36.265 81 81-36.265 81-81 81zm22.53-141.14A64.379 64.379 0 0 0 128.5 64a64.352 64.352 0 0 0-22.917 4.19 1317.969 1317.969 0 0 0 21.079 22.104c.77.79 2.042.806 2.831.038 0 0 12.798-12.235 21.038-22.472zm0 121.635c-8.239-10.237-21.05-22.665-21.05-22.665a1.975 1.975 0 0 0-2.806.041s-10.22 10.605-21.09 22.294a64.352 64.352 0 0 0 22.916 4.19 64.379 64.379 0 0 0 22.03-3.86zM89.908 76.531s-26.02 17.694-26.02 51.538c0 33.845 26.02 53.465 26.02 53.465l38.09-39.787 38.376 38.29s27.389-21.385 27.389-52.066c0-30.682-27.739-51.678-27.739-51.678l-25.672 26.32 13.39 13.837 13.112-11.68s6.936 10.757 7.035 23.153c.098 12.396-6.653 24.904-6.653 24.904l-39.191-38.937-37.495 38.69s-7.684-11.61-7.65-25.002c.035-13.393 7.008-24.966 7.008-24.966l12.75 12.488 14.996-12.609-27.746-25.96z"
              fillRule="evenodd"
            />
          </svg>
          <p className="font-semibold text-xl max-xl:hidden text-[#030303]">
            Car<span className="text-[#e6d2f3]">N</span>
            <span className="text-[#030303]">Care</span>
          </p>
        </div>
      </Link>
      <div className="flex flex-col justify-center h-screen max-xl:-mt-20">
        <div className="p-1">
          <ul>
            <li className={`my-6 ${asPath === "/" && `active`}`}>
              <Link
                href="/"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg max-md:justify-center hover:bg-gray-200 hover:text-black"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 18 18"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="currentColor"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-421.000000, -2400.000000)"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M377.000123,2242.17179 C378.702123,2242.77601 380.054123,2244.29856 380.657123,2246.00218 L377.000123,2246.00218 L377.000123,2242.17179 Z M377.000123,2248.00291 L383.000123,2248.00291 C383.000123,2243.5823 379.418123,2240 375.000123,2240 L375.000123,2246.00218 C375.000123,2247.10658 375.895123,2248.00291 377.000123,2248.00291 L377.000123,2248.00291 Z M371.776123,2255.88577 C369.444123,2255.43261 367.573123,2253.56093 367.119123,2251.22708 C366.360123,2247.31466 369.373123,2244.74673 371.000123,2244.17152 L371.000123,2248.00291 C371.000123,2250.20871 372.794123,2252.00436 375.000123,2252.00436 L378.657123,2252.00436 C377.803123,2254.07612 375.241123,2256.55902 371.776123,2255.88577 L371.776123,2255.88577 Z M373.000123,2248.00291 L373.000123,2242.00073 C368.057123,2242.00073 364.161123,2246.48536 365.156123,2251.60922 C365.762123,2254.72935 368.276123,2257.24327 371.395123,2257.84949 C376.749123,2258.89087 381.000123,2254.34021 381.000123,2250.00364 L375.000123,2250.00364 C373.895123,2250.00364 373.000123,2249.10731 373.000123,2248.00291 L373.000123,2248.00291 Z"
                          id="chart-[#1293]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="max-md:hidden">Dashboard</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/orders" || asPath.includes("orders")) && `active`
              }`}
            >
              <Link
                href="/orders"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 490 490"
                >
                  <g id="line_13_">
                    <path
                      d="M474.688,22.969H15.313C6.891,22.969,0,29.859,0,38.281v327.948c0,8.422,6.891,15.313,15.313,15.313h214.375v54.865
		H126.328v30.625h237.344v-30.625H260.313v-54.865h214.375c8.422,0,15.313-6.891,15.313-15.313V38.281
		C490,29.859,483.109,22.969,474.688,22.969z M459.375,350.917H30.625V53.594h428.75V350.917z"
                    />
                    <ellipse cx="212.354" cy="281" rx="25.051" ry="24.745" />
                    <ellipse cx="296.756" cy="281" rx="25.051" ry="24.745" />
                    <polygon
                      points="182.877,148.562 161.838,148.562 187.792,246.102 321.654,246.102 347.609,148.562 198.741,148.562 185.45,98.674 
		142.391,98.674 142.391,113.986 173.674,113.986 	"
                    />
                  </g>
                </svg>
                <span className="max-md:hidden">Order</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/cars" || asPath.includes("cars")) && `active`
              }`}
            >
              <Link
                href="/cars"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.77988 6.77277C6.88549 6.32018 7.28898 6 7.75372 6H16.2463C16.711 6 17.1145 6.32018 17.2201 6.77277L17.7398 9H17H7H6.26019L6.77988 6.77277ZM2 11H2.99963C2.37194 11.8357 2 12.8744 2 14V15C2 16.3062 2.83481 17.4175 4 17.8293V20C4 20.5523 4.44772 21 5 21H6C6.55228 21 7 20.5523 7 20V18H17V20C17 20.5523 17.4477 21 18 21H19C19.5523 21 20 20.5523 20 20V17.8293C21.1652 17.4175 22 16.3062 22 15V14C22 12.8744 21.6281 11.8357 21.0004 11H22C22.5523 11 23 10.5523 23 10C23 9.44772 22.5523 9 22 9H21C20.48 9 20.0527 9.39689 20.0045 9.90427L19.9738 9.77277L19.1678 6.31831C18.851 4.96054 17.6405 4 16.2463 4H7.75372C6.35949 4 5.14901 4.96054 4.8322 6.31831L4.02616 9.77277L3.99548 9.90426C3.94729 9.39689 3.51999 9 3 9H2C1.44772 9 1 9.44772 1 10C1 10.5523 1.44772 11 2 11ZM7 11C5.34315 11 4 12.3431 4 14V15C4 15.5523 4.44772 16 5 16H6H18H19C19.5523 16 20 15.5523 20 15V14C20 12.3431 18.6569 11 17 11H7ZM6 13.5C6 12.6716 6.67157 12 7.5 12C8.32843 12 9 12.6716 9 13.5C9 14.3284 8.32843 15 7.5 15C6.67157 15 6 14.3284 6 13.5ZM16.5 12C15.6716 12 15 12.6716 15 13.5C15 14.3284 15.6716 15 16.5 15C17.3284 15 18 14.3284 18 13.5C18 12.6716 17.3284 12 16.5 12Z"
                  />
                </svg>
                <span className="max-md:hidden">Cars</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/brands" || asPath.includes("brands")) && `active`
              }`}
            >
              <Link
                href="/brands"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 1200 1200"
                  enableBackground="new 0 0 1200 1200"
                  fill="currentColor"
                >
                  <path
                    id="path23160"
                    d="M0,467.478V176.805c3.479-45.64,36.064-76.909,77.47-77.47h290.673c38.559,0.646,74.477,14.596,105.962,33.613l455.536,500.354c27.468,35.271,28.876,79.164,0,108.844l-336.771,335.491c-34.029,29.361-81.72,32.02-108.842,0L55.062,600.009C24.908,562.69,0.447,513.568,0,467.478z M146.938,352.233c32.17,29.66,78.342,26.916,105.961,0c29.526-31.898,27.06-78.551,0-105.961c-31.94-29.075-78.454-26.768-105.961,0C117.739,280.374,118.836,322.978,146.938,352.233z M506.438,100.615h111.403c46.704,2.88,101.974,21.285,131.893,55.062L1178.7,634.582c28.985,33.471,27.808,81.543,0,110.123l-335.491,335.492c-46.495,26.355-89.107,24.518-117.806-8.965l329.088-329.089c29.633-32.787,26.469-80.075,0-108.843L670.618,203.787C625.179,147.074,527.354,103.175,506.438,100.615z"
                  />
                </svg>
                <span className="max-md:hidden">Brands</span>
              </Link>
            </li>
            <li className={`my-6 ${asPath === "/types" && `active`}`}>
              <Link
                href="/types"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  fill="currentColor"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                  <path d="M4 22h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2zm2-10h6v2H6v-2zm0 4h6v2H6v-2z" />
                </svg>

                <span className="max-md:hidden">Types</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/banks" || asPath.includes("banks")) && `active`
              }`}
            >
              <Link
                href="/banks"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 179.006 179.006"
                >
                  <g>
                    <g>
                      <path
                        style={{ fill: "currentColor" }}
                        d="M0,35.123c0,36.255,0,72.509,0,108.764c59.669,54.37,119.337-54.382,179.006,0
        c0-36.255,0-72.509,0-108.764C119.337-19.259,59.669,89.505,0,35.123z M89.503,129.71c-22.215,10.991-40.193-2.96-40.193-25.58
        c0-21.791,17.996-43.845,40.193-54.824c22.203-10.985,40.193,2.96,40.193,25.58C129.696,96.666,111.718,118.719,89.503,129.71z"
                      />
                      <path
                        style={{ fill: "currentColor" }}
                        d="M102.218,83.151c-1.933-0.501-5.603-0.322-11.021,0.632c0-5.68,0-11.355,0-17.029
        c3.216-1.349,5.561-1.169,7.035,0.543c0.794,0.931,1.271,2.25,1.426,3.956c2.041-0.895,4.087-1.766,6.122-2.608
        c-0.125-3.902-1.414-6.564-3.896-7.9c-2.482-1.349-6.056-1.122-10.687,0.656c0-1.528,0-3.055,0-4.583
        c-1.116,0.501-2.214,1.008-3.33,1.51c0,1.551,0,3.103,0,4.648c-4.684,2.184-8.33,5.251-10.931,9.207
        c-2.602,3.956-3.89,7.673-3.89,11.218c0,3.962,1.199,6.581,3.61,7.787c2.411,1.211,6.152,1.158,11.212-0.197
        c0,6.355,0,12.709,0,19.064c-3.938,1.468-6.641,1.193-8.091-0.806c-0.835-1.098-1.337-3.216-1.516-6.331
        c-2.071,0.889-4.123,1.766-6.188,2.602c0,4.016,0.656,6.928,1.987,8.736c2.423,3.359,7.035,3.777,13.807,1.122
        c0,2.261,0,4.523,0,6.784c1.116-0.501,2.214-1.008,3.33-1.51c0-2.261,0-4.523,0-6.784c4.219-2.387,7.447-4.791,9.684-7.196
        c4.04-4.362,6.05-9.565,6.05-15.77C106.932,86.617,105.363,83.992,102.218,83.151z M87.886,84.636
        c-2.613,0.674-4.684,0.698-6.223,0.084c-1.545-0.621-2.315-2.1-2.315-4.404c0-1.915,0.65-4.022,1.951-6.349
        c1.319-2.327,3.503-4.242,6.587-5.764C87.886,73.675,87.886,79.159,87.886,84.636z M99.45,100.646
        c-1.516,3.383-4.266,6.074-8.252,8.079c0-6.134,0-12.262,0-18.396c2.906-0.537,4.988-0.627,6.223-0.292
        c2.136,0.567,3.222,2.315,3.222,5.233C100.643,97.095,100.243,98.903,99.45,100.646z"
                      />
                    </g>
                  </g>
                </svg>

                <span className="max-md:hidden">Banks</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/spareparts" || asPath.includes("spareparts")) &&
                `active`
              }`}
            >
              <Link
                href="/spareparts"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512.002 512.002"
                >
                  <g>
                    <g>
                      <path
                        d="M512,241.759c0-6.773-5.491-12.265-12.264-12.265h-33.798c-6.773,0-12.265,5.491-12.265,12.265v15.183l-2.525,2.664
			l-18.51-99.233c-1.208-6.479-6.863-11.175-13.452-11.175H224.983l12.715,27.369h40.115c-1.84,2.984-1.648,5.463-1.648,7.588
			c0,6.107,4.95,11.057,11.057,11.057h35.305c6.107,0,11.056-4.95,11.056-11.057c0-2.052,0.208-4.576-1.648-7.588h75.884
			l17.283,92.655h-20.211c-1.656-23.473-21.269-42.4-45.156-42.4s-43.499,18.926-45.155,42.4c-104.544,0.118-129.936,0-129.936,0
			l4.366-23.408L172,249.479c0,8.674,0,67.324,0,75.724c5.158-5.325,12.377-8.64,20.374-8.64c15.807,0,28.376,12.865,28.376,28.393
			c0,15.681-12.704,28.393-28.376,28.393c-7.996,0-15.216-3.315-20.374-8.64v106.731c5.682,4.95,13.104,7.955,21.232,7.955
			c17.864,0,32.346-14.482,32.346-32.346v-29.031h29.226v10.964c0,6.125,4.965,11.09,11.09,11.09h77.958
			c6.124,0,11.09-4.965,11.09-11.09v-10.964h29.226v29.031c0,17.864,14.482,32.346,32.346,32.346
			c17.864,0,32.346-14.482,32.346-32.346v-29.031h6.303c11.969,0,21.672-9.703,21.672-21.673v-69.55
			c0-17.336-7.629-32.881-19.699-43.494l12.606-13.292h29.995c6.773,0,12.264-5.491,12.264-12.265v-15.987H512z M336.78,395.292
			h-63.817c-5.542,0-10.035-4.492-10.035-10.035c0-5.542,4.492-10.035,10.035-10.035h63.817c5.542,0,10.035,4.492,10.035,10.035
			C346.815,390.8,342.323,395.292,336.78,395.292z M353.827,355.952h-97.911c-5.542,0-10.035-4.492-10.035-10.035
			c0-5.542,4.492-10.035,10.035-10.035h97.911c5.542,0,10.035,4.492,10.035,10.035C363.862,351.46,359.369,355.952,353.827,355.952z
			 M337.516,269.221c1.568-10.871,10.919-19.592,22.217-19.592c11.299,0,20.65,8.72,22.218,19.592H337.516z M417.372,373.349
			c-15.672,0-28.376-12.712-28.376-28.393c0-15.54,12.584-28.393,28.376-28.393c15.672,0,28.376,12.712,28.376,28.393
			C445.747,360.524,433.134,373.349,417.372,373.349z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M151.523,253.889l-9.378,2.02c-10.245,2.209-20.736,0.062-29.239-5.773c-3.183,1.588-6.703,2.421-10.268,2.421
			c-8.147,0-15.762-4.367-19.875-11.396l-35.311-60.353c0,0,0.009,297.07,0.009,298.987c0,13.022,10.555,23.577,23.577,23.577
			c13.022,0,23.577-10.555,23.577-23.577V291.341h10.18v188.453c0,13.022,10.555,23.577,23.577,23.577
			c13.022,0,23.577-10.555,23.577-23.577C151.95,479.796,151.523,264.459,151.523,253.889z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M228.73,197.721c-0.526-1.134-30.225-64.724-30.225-64.724c-8.599-18.188-27.154-29.941-47.273-29.941H46.859
			c-25.509,0-46.729,20.753-46.858,46.263v144.342c-0.055,10.851,8.335,19.691,19.186,19.746c0.033,0,0.067,0,0.1,0
			c10.804,0,20.074-8.731,20.128-19.549V149.516v-0.002c0.011-2.148,2.001-3.883,4.151-3.877c2.148,0.006,3.887,1.75,3.887,3.899
			v6.591h0.001c3.927-6.209,4.514-5.613,46.619-30.247c10.971-6.419,25.083-2.714,31.494,8.245l1.74,2.975
			c11.62-6.798,25.377-3.895,32.774,8.748c7.103,12.141,2.532,3.165,21.357,42.986l-51.362,11.067
			c-10.608,2.286-17.353,12.737-15.069,23.345c2.286,10.608,12.738,17.353,23.345,15.069l75.568-16.283
			C224.653,219.719,231.71,208.811,228.73,197.721z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <circle cx="99.7" cy="49.351" r="40.72" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M96.591,217.527l-15.598-26.661c-6.425-10.982-2.738-25.069,8.245-31.494l23.634-13.828l-1.74-2.975
			c-1.756-3.003-5.614-4.01-8.614-2.254l-38.803,22.702c-3.001,1.756-4.01,5.613-2.254,8.614l35.739,61.085
			c0.728,1.245,1.819,2.146,3.058,2.65c-1.243-2.602-2.212-5.386-2.846-8.33C96.722,223.84,96.463,220.65,96.591,217.527z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M145.1,153.36c-1.755-3-5.612-4.012-8.614-2.254l-38.803,22.702c-3.001,1.756-4.01,5.613-2.254,8.614l8.437,14.42
			c5.255-7.168,13.047-12.519,22.419-14.539l31.746-6.84L145.1,153.36z"
                      />
                    </g>
                  </g>
                </svg>
                <span className="max-md:hidden">Spareparts</span>
              </Link>
            </li>
            <li
              className={`my-6 ${
                (asPath === "/transactions" ||
                  asPath.includes("transactions")) &&
                `active`
              }`}
            >
              <Link
                href="/transactions"
                className="flex items-center gap-3 p-2 my-1 text-sm rounded-lg hover:bg-gray-200 hover:text-black max-md:justify-center"
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 491.521 491.521"
                >
                  <g>
                    <g>
                      <path
                        d="M482.554,275.355H381.932c-20.944,0-37.922,16.978-37.922,37.922c0,20.944,16.978,37.922,37.922,37.922h100.622
			c2.64,0,4.78-2.14,4.78-4.78v-66.283C487.333,277.495,485.193,275.355,482.554,275.355z M384.138,331.248
			c-9.926,0-17.971-8.046-17.971-17.971s8.046-17.97,17.971-17.97s17.971,8.046,17.971,17.97
			C402.109,323.203,394.063,331.248,384.138,331.248z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M381.934,259.771h100.378v-97.426c0-20.788-16.853-37.641-37.641-37.641h-9.292H58.751h-0.006
			c-30.131,0-54.558-24.428-54.558-54.559v383.733c0,20.791,16.852,37.643,37.641,37.643h402.842
			c20.788,0,37.641-16.852,37.641-37.643v-87.094H381.934c-29.504,0-53.51-24.002-53.51-53.507S352.43,259.771,381.934,259.771z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M411.935,0H72.847C42.716,0,18.289,24.426,18.289,54.56c0,30.132,24.426,54.559,54.558,54.559h376.633V37.546
			C449.481,16.809,432.671,0,411.935,0z M370.599,62.351H83.662c-4.304,0-7.793-3.486-7.793-7.793s3.489-7.793,7.793-7.793h286.936
			c4.304,0,7.793,3.486,7.793,7.793S374.903,62.351,370.599,62.351z"
                      />
                    </g>
                  </g>
                </svg>

                <span className="max-md:hidden">Transactions</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
