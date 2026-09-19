export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GET /bills → list all bills
    if (url.pathname === "/bills" && request.method === "GET") {
      const list = await env.BILLS.list();
      const results = [];

      for (const key of list.keys) {
        const value = await env.BILLS.get(key.name);
        results.push({ id: key.name, text: value });
      }

      return Response.json(results);
    }

    // POST /add-bill → add a bill
    if (url.pathname === "/add-bill" && request.method === "POST") {
      const body = await request.json();
      const id = crypto.randomUUID();

      await env.BILLS.put(id, body.text);

      return Response.json({ success: true, id });
    }

    // DELETE /bill/:id → delete a bill
    if (url.pathname.startsWith("/bill/") && request.method === "DELETE") {
      const id = url.pathname.split("/")[2];
      await env.BILLS.delete(id);

      return Response.json({ success: true });
    }

    return new Response("BillBlink Worker is running!", { status: 200 });
  }
};
