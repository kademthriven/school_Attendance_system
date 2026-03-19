const searchBtn = document.getElementById('searchBtn');
const reportBtn = document.getElementById('reportBtn');
const attendanceArea = document.getElementById('attendanceArea');

searchBtn.addEventListener('click', async () => {
  const date = document.getElementById('dateInput').value;
  // ✅ Validation
  if (!date) {
    alert("Please select a date");
    return;
  }

  const res = await fetch(`http://localhost:3000/api/attendance/${date}`);
  const data = await res.json();

  attendanceArea.innerHTML = '';

  // ✅ If attendance already exists
  if (data.exists) {
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    table.innerHTML = `
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.records.map(r => `
          <tr>
            <td>${r.name}</td>
            <td>
              ${r.status === 'present'
                ? '<span class="badge bg-success">Present</span>'
                : '<span class="badge bg-danger">Absent</span>'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    attendanceArea.appendChild(table);

  } else {
    // 📝 Show marking form
    const table = document.createElement('table');
    table.className = 'table table-bordered';

    table.innerHTML = `
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Mark Attendance</th>
        </tr>
      </thead>
      <tbody>
        ${data.students.map(s => `
          <tr>
            <td>${s.name}</td>
            <td>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="student-${s.id}" value="present">
                <label class="form-check-label">Present</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="student-${s.id}" value="absent">
                <label class="form-check-label">Absent</label>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    attendanceArea.appendChild(table);

    // ✅ Submit button
    const btn = document.createElement('button');
    btn.className = 'btn btn-warning mt-3';
    btn.textContent = 'Mark Attendance';

    btn.onclick = async () => {
      let missing = [];

      const records = data.students.map(s => {
        const selected = document.querySelector(`input[name="student-${s.id}"]:checked`);

        if (!selected) {
          missing.push(s.name);
        }

        return {
          studentId: s.id,
          status: selected ? selected.value : null
        };
      });

      if (missing.length > 0) {
        alert(`You missed marking attendance for: ${missing.join(", ")}`);
        return;
      }

      await fetch(`http://localhost:3000/api/attendance/${date}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records })
      });

      searchBtn.click(); // reload
    };

    attendanceArea.appendChild(btn);
  }
});

// 📊 Attendance Report
reportBtn.addEventListener('click', async () => {
  const res = await fetch(`http://localhost:3000/api/attendance`);
  const data = await res.json();

  attendanceArea.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'table table-bordered table-striped';

  table.innerHTML = `
    <thead class="table-light">
      <tr>
        <th>Name</th>
        <th>Sessions Attended</th>
        <th>Total Sessions</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(r => `
        <tr>
          <td>${r.name}</td>
          <td>${r.attended}</td>
          <td>${r.total}</td>
          <td>
            ${r.percentage >= 75
              ? `<span class="badge bg-success">${r.percentage}%</span>`
              : `<span class="badge bg-danger">${r.percentage}%</span>`}
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

  attendanceArea.appendChild(table);
});