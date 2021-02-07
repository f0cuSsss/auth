import React from 'react'
import { connect } from 'react-redux'

import { loadProfileData } from '../actions/index'

class Profile extends React.Component {
    componentDidMount() {
        this.props.loadProfileData(this.props.match.params.id);
    }

    renderContent = () => {
        if(!this.props.profile) {
            return null;
        } else {
            if(this.props.profile.hasOwnProperty('error')){
                return (
                    <div>
                        <h1>{this.props.profile.error}</h1>
                    </div>
                );
            }

            if(this.props.user){
                if(this.props.user._id === this.props.match.params.id) {
                    return (
                        <div>
                            My profile
                            {this.props.profile.firstName}
                            <br/>
                            <div>
                                <a href="/api/logout">
                                    Logout
                                </a>
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                            {this.props.profile.firstName}
                            <br/>
                            Profile of some user
                        </div>
                    );
                }



            }
        }
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.currentUser, profile: state.profile }
}

export default connect(mapStateToProps, { loadProfileData })(Profile);