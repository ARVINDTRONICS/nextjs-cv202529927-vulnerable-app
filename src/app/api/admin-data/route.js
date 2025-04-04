export async function GET() {
  try {
    const sensitiveData = {
      totalUsers: 5234,
      totalRevenue: 124578,
      newOrders: 342,
      salesData: [
        { month: "Jan", revenue: 15000 },
        { month: "Feb", revenue: 18500 },
        { month: "Mar", revenue: 22000 },
        { month: "Apr", revenue: 19800 },
        { month: "May", revenue: 25000 },
      ],
      recentOrders: [
        { id: "#8742", customer: "John Doe", amount: 450.25, status: "Completed" },
        { id: "#8741", customer: "Jane Smith", amount: 230.5, status: "Processing" },
        { id: "#8740", customer: "Mike Johnson", amount: 675.0, status: "Shipped" },
        { id: "#8739", customer: "Emily Brown", amount: 310.75, status: "Pending" },
      ],
      topProducts: [
        { name: "Laptop X1", sales: 1245, revenue: 624500 },
        { name: "Smartphone Pro", sales: 987, revenue: 493500 },
        { name: "Wireless Earbuds", sales: 756, revenue: 226800 },
      ],
    };

    return new Response(JSON.stringify({ data: sensitiveData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      },
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
