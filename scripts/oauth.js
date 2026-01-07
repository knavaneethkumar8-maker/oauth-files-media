import { route, matched, routeExists } from "./urlParams.js";

const body = document.querySelector('.js-body');
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

async function renderUserProfile () {
  const userId = matched.pathname.groups.userId;
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


async function router( ) {
  const path = window.location.pathname;
  const url = new URL(location.href);
  const userId = url.searchParams.get('userId');
  console.log(path);

  route('/:userId/profile', renderUserProfile);
  if(routeExists){
    console.log(matched.pathname.groups);
    return;
  }

  route('/dashboard', renderDashboard);
  if(routeExists) return;

  route('/dashboard/repos', renderRepos);
  if(routeExists) return;

  route('/dashboard/repos/pulls', renderPulls);
  if(routeExists) return;

  route('/profile', renderProfile);
  if(routeExists) return;

  route('/index.html', renderHome);
  if(routeExists) return;

  route('/index', renderHome);
  if(routeExists) return;

  route('/', renderHome);
  if(routeExists) return;

  renderNotFound();
}

window.addEventListener('popstate', router);


dashBoardButton.addEventListener('click', async (event) => {
  history.pushState({page : "Dashboard"}, "Dashboard", '/dashboard');
  document.title = 'Dashboard';
  console.log(event.page);
  router();
});

profileButton.addEventListener('click', async () => {
  history.pushState(null, "Profile", '/profile');
  router();
});

homeButton.addEventListener('click', async () => {
  history.pushState(null, "Home", '/');
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
