const app = document.querySelector('.js-app');
console.log(app);
router();
console.log(app);

const dashBoardButton = document.querySelector('.js-dashboard');
const profileButton = document.querySelector('.js-profile-button');
const homeButton = document.querySelector('.js-home');


export function renderDashboard() {
  app.innerHTML = `
  <section class="dashboard">
    <h1>
      My Dashboard
    </h1>
    <button class="js-repos">
        Repos
      </button>
  </section>
  `;
  const  reposButton = document.querySelector('.js-repos');

  reposButton.addEventListener('click', async () => {
    history.pushState(null, "", '/dashboard/repos');
    router();
  });
}

function router () {
  const path = window.location.pathname;
  console.log(path);

  if(path === '/dashboard') {
    console.log('dashboard');
    renderDashboard();
  } else if(path === '/dashboard/repos') {
    console.log('repos');
    renderRepos();
  } else if(path === '/dashboard/repos/pulls') {
    console.log('pulls');
    renderPulls();
  } else if(path === '/profile') {
    console.log('profile');
    renderProfile();
  } else if (path === '/' || path === '/index.html') {
    console.log('home');
    renderHome();
  }
   else {
    renderNotFound();
  }
}

window.addEventListener('popstate', router);


dashBoardButton.addEventListener('click', async () => {
  history.pushState(null, "", '/dashboard');
  router();
});

profileButton.addEventListener('click', async () => {
  history.pushState(null, "", '/profile');
  router();
});

homeButton.addEventListener('click', async () => {
  history.pushState(null, "", '/');
  router();
});




function renderNotFound() {
  app.innerHTML = `
  <h1>404 Not found</h1>
  `
}

function renderProfile() {
  app.innerHTML = `
  <h1>Hello Navaneeeth</h1>
  `
}

function renderRepos() {
  app.innerHTML = `
  <h1>Repos List</h1>
  <button class="js-repos-pulls">
    Pull requests
  </button>
  `;
  const pullButton = document.querySelector('.js-repos-pulls');
  pullButton.addEventListener('click', async () => {
    history.pushState(null, "", '/dashboard/repos/pulls');
    router();
  });

}

function renderPulls() {
  app.innerHTML = `
  <h1>Pull requests</h1>
  `;
}


function renderHome() {
  app.innerHTML = `
  <section class="login">
      <h1>
        Online Authentication
      </h1>
      <button class="backend-button js-fetch-button">
        Login with Google
      </button>
    </section>
  `;
  const fetchButton = document.querySelector('.js-fetch-button');
  fetchButton.addEventListener('click', async () => {
    window.location.href = 'http://localhost:3500/auth/google';
  });
}


