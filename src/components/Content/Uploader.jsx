import { DropzoneAreaBase } from 'material-ui-dropzone';

import PropTypes from 'prop-types';

import { uploadFile } from '../../database';
import { auth } from '../../firebase';

function Uploader({ groupId, addSkeleton }) {
    const uploadFiles = function (files) {
        for (const file of files) {
            const currentUser = auth.currentUser;
            uploadFile(currentUser, groupId, file.file);
        }
    };
    return (
        <DropzoneAreaBase
            acceptedFiles={['image/*']}
            dropzoneText={'Drag and drop an image here or click'}
            onAdd={(files) => {
                uploadFiles(files);
                addSkeleton();
            }}
        />
    );
}

Uploader.propTypes = {
    groupId: PropTypes.string,
    addSkeleton: PropTypes.func,
};

export default Uploader;
