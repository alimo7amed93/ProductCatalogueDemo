"use client";

import { useState } from "react";

export default function TabsView({ specs, offerings, prices }) {
  const tabs = [
    { id: "specs", label: "Product Specifications" },
    { id: "offerings", label: "Product Offerings" },
    { id: "prices", label: "Product Offering Prices" },
  ];

  const [activeTab, setActiveTab] = useState("specs");
  const [search, setSearch] = useState("");

  const getFilteredData = (data) => {
    if (!search.trim()) return data;
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  return (
    <div className="p-6">
      {/* Tab Buttons */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 -mb-px font-medium border rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white text-black border-gray-300"
                : "text-gray-500 hover:bg-gray-300 hover:text-black border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "specs" && (
          <SpecsTable data={getFilteredData(specs)} />
        )}
        {activeTab === "offerings" && (
          <OfferingsTable data={getFilteredData(offerings)} />
        )}
        {activeTab === "prices" && (
          <PricesTable data={getFilteredData(prices)} />
        )}
      </div>
    </div>
  );
}

/* ---------- Table Components ---------- */
function SpecsTable({ data }) {
  if (!data.length) return <p>No product specifications found.</p>;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">Href</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Version</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Last Update</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.href}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">{p.version}</td>
              <td className="border p-2">{p.lifecycleStatus}</td>
              <td className="border p-2">
                {p.lastUpdate ? new Date(p.lastUpdate).toLocaleString() : ""}
              </td>
              <td className="border p-2">
                {p.validForStart ? new Date(p.validForStart).toLocaleDateString() : ""}
              </td>
              <td className="border p-2">
                {p.validForEnd ? new Date(p.validForEnd).toLocaleDateString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OfferingsTable({ data }) {
  if (!data.length) return <p>No product offerings found.</p>;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">Href</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Is Bundle</th>
            <th className="border p-2">Is Sellable</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Last Update</th>
            <th className="border p-2">Specification ID</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.href}</td>
              <td className="border p-2">{o.name}</td>
              <td className="border p-2">{o.description}</td>
              <td className="border p-2">{o.isBundle ? "Yes" : "No"}</td>
              <td className="border p-2">{o.isSellable ? "Yes" : "No"}</td>
              <td className="border p-2">{o.lifecycleStatus}</td>
              <td className="border p-2">
                {o.lastUpdate ? new Date(o.lastUpdate).toLocaleString() : ""}
              </td>
              <td className="border p-2">{o.productSpecificationId}</td>
              <td className="border p-2">
                {o.validForStart ? new Date(o.validForStart).toLocaleDateString() : ""}
              </td>
              <td className="border p-2">
                {o.validForEnd ? new Date(o.validForEnd).toLocaleDateString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricesTable({ data }) {
  if (!data.length) return <p>No product offering prices found.</p>;
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price Type</th>
            <th className="border p-2">Period Type</th>
            <th className="border p-2">Period Length</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Currency</th>
            <th className="border p-2">Duty Free</th>
            <th className="border p-2">Tax Included</th>
            <th className="border p-2">Percentage</th>
            <th className="border p-2">Tax Rate</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Last Update</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.priceType}</td>
              <td className="border p-2">{p.recurringChargePeriodType}</td>
              <td className="border p-2">{p.recurringChargePeriodLength}</td>
              <td className="border p-2">{p.unitOfMeasure}</td>
              <td className="border p-2">{p.currency}</td>
              <td className="border p-2">{p.dutyFreeAmount}</td>
              <td className="border p-2">{p.taxIncludedAmount}</td>
              <td className="border p-2">{p.percentage}</td>
              <td className="border p-2">{p.taxRate}</td>
              <td className="border p-2">{p.lifecycleStatus}</td>
              <td className="border p-2">
                {p.lastUpdate ? new Date(p.lastUpdate).toLocaleString() : ""}
              </td>
              <td className="border p-2">
                {p.validForStart ? new Date(p.validForStart).toLocaleDateString() : ""}
              </td>
              <td className="border p-2">
                {p.validForEnd ? new Date(p.validForEnd).toLocaleDateString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}