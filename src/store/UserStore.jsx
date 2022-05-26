import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._refresh = true
        this._user = {}
        this._posts = []
        makeAutoObservable(this)
    }

    setRefresh(boolean) {
        this._refresh = boolean
    }
    setUser(user) {
        this._user = user
    }
    setPosts(posts) {
        this._posts = posts
    }

    get refresh() {
        return this._refresh
    }
    get user() {
        return this._user
    }
    get posts() {
        return this._posts
    }
}