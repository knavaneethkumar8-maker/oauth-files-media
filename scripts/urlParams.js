// const href = '/navaneethkumar-8/profile';
// const pattern = new URLPattern({pathname : '/:userId/profile'});
// console.log(pattern);
// const match2 = pattern.exec({pathname : href});
// console.log(match2.pathname.groups.userId);

export let matched;
export let routeExists = 0;

export function setExistsToZero() {
  routeExists = 0;
}

export function route(url, handler) {
  const pattern = new URLPattern({pathname : `${url}`});
  //console.log(pattern);
  const urlPath = window.location.pathname;
  //console.log(urlPath);
  matched= pattern.exec({pathname : urlPath});
  console.log(matched);
  
  if(matched) {
    console.log(matched.pathname.groups.userId);
    console.log('matched');
    handler();
    routeExists++;
    return true;
  } else {
    console.log('not matched');
    //routeExists = false;
    return false;
  } 
  
}

//route('/:userId/:name/profile', handler);

function handler() {
  console.log('handler function');
}

// const Path = '/navaneeth/profile';

// const match = Path.match(/^\/(?<userId>[^/]+)\/profile$/);
// console.log(match);
// console.log(match.groups.userId);