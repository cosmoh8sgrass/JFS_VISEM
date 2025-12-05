// Calculate and display the total fee as checkboxes change.
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".subjects input[type='checkbox']");
  const totalAmount = document.getElementById("totalAmount");
  const form = document.querySelector(".registration-form");
  const nameInput = document.getElementById("studentName");
  const messageBox = document.getElementById("submissionMessage");

  const setMessage = (lines, variant) => {
    if (!messageBox) return;
    messageBox.innerHTML = "";
    const messages = Array.isArray(lines) ? lines : [lines];
    messages.forEach((text) => {
      const line = document.createElement("div");
      line.textContent = text;
      messageBox.appendChild(line);
    });
    messageBox.classList.remove("error", "success");
    if (variant) {
      messageBox.classList.add(variant);
    }
  };

  const updateTotal = () => {
    let total = 0;
    checkboxes.forEach((box) => {
      if (box.checked) {
        total += Number(box.dataset.price) || 0;
      }
    });
    totalAmount.textContent = total;
  };

  checkboxes.forEach((box) => box.addEventListener("change", updateTotal));
  updateTotal();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentName = nameInput.value.trim();
    if (!studentName) {
      setMessage("Please enter the student name.", "error");
      nameInput.focus();
      return;
    }

    const selected = [...checkboxes].filter((box) => box.checked);
    if (selected.length === 0) {
      setMessage("Please select at least one subject.", "error");
      return;
    }

    const subjectsList = selected
      .map((box) => {
        const label = form.querySelector(`label[for="${box.id}"]`);
        return label ? label.textContent : "";
      })
      .filter(Boolean)
      .join(", ");

    const message = [
      `Student Name: ${studentName}`,
      `Selected Subjects: ${subjectsList}`,
      `Total Fee: $${totalAmount.textContent}`,
    ];

    setMessage(message, "success");
  });
});
