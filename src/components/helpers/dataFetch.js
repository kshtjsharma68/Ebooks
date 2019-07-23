import { pexel } from '../../config/keys';

export const pexelOps = {
    getPics: async(search) => {
        return await fetch(`https://api.pexels.com/v1/curated`,{
                    headers: {
                        'Authorization': pexel
                    }
                })
                .then((res) => res.json())
                .then((resData) => resData.photos)
                .catch(err => {
                    console.error(err);
                    throw new Error(err.json())
                })
    },

    search: async(search) => {
        return await fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`,{
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
