// Autenticación
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('admin-content').style.display = 'block';
      loadData();
    })
    .catch(error => alert('Error: ' + error.message));
});

// Cargar datos
function loadData() {
  // Cargar miembros del equipo
  db.collection('teamMembers').get().then(snapshot => {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    
    snapshot.forEach(doc => {
      const member = doc.data();
      teamList.innerHTML += `
        <div class="team-item" data-id="${doc.id}">
          <img src="${member.image}" width="50">
          <span>${member.name} - ${member.position}</span>
          <button class="edit-btn">Editar</button>
          <button class="delete-btn">Eliminar</button>
        </div>
      `;
    });
  });

  // Cargar planes
  db.collection('plans').get().then(snapshot => {
    const plansList = document.getElementById('plans-list');
    plansList.innerHTML = '';
    
    snapshot.forEach(doc => {
      const plan = doc.data();
      plansList.innerHTML += `
        <div class="plan-item" data-id="${doc.id}">
          <h4>${plan.title} - $${plan.price}</h4>
          <button class="edit-btn">Editar</button>
          <button class="delete-btn">Eliminar</button>
        </div>
      `;
    });
  });
}