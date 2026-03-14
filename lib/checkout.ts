export async function checkout() {
  try {
    const res = await fetch("/api/checkout/vapor75", { method: "POST" });
    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error ?? "Checkout failed");
    }

    window.location.href = data.url;
  } catch (error) {
    console.error("Purchase failed", error);
  }
}
