import { Avatar, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import PropTypes from 'prop-types';

function Avatars(props) {
    return (
        <AvatarGroup max={6} className={props.containerClass}>
            {props.members.map((member) => (
                <Tooltip title={member.username} key={member.email}>
                    <Avatar
                        className={props.largeClass}
                        alt="Remy Sharp"
                        src={member.profile_picture}
                        sizes="large"
                    />
                </Tooltip>
            ))}
        </AvatarGroup>
    );
}

Avatars.propTypes = {
    containerClass: PropTypes.object,
    largeClass: PropTypes.object,
    members: PropTypes.object,
};
export default Avatars;
