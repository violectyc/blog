import axios from '@/common/http';

export const register = user => axios.post('/user/register', user);
export const login = user => axios.post('/user/login', user);
export const current = user => axios.post('/user/current');
export const putMessage = msg => axios.post('/message/add', msg);
export const getMessage = (page) => axios.get('/message', {params: page});
export const uploadFile = file => axios.post('/upload', file);
export const articleAdd = article => axios.post('/article/add', article);
export const getArticleDetail = id => axios.get('/article/detail', {params: id});
export const updateReadCount = id => axios.get('/article/readCount', {params: id});
export const getRecommend = () => axios.get('/article/recommend');
export const updateThumbCount = id => axios.get('/article/thumbCount', {params: id});
export const getArticleList = page => axios.post('/article', page);
export const getSearch = keyword => axios.get('/article/search', {params: keyword});
export const updateUser = user => axios.post('/user/update', user);

export const putComments = comment => axios.post('/comment/add', comment);
export const getComments = id => axios.get('/comment', {params: id});


export const putGallery = gallery => axios.post('/gallery/put', gallery);
export const getRecommendGallery = ()=>axios.post('/gallery/recommend');
