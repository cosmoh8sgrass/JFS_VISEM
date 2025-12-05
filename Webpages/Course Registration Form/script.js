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
    messages.forEach((entry) => {
      if (entry instanceof HTMLElement) {
        messageBox.appendChild(entry);
      } else {
        const line = document.createElement("div");
        line.textContent = entry;
        messageBox.appendChild(line);
      }
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
      .filter(Boolean);

    const summaryTitle = document.createElement("div");
    summaryTitle.className = "message-title";
    summaryTitle.textContent = "Registration Summary";

    const makeRow = (label, value) => {
      const row = document.createElement("div");
      row.className = "message-row";

      const key = document.createElement("span");
      key.className = "message-label";
      key.textContent = `${label}:`;

      const val = document.createElement("span");
      val.className = "message-value";
      if (value instanceof HTMLElement) {
        val.appendChild(value);
      } else {
        val.textContent = value;
      }

      row.append(key, val);
      return row;
    };

    const subjectListEl = document.createElement("ol");
    subjectListEl.className = "message-list";
    subjectsList.forEach((subject) => {
      const item = document.createElement("li");
      item.textContent = subject;
      subjectListEl.appendChild(item);
    });

    const subjectsLabel = document.createElement("div");
    subjectsLabel.className = "message-label subjects-label";
    subjectsLabel.textContent = "Selected Subjects:";

    const message = [
      summaryTitle,
      makeRow("Student Name", studentName),
      subjectsLabel,
      subjectListEl,
      makeRow("Total Fee", `$${totalAmount.textContent}`),
    ];

    setMessage(message, "success");
  });
});
