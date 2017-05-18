

import * as actions from "../action/actions";
import ImageList, { Props as ImageListProps } from "./ImageList";
import * as React from "react";
import * as redux from "react-redux";
import { ImageItem, ImageItemType, State as ImageState } from "../reducer/image";


export default redux.connect(mapStateToProps, mapDispatchToProps)((props: ImageListProps) => {
    return (
        <div>
            <p style={{ fontSize: "24pt" }}>Click an image to remove it.</p>
            <ImageList {...props} />
        </div>
    );
});


function mapDispatchToProps(dispatch) {
    return {

        imageClicked(item: ImageItem) {
            dispatch(actions.actions.removeImage(item.id));
        }

    }
}

function mapStateToProps(state) {
    const images: ImageItemType[] = (state.image as ImageState).images;

    return {
        images
    };
}