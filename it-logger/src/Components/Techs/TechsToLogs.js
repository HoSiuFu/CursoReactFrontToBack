import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTechs} from "../../Actions/techActions";

const TechsToLogs = ({tech: {techs, loading}, getTechs}) => {
    useEffect(() => {
        getTechs();
        //eslint-disable-next-line
    }, []);

    return (
        !loading && techs !== null &&
        techs.map((tech) =>
            <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
                {tech.firstName} {tech.lastName}
            </option>)
    )
}

TechsToLogs.propTypes = {
    tech: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tech: state.tech
})

export default connect(mapStateToProps, {getTechs})(TechsToLogs);