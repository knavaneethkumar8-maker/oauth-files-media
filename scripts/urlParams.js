export let matched;
export let routeExists = 0;

export function setExistsToZero() {
  routeExists = 0;
}

export function route(url, handler) {
  const pattern = new URLPattern({pathname : `${url}`});
  const urlPath = window.location.pathname;
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
    return false;
  } 
  
}

function handler() {
  console.log('handler function');
}
