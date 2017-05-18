

const _API_KEY = "38e86e7b27983abbd2d41ddf5f47b9c6";
const _MAX_IMAGES = 8;


const types = Object.freeze({
    getImageEnd: "get-image-end",
    getImageStart: "get-image-start",
    removeImage: "remove-image",
});

const actions = {

    getImage(currentImages: any[]) {
        // Demo purposes only.
        return async dispatch => {
            const cImages = currentImages.slice();
            if (cImages.length === _MAX_IMAGES) {
                cImages.splice(0, 1);
            }

            const imagesNeeded = _MAX_IMAGES - cImages.length;
            dispatch(this.getImageStart(imagesNeeded));

            const nextImages = [];
            let perpage;
            let photo: any[];
            while (nextImages.length < imagesNeeded) {
                ({ perpage, photo } = await getInterestingPhotos());
                const min = Math.ceil(0);
                const max = Math.floor(perpage);
                const indices = [];
                do {
                    const index = Math.floor(Math.random() * (max - min + 1)) + min;
                    if (!indices.includes(index) && photo[index]) {
                        indices.push(index);
                    }
                } while (indices.length < imagesNeeded);

                indices.forEach(item => {
                    nextImages.push(photo[item]);
                });
            }

            nextImages.forEach(async item => {
                const { id } = item;
                const { thumb } = await getPhotoSizes(id);
                const { height, source, width } = thumb;
                dispatch(this.getImageEnd({ height, id, source, width }));
            });
        };
    },

    getImageEnd(image) {
        return {
            image,
            type: types.getImageEnd
        }
    },

    getImageStart(imageCount: number) {
        return {
            imageCount,
            type: types.getImageStart
        }
    },

    removeImage(id: string) {
        return {
            id,
            type: types.removeImage
        }
    }
}

export { actions, types };


async function getInterestingPhotos(): Promise<any> {
    return new Promise(async resolve => {
        const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${_API_KEY}&format=json&nojsoncallback=1`);
        const body = await response.json();
        resolve(body.photos);
    });
}

async function getPhotoSizes(id: string): Promise<any> {
    return new Promise(async resolve => {
        const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${_API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`);
        const body = await response.json();

        let label;
        let thumb;
        let large;
        for (let i = 0; i < body.sizes.size.length; i++) {
            label = body.sizes.size[i].label;
            if (label === /*"Small 320"*/ "Medium 640") {
                thumb = body.sizes.size[i];
            } else if (i + 1 === body.sizes.size.length) {
                const largeIndex = body.sizes.size[i].label === "Original" ? i - 1 : i;
                large = body.sizes.size[largeIndex];
            }
        }

        resolve({ thumb, large });
    });
}
