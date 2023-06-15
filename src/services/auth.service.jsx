export const isLogged = () => {
    return new Promise(async (resolve, reject) => {
        let token = await localStorage.getItem('token')
        if (token !== null) resolve(token);
        else reject(false);
    });
};
