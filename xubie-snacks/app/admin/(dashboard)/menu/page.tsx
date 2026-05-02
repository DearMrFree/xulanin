import { getOrders } from "@/lib/store";
import { XUBIE_DATA } from "@/lib/data";

export const dynamic = "force-dynamic";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default async function MenuPage() {
  const orders = await getOrders();

  const productStats: Record<
    string,
    { totalQuantity: number; totalRevenue: number; orderCount: number }
  > = {};

  XUBIE_DATA.products.forEach((p) => {
    productStats[p.name] = { totalQuantity: 0, totalRevenue: 0, orderCount: 0 };
  });

  orders
    .filter((o) => o.status !== "cancelled")
    .forEach((order) => {
      order.items.forEach((item) => {
        if (productStats[item.name]) {
          productStats[item.name].totalQuantity += item.quantity;
          productStats[item.name].totalRevenue += item.price * item.quantity;
          productStats[item.name].orderCount += 1;
        }
      });
    });

  const sortedProducts = [...XUBIE_DATA.products].sort(
    (a, b) =>
      (productStats[b.name]?.totalRevenue ?? 0) -
      (productStats[a.name]?.totalRevenue ?? 0)
  );

  const maxRevenue = Math.max(
    ...sortedProducts.map((p) => productStats[p.name]?.totalRevenue ?? 0),
    1
  );

  const PRODUCT_GRADIENTS = [
    "from-orange-400 to-amber-500",
    "from-amber-400 to-yellow-500",
    "from-rose-400 to-orange-500",
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Menu</h1>
        <p className="text-gray-500 text-sm mt-1">
          {XUBIE_DATA.products.length} products · Sales overview from all orders
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {sortedProducts.map((product, i) => {
          const stats = productStats[product.name] ?? {
            totalQuantity: 0,
            totalRevenue: 0,
            orderCount: 0,
          };
          const revenueShare =
            maxRevenue > 0
              ? Math.round((stats.totalRevenue / maxRevenue) * 100)
              : 0;
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div
                className={`bg-gradient-to-br ${PRODUCT_GRADIENTS[i % PRODUCT_GRADIENTS.length]} p-5 relative`}
              >
                {i === 0 && (
                  <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    #1 Seller
                  </span>
                )}
                <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
                  {product.tags?.[0] ?? "Signature"}
                </p>
                <h3 className="text-white font-black text-xl leading-tight">
                  {product.name}
                </h3>
                <p className="text-white/80 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-gray-900">
                      {stats.totalQuantity}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Units Sold</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-2xl font-black text-gray-900">
                      {stats.orderCount}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-orange-600">
                      {formatCurrency(stats.totalRevenue)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Revenue</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Revenue share</span>
                    <span>{revenueShare}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${PRODUCT_GRADIENTS[i % PRODUCT_GRADIENTS.length]} h-2 rounded-full transition-all`}
                      style={{ width: `${revenueShare}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Sizes & Prices
                  </p>
                  {product.sizes.map((size) => (
                    <div
                      key={size.name}
                      className="flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-xl"
                    >
                      <span className="text-sm text-gray-700 font-medium">
                        {size.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {size.serving}
                        </span>
                        <span className="font-bold text-gray-900 text-sm">
                          {formatCurrency(size.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Delivery Zones</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {XUBIE_DATA.deliveryZones.map((zone) => (
            <div
              key={zone.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div>
                <p className="font-semibold text-gray-800 text-sm">{zone.name}</p>
                <p className="text-xs text-gray-400">{zone.cities}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600 text-sm">
                  {formatCurrency(zone.fee)}
                </p>
                <p className="text-xs text-gray-400">delivery</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
