'use strict';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://arcane-ridge-26432.herokuapp.com/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = workout => Object.assign({}, workout, { slug: undefined })
const Workouts = {
  all: page =>
    requests.get(`/workouts?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/workouts?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/workouts?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/workouts/${slug}`),
  favorite: slug =>
    requests.post(`/workouts/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/workouts?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/workouts/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/workouts/${slug}`),
  unfavorite: slug =>
    requests.del(`/workouts/${slug}/favorite`),
  update: workout =>
    requests.put(`/workouts/${workout.slug}`, { workout: omitSlug(workout) }),
  create: workout =>
    requests.post('/workouts', { workout })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/workouts/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/workouts/${slug}/comments/${commentId}`),
  forWorkout: slug =>
    requests.get(`/workouts/${slug}/comments`)
};

const Exercises = {
  create: (slug, exercise) =>
    requests.post(`/workouts/${slug}/exercises`, { exercise }),
  delete: (slug, exerciseId) =>
    requests.del(`/workouts/${slug}/exercises/${exerciseId}`),
  forWorkout: slug =>
    requests.get(`/workouts/${slug}/exercises`)
}

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Workouts,
  Auth,
  Comments,
  Profile,
  Exercises,
  Tags,
  setToken: _token => { token = _token; }
};
