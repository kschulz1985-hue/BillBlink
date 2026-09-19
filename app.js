// Add a bill
async function addBill() {
  const text = document.getElementById("billInput").value.trim();
  if (!text) return alert("Enter a bill first!");

  const res = await fetch("/add-bill", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  loadBills();
}

// Load all bills
async function loadBills() {
  const res = await fetch("/bills");
  const bills = await res.json();

  const list = document.getElementById("billList");
  list.innerHTML = "";

  bills.forEach(bill => {
    const li = document.createElement("li");
    li.textContent = bill.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteBill(bill.id);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Delete a bill
async function deleteBill(id) {
  await fetch(`/bill/${id}`, { method: "DELETE" });
  loadBills();
}

// Load bills on page load
loadBills();
