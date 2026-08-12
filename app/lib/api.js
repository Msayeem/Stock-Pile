const BASE = process.env.NEXT_PUBLIC_SERVER_URL;

// ─── Generic Fetch Helper ────────────────────────────────────────────────────

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.message || `Request failed: ${res.status}`);
  }
  return json;
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts() {
  const res = await request("/products");
  return res.data ?? [];
}

export async function getProduct(id) {
  const res = await request(`/products/${id}`);
  return res.data;
}

export async function getUserProducts(userId) {
  const res = await request(`/products/mine/${userId}`);
  return res.data ?? [];
}

export async function createProduct({ title, description, price, stock, userId, imageUrl }) {
  const res = await request("/products", {
    method: "POST",
    body: JSON.stringify({ title, description, price, stock, userId, imageUrl }),
  });
  return res.data;
}

export async function updateProduct(id, { userId, title, description, price, stock, imageUrl }) {
  const res = await request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ userId, title, description, price, stock, imageUrl }),
  });
  return res.data;
}

export async function deleteProduct(id, userId) {
  const res = await request(`/products/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ userId }),
  });
  return res;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function getUserOrders(userId) {
  const res = await request(`/orders/user/${userId}`);
  return res.data ?? [];
}

export async function createOrder({ userId, productId, quantity }) {
  const res = await request("/orders", {
    method: "POST",
    body: JSON.stringify({ userId, productId, quantity }),
  });
  return res.data;
}

export async function deleteOrder(id) {
  const res = await request(`/orders/${id}`, { method: "DELETE" });
  return res;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUsers() {
  const res = await request("/users");
  return res.data ?? [];
}

export async function getUser(id) {
  const res = await request(`/users/${id}`);
  return res.data;
}

export async function createUser({ name, email, password, role, avatar }) {
  const res = await request("/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role, avatar }),
  });
  return res.data;
}
