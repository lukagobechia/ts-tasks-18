const form = document.getElementById("todo-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const handleAdd = async () => {
const title = form.elements["todo-input"].value;
  console.log(title);
  if (!title) {
    return alert("Title is required");
  }
  try {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const data = await res.json();
      location.reload();
      console.log("Success:", data);
    } else {
      const errorData = await res.json();
      console.error("Error:", errorData.message);
      alert(`Failed to add todo: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the todo.");
  }
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      location.reload();
    } else {
      console.log("Failed to delete todo");
    }
  } catch (e) {
    console.log("Could not delete todo:", e);
  }
};
const handleCompleting = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: true }),
    });
    if (res.ok) {
      location.reload();
    } else {
      alert("Request failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
  }
};

// pagination
let { currentPage, totalPages } = window.paginationData;

const updatePaginationButtons = () => {
  document.getElementById("prevBtn").disabled = currentPage <= 1;
  document.getElementById("nextBtn").disabled = currentPage >= totalPages;
  document.getElementById(
    "pageInfo"
  ).innerText = `Page ${currentPage} of ${totalPages}`;
};

const loadPage = async (page) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos?page=${page}&take=10`);
    if (res.ok) {
      window.location.href = `/api/todos?page=${page}`;
    } else {
      alert("Failed to fetch expenses.");
    }
  } catch (error) {
    console.error("Error loading page:", error);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadPage(currentPage);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    loadPage(currentPage);
  }
};

updatePaginationButtons();