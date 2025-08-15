import { db } from "../../db/client";
import { productOffering } from "../../db/schema";

export default async function ProductOffering() {
  const offerings = await db.select().from(productOffering);

  if (!offerings.length) return <p>No product offerings found.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Product Offerings</h2>
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
          {offerings.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.href}</td>
              <td className="border p-2">{o.name}</td>
              <td className="border p-2">{o.description}</td>
              <td className="border p-2">{o.isBundle ? "Yes" : "No"}</td>
              <td className="border p-2">{o.isSellable ? "Yes" : "No"}</td>
              <td className="border p-2">{o.lifecycleStatus}</td>
              <td className="border p-2">{o.lastUpdate ? new Date(o.lastUpdate).toLocaleString() : ""}</td>
              <td className="border p-2">{o.productSpecificationId}</td>
              <td className="border p-2">{o.validForStart ? new Date(o.validForStart).toLocaleDateString() : ""}</td>
              <td className="border p-2">{o.validForEnd ? new Date(o.validForEnd).toLocaleDateString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
