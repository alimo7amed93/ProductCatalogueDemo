import { db } from "../../db/client";
import { productOfferingPrice } from "../../db/schema";

export default async function ProductOfferingPrice() {
  const prices = await db.select().from(productOfferingPrice);

  if (!prices.length) return <p>No product offering prices found.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Product Offering Prices</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="border p-2">Href</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price Type</th>
            <th className="border p-2">Period Type</th>
            <th className="border p-2">Period Length</th>
            <th className="border p-2">UOM</th>
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
          {prices.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.href}</td>
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
              <td className="border p-2">{p.lastUpdate ? new Date(p.lastUpdate).toLocaleString() : ""}</td>
              <td className="border p-2">{p.validForStart ? new Date(p.validForStart).toLocaleDateString() : ""}</td>
              <td className="border p-2">{p.validForEnd ? new Date(p.validForEnd).toLocaleDateString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
