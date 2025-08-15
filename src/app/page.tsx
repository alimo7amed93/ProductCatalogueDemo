import { db } from "../db/client";
import { productSpecification, productOffering, productOfferingPrice } from "../db/schema";
import TabsView from "./components/TabsView";

export default async function Page() {
  const [specs, offerings, prices] = await Promise.all([
    db.select().from(productSpecification),
    db.select().from(productOffering),
    db.select().from(productOfferingPrice),
  ]);

  return <TabsView specs={specs} offerings={offerings} prices={prices} />;
}
