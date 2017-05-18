

const types = Object.freeze({
    getImageEnd: "get-image-end",
    getImageStart: "get-image-start",
});

const actions = {

    getImage() {
        return dispatch => {
        };
    },

    getImageEnd() {
        return {
            type: types.getImageEnd
        }
    },

    getImageStart() {
        return {
            type: types.getImageStart
        }
    }
}

export { actions, types };


function fetchNext(){

}
