import PhotoGallery from '../components/PhotoGallery';

const Community = ({ wallet, isSignedIn }) => {
    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className='font-bold text-3xl'>Community Photos</h1>
            <PhotoGallery />
        </div>
    );
};

export default Community;