"use strict";


import * as actions from "../action/actions";


const _MAX_IMAGES = 8;


export default (state: State = { images: [] }, action) => {

    let nextState: State;
    switch (action.type) {

        case actions.types.getImageEnd: {
            nextState = Object.assign({}, state);
            nextState.images = state.images.slice();

            let index = -1;
            for (let i = 0; i < nextState.images.length; i++) {
                if (nextState.images[i] === null) {
                    index = i;
                    break;
                }
            }

            const { id, source } = action.image;
            const item: ImageItem = {
                height: parseInt(action.image.height),
                id,
                source,
                width: parseInt(action.image.width)
            };

            if (-1 < index) {
                nextState.images[index] = item;
            } else {
                nextState.images.push(item);
            }

            break;
        }

        case actions.types.getImageStart: {
            nextState = Object.assign({}, state);
            const firstIndex = action.imageCount - (_MAX_IMAGES - state.images.length);
            if (0 < firstIndex) {
                nextState.images = state.images.slice(firstIndex);
            }

            for (let i = 0; i < action.imageCount; i++) {
                nextState.images.push(null);
            }

            break;
        }

        case actions.types.removeImage: {
            const index = state.images.findIndex(item => {
                return item.id === action.id;
            });

            if (-1 < index) {
                const id = state.images[index].id;
                nextState = Object.assign({}, state);
                nextState.images = state.images.filter(item => {
                    return id !== item.id;
                });
            }

            break;
        }
    }

    return nextState || state;
}


interface State {
    images: ImageItemType[];
}

interface ImageItem {
    height: number;
    id: string;
    source: string;
    width: number;
}

type ImageItemType = null | ImageItem;

export { ImageItem, ImageItemType, State };
