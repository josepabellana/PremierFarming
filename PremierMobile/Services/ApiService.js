const BASE_URL = 'http://localhost:3000';
// possible to refactor into a 'fetch factory' to reduce repetition
const apiService = {};

apiService.login =  (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getUserData = async () => {
   return fetch(`${BASE_URL}/getUserData`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

};
apiService.getFeed = async() => {
  return fetch(`${BASE_URL}/getFeed`, {
   method: 'GET',
   mode: 'cors',
   headers: { 'Content-Type': 'application/json' },
 })
   .then((res) => res.json())
   .catch((err) => console.log(err));

};
apiService.createRequest = async(request) => {
  return fetch(`${BASE_URL}/createRequest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
apiService.logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;