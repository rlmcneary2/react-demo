

import {ImageClickedHandler} from "./declarations";
import * as React from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { ImageItem, ImageItemType } from "../reducer/image";
import ImageListItem from "./ImageListItem";


const _ANIMATION_TIMEOUT = 1000;


export default (props: Props) => {
    const transitionProps = {
        className: "thumbnail-list",
        component: "ul",
        transitionAppear: true,
        transitionAppearTimeout: _ANIMATION_TIMEOUT,
        transitionEnterTimeout: _ANIMATION_TIMEOUT,
        transitionLeaveTimeout: _ANIMATION_TIMEOUT,
        transitionName: "thumbnail-container"
    };

    return (
        <CSSTransitionGroup {...transitionProps}>
            {createListItems(props.images, props.imageClicked)}
        </CSSTransitionGroup>
    );
};


interface Props {
    imageClicked: ImageClickedHandler;
    images: ImageItemType[];
}

export { ImageClickedHandler, Props };


function createListItems(imageItems: ImageItemType[], imageClicked: ImageClickedHandler): any[] {
    return imageItems.map((item: ImageItemType) => {
        const iProps = Object.assign({ imageClicked }, item);
        let image;
        if (isImageItem(item)) {
            image = (
                <ImageListItem key={item.id} {...iProps} />
            )
        } else {
            image = null;
        }

        return image;
    }).filter(item => {
        return item !== null;
    });
}

function isImageItem(item: null | ImageItem): item is ImageItem {
    return item !== null;
}