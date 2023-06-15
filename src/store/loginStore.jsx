import create from 'zustand'

const loginStore = create((set, get) => ({
    login: false,
    setLogin: login => set(state => ({login: login})),
}));

export default loginStore;
