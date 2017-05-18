

import {ImageClickedHandler} from "./declarations";
import * as React from "react";
import { ImageItem } from "../reducer/image";


export default (props: Props) => {
    return (
        <li className="thumbnail-container" key={props.id} onClick={() => props.imageClicked(props)}>
            <img className="thumbnail-large" src={props.source} />
        </li>
    );
};


interface Props extends ImageItem {
    imageClicked: ImageClickedHandler;
}

export { Props };
