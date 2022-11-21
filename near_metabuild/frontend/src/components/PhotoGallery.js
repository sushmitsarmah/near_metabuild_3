import _ from 'lodash';

const IMAGES = [
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
    "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    "https://images.unsplash.com/photo-1501426026826-31c667bdf23d",
    "https://images.unsplash.com/photo-1502818364365-08cda033fee1",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4",
    "https://images.unsplash.com/photo-1621849254497-331da44b7c9c",
];


const PhotoGallery = () => {
    const images = _.chunk(IMAGES, _.ceil(IMAGES.length / 3));

    return (
        <div className="container mx-auto">
            <div className="flex flex-row gap-2 p-5">
                {images.map((k, i) =>
                    <div key={i} className="flex flex-col gap-2">
                        {k.map((img, idx) =>
                            <div key={idx} className="w-full rounded">
                                <img src={img} alt="image" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
};

export default PhotoGallery;