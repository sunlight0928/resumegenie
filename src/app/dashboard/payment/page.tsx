"use client";

import React, { useState, ChangeEvent } from "react";
import HeadMain from "@/app/components/HeadMain"; // Import the HeadMain component
import BreadcrumbDashboard from "../components/layouts/BreadcrumbDashboard"; // Import the BreadcrumbDashboard component
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type Props = {};

const PaymentPage: React.FC<Props> = (props) => {
  const [months, setMonths] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const handleMonthsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1 || value > 12) {
      setError("Please enter a value between 1 and 12.");
    } else {
      setError("");
      setMonths(value);
    }
  };

  const handleApprove = async (data: any, actions: any): Promise<void> => {
    console.log("Payment approved:", data);
    await actions.order.capture(); // Capture the funds from the transaction
  };

  const totalAmount = (months: number): string => {
    const pricePerMonth = 99; // Example price per month
    return (months * pricePerMonth).toFixed(2);
  };

  return (
    <>
      <HeadMain
        title="Payment Management • ResumeGenie"
        description="Payment Management • ResumeGenie"
      />
      <BreadcrumbDashboard title="" />
      <div className="bg-white rounded-xl shadow-lg p-16 max-w-lg mx-auto mt-11">
        <h2 className="text-3xl font-bold text-[#0070BA] mb-10 text-center relative">
          Complete Your Payment
          <span className="absolute inset-0 border-b-4 border-[#0070BA] transform translate-y-1/2"></span>
        </h2>
        <div className="flex flex-col space-y-12">
          <div className="input-group">
            <label
              htmlFor="months"
              className="block text-xl font-medium text-gray-700 mt-2"
            >
              Number of Months (1-12):
            </label>
            <input
              type="number"
              id="months"
              value={months}
              onChange={handleMonthsChange}
              min="1"
              max="12"
              className="mt-1 block w-full p-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#7059F3] transition"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="total text-3xl font-semibold">
            Total Amount: <strong>${totalAmount(months)}</strong>
          </div>
          <PayPalScriptProvider
            options={{
              clientId:
                "AcAKH5oAWNi-LR3C1beynnl9iqECvGc3Pjw8B2ow3FE08WghGr6_Y23RgxV5UJoxjUxdRg5pcqOYgjTn", // Replace with your PayPal client ID
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: totalAmount(months),
                      },
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
              onError={(err) => {
                console.error("PayPal Checkout onError", err);
              }}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "pay",
                height: 55, // Increase button height
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <style jsx>{`
        body {
          background-color: #f7f7f7;
          font-family: "Arial", sans-serif;
        }
      `}</style>
    </>
  );
};

export default PaymentPage;
