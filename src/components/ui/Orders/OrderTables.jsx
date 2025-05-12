import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../utils/Loader";
import pencilWrite from "../../../assets/icons/pencilWrite.png";
import vendorBin from "../../../assets/icons/vendorBin.png";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Checkbox } from "primereact/checkbox";

const OrderTables = ({
  datas,
  setSearchQuery,
  isLoading,
  sortBy,
  setLimit,
  setSortBy,
  setSort,
  searchquery,
  deleteAttribute,
  searchPlaceholder,
  tabs,
  activeTab,
  setActiveTab
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const mockData = [
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Cash on Delivery',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: [
        { 
          id: '01', 
          name: 'Folded All 10D-108D-1P-104E 1 Peg Cap Super Deluxe Beer Dispenser', 
          quantity: '10 Pcs', 
          supplier: 'MH Enterprises',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '02', 
          name: 'Aqua 9GU3734GE 81SP Glass Wardrober, 3 Sections, Black [Gator] Max Cut', 
          quantity: '10 Pcs', 
          supplier: 'SafCo',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '03', 
          name: 'Bar Maid BRS-1722 Glass Washer Replacement Brush Set — (4) Ø: BRS-937 & (1) 731Z', 
          quantity: '10 Pcs', 
          supplier: 'Marioo',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '04', 
          name: 'Heavy Duty Module Trolley With Cover L 98 x W 89 x H 95 cm, Durable, Easy Movement', 
          quantity: '10 Pcs', 
          supplier: 'Ack',
          amount: '94125.00',
          status: 'New Order',
          image: ''
        }
      ]
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Credit Card',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: [
        { 
          id: '01', 
          name: 'Folded All 10D-108D-1P-104E 1 Peg Cap Super Deluxe Beer Dispenser', 
          quantity: '10 Pcs', 
          supplier: 'MH Enterprises',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '02', 
          name: 'Aqua 9GU3734GE 81SP Glass Wardrober, 3 Sections, Black [Gator] Max Cut', 
          quantity: '10 Pcs', 
          supplier: 'SafCo',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '03', 
          name: 'Bar Maid BRS-1722 Glass Washer Replacement Brush Set — (4) Ø: BRS-937 & (1) 731Z', 
          quantity: '10 Pcs', 
          supplier: 'Marioo',
          amount: '104152.00',
          status: 'New Order',
          image: ''
        },
        { 
          id: '04', 
          name: 'Heavy Duty Module Trolley With Cover L 98 x W 89 x H 95 cm, Durable, Easy Movement', 
          quantity: '10 Pcs', 
          supplier: 'Ack',
          amount: '94125.00',
          status: 'New Order',
          image: ''
        }
      ]
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Tabby',
      products: '4 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: []
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Tamara',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: []
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Cheque',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: []
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Bank Transfer',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: []
    },
    {
      id: 'ORDER123',
      orderDate: '26/01/2023',
      orderTime: '04:00PM',
      orderDetails: {
        customer: 'Graicy Silva',
        email: 'silvajgraicy@gmail.com',
        phone: '00789809'
      },
      status: 'New Order',
      amount: '149.00',
      paymentMode: 'Cash on Delivery',
      products: '1 Products',
      address: {
        company: 'Horecarstore',
        location: 'Dubai, United Arab Emirates'
      },
      children: []
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg min-h-[40vh] border border-gray-200 w-full overflow-hidden">
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[100px]">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 m-2">
              {
                tabs.map((item)=>{
                  return (
                  <span onClick={()=>setActiveTab(item)}  className={`text-[12px] leading-[17.64px] text-white ${activeTab===item?'bg-[#26683A]':'bg-[#64748B]'}  px-[7px] font-sm rounded-[5px] py-[8px] flex items-center gap-2 cursor-pointer whitespace-nowrap hover:text-white group hover:bg-[#26683A]`}>
                    <label  className="flex items-center gap-1 cursor-pointer">
                    
                      <span>{item}</span>
                    </label>
                  </span>
    )
                })
              }
              
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#EBEBEB] text-[#616161]">
                  <tr>
                    <th className="w-10 border border-gray-200 capitalize"></th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Order Detail</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Customer Details</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Status</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Amount</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Payment Mode</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Products</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Address</th>
                    <th className="text-left p-2 border border-gray-200 capitalize">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((item, index) => (
                    <React.Fragment key={`${item.id}-${index}`}>
                      {/* Parent Row with striping */}
                      <tr className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-2 text-center border border-gray-200 capitalize">
                          <button onClick={() => toggleExpand(item.id + index)}>
                            {expandedRows.includes(item.id + index) ? <ChevronDown /> : <ChevronRight />}
                          </button>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <div>
                            <div className="font-medium text-indigo-600">{item.id}</div>
                            <div className="text-xs text-gray-500">{item.orderDate} | {item.orderTime}</div>
                          </div>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <div>
                            <div className="font-medium">{item.orderDetails.customer}</div>
                            <div className="text-xs text-gray-500">{item.orderDetails.email} | {item.orderDetails.phone}</div>
                          </div>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded whitespace-nowrap">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <div className="font-medium">${item.amount}</div>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">{item.paymentMode}</td>
                        <td className="p-2 border border-gray-200 capitalize">{item.products}</td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <div>
                            <div className="font-medium">{item.address.company}</div>
                            <div className="text-xs text-gray-500">{item.address.location}</div>
                          </div>
                        </td>
                        <td className="p-2 border border-gray-200 capitalize">
                          <div className="flex items-center">
                            <div className="relative inline-block">
                              <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Select Status</option>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Child Rows */}
                      {expandedRows.includes(item.id + index) && item.children.length > 0 && (
                        <tr className="bg-[white]">
                          <td className="p-2 border border-gray-200 capitalize"></td>
                          <td colSpan="8">
                            <table className="w-full text-sm m-2 rounded-lg overflow-hidden">
                              <thead className="bg-[#F4F2F2] text-[#616161]">
                                <tr>
                                  <th className="p-2 w-10 border border-gray-200 capitalize"><Checkbox /></th>
                                  <th className="p-2 w-16 border border-gray-200 capitalize">S No</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Product Image</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Product Title</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Quantity</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Supplier</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Amount</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Status</th>
                                  <th className="text-left p-2 border border-gray-200 capitalize">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.children.map((child, childIndex) => (
                                  <tr key={child.id} className={`border-b ${childIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="p-2 border border-gray-200 capitalize"><Checkbox /></td>
                                    <td className="p-2 border border-gray-200 text-center">{child.id}</td>
                                    <td className="p-2 border border-gray-200 capitalize">
                                      <div className="w-8 h-8 border rounded bg-gray-100"></div>
                                    </td>
                                    <td className="p-2 border border-gray-200 capitalize">
                                      <div className="text-xs">{child.name}</div>
                                    </td>
                                    <td className="p-2 border border-gray-200 capitalize">{child.quantity}</td>
                                    <td className="p-2 border border-gray-200 capitalize">{child.supplier}</td>
                                    <td className="p-2 border border-gray-200 capitalize">${child.amount}</td>
                                    <td className="p-2 border border-gray-200 capitalize">
                                      <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded whitespace-nowrap">
                                        {child.status}
                                      </span>
                                    </td>
                                    <td className="p-2 border border-gray-200 capitalize">
                                      <div className="relative inline-block">
                                        <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                          <option>Select Status</option>
                                          <option>Pending</option>
                                          <option>Confirmed</option>
                                          <option>Delivered</option>
                                          <option>Cancelled</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                          <ChevronDown size={16} />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTables;