import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  const { children } = props;
  return (
    // <div className="flex flex-col min-h-screen">
    //   <div className="flex flex-grow">
    //     <Sidebar />
    //     <div className="ml-[16%]">
    //       <main className=''>
    //         {children}
    //       </main>
    //     </div>
    //   </div>
    // </div>
    <div className="flex min-h-screen bg-[#F5EFE7]">
      <Sidebar />
      <div className="ml-[15%] w-full">{children}</div>
    </div>
  );
}
