


import mediaRepository from "./repository"

const mediaPresenter = { ...mediaRepository }

mediaPresenter.getListMedia = async (payload) => {
    const listMedia = await mediaRepository.getListMedia(payload)
    // store.dispatch(profileStore.actions.fetchProfile(new User(user)))
    return listMedia
}

export default mediaPresenter