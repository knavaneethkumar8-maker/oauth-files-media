import { route, matched, routeExists, setExistsToZero } from "./urlParams.js";

const body = document.querySelector('.js-body');
const app = document.querySelector('.js-app');
const header = document.querySelector('.js-header');

router();
if(header) {
  renderHeader();
}

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

async function renderUserProfile () {
  const userId = matched.pathname.groups.userId;
  body.innerHTML = `
  <p>Loading..</p>
  `
  console.log(userId + " this is user id");
  if(userId) {
    console.log(userId);
    const response = await fetch(`http://localhost:3500/${userId}/profile`, {
      headers : {
        "Content-Type" : "text/html",
        "Accept" : "text/html"
      },
      credentials : 'include',
      method : "GET"
    });
    const html = await response.text();
    body.innerHTML = html;

    const  backToDashboard = document.querySelector('.js-back-dashboard');

    backToDashboard.addEventListener('click', async () => {
      window.location.pathname = '/dashboard';
    });

    
  } else {
    renderProfile();
  }
}

function renderHeader() {
  header.innerHTML = `
  <nav>
    <button href="/profile" class="js-profile-button">
      Profile
    </button>
    <button href="/dashboard" class="js-dashboard">
      Dashboard
    </button>
    <button href="/home" class="js-home">
      Home
    </button>
  </nav>
  `;

  const dashBoardButton = document.querySelector('.js-dashboard');
  const profileButton = document.querySelector('.js-profile-button');
  const homeButton = document.querySelector('.js-home');

  dashBoardButton?.addEventListener('click', async (event) => {
    history.pushState({page : "Dashboard"}, "Dashboard", '/dashboard');
    document.title = 'Dashboard';
    console.log(event.page);
    router();
  });

  profileButton?.addEventListener('click', async () => {
    history.pushState(null, "Profile", '/profile');
    router();
  });

  homeButton?.addEventListener('click', async () => {
    history.pushState(null, "Home", '/');
    router();
  });
}

function renderIndexPage() {
  app.innerHTML = `
    <section class="login">
      <h1>
        Open Authentication
      </h1>
      <button class="backend-button js-fetch-button">
        Login with Google
      </button>
    </section>
  `;

  const fetchButton = document.querySelector('.js-fetch-button');
  fetchButton?.addEventListener('click', async () => {
    window.location.href = 'http://localhost:3500/auth/google';
  });

}

async function router() {
  const path = window.location.pathname;
  console.log(path);
  setExistsToZero();
  route('/dashboard', renderDashboard);
  route('/:userId/profile', renderUserProfile);
  route('/dashboard/repos', renderRepos);
  route('/dashboard/repos/pulls', renderPulls);
  route('/profile', renderProfile);
  route('/index.html', renderIndexPage);
  route('/index', renderIndexPage);
  route('/', renderIndexPage);
  console.log(routeExists);
  if(routeExists < 1){
    renderNotFound();
    return;
  }
  
}


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
  fetchButton?.addEventListener('click', async () => {
    window.location.href = 'http://localhost:3500/auth/google';
  });
}


window.addEventListener('popstate', router);
