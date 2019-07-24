import { pexel } from '../../config/keys';

export const pexelOps = {
    getPics: _ => {
        return fetch(`https://api.pexels.com/v1/curated?per_page=15$page=1`,{
                    headers: {
                        'Authorization': pexel
                    }
                })
                .then((res) => res.json())
                .then((resData) => resData.photos)
                .catch(err => {
                    throw new Error(err.json())
                })
    },

    getVideos: _ => {
        return fetch(`https://api.pexels.com/videos/popular?per_page=15&page=1`,{
                    headers: {
                        'Authorization': pexel
                    }
                })
                .then((res) => res.json())
                .then((resData) => resData.videos)
                .catch(err => {
                    throw new Error(err.json())
                })
    },

    getPic: id => {
        return fetch(`https://api.pexels.com/v1/photos/${id}`,{
                    headers: {
                        'Authorization': pexel
                    }
                })
                .then((res) => res.json())
                .then((r) => r)
                .catch((err) => {
                    throw new Error(`Invalid response Error: ${err}`)
                })
    },

    getVideo: id => {
        return fetch(`https://api.pexels.com/v1/videos/videos/${id}`,{
                    headers: {
                        'Authorization': pexel
                    }
                })
                .then((res) => res.json())
                .then((r) => r)
                .catch((err) => {
                    throw new Error(`Invalid response Error: ${err}`)
                })
    },

    searchPic: search => {
        return fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`,{
                            headers: {
                                'Authorization': pexel
                            }
                        })
                        .then((res) => res.json())
                        .then((resData) => console.log(resData))
                        .catch(err => {
                            console.error(err);
                            throw new Error(err.json())
                        })
    },

    searchVideo: search => {
        return fetch(`https://api.pexels.com/videos/search?query=${search}&per_page=15&page=1`,{
                            headers: {
                                'Authorization': pexel
                            }
                        })
                        .then((res) => res.json())
                        .then((resData) => console.log(resData))
                        .catch(err => {
                            console.error(err);
                            throw new Error(err.json())
                        })
    }
}
