import { db } from "../../db/client";
import { productSpecification } from "../../db/schema";

export default async function ProductSpecification() {
  const specs = await db.select().from(productSpecification);

  if (!specs.length) return <p>No product specifications found.</p>;

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Product Specifications</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
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
          {specs.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.href}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.description}</td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">{p.version}</td>
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
