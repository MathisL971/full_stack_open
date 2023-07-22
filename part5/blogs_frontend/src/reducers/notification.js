const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "DISPLAY":
            return action.payload
        case "REMOVE":
            return ""
        default:
            return state
    }
}

export default notificationReducer;