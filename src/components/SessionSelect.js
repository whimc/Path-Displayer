import React from 'react';

import Select from 'react-select';
import * as helpers from '../helpers';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class SessionSelect extends React.Component {

    constructor(props) {
        super(props)

        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleSelectSession = this.handleSelectSession.bind(this);
        this.handleSelectRecentSession = this.handleSelectRecentSession.bind(this);

        this.state = {
            playersLoading: true,
            playerSessionsLoading: false,
            playerSessionsDisabled: true,
            recentSessionsLoading: true,

            allPlayers: [],
            playerSessions: [],
            recentSessions: [],

            selectedPlayer: {},
            selectedPlayerSession: {},
            selectedRecentSession: {},
        }
    }

    /**
     * Generate the list of players and recent sessions
     */
    componentDidMount() {
        helpers.QueryAllPlayers(data => {
            this.setState({
                allPlayers: data,
                playersLoading: false,
            })
        })

        helpers.QueryRecentSessions(sessions => {
            this.setState({
                recentSessions: sessions,
                recentSessionsLoading: false,
            })
        })
    }

    handleSelectUser(value) {
        console.log(value)
        this.setState({
            selectedPlayer: value,
        }, () => {
            this.generateUserSessions()
        });
    }

    generateUserSessions() {
        if (!this.state.selectedPlayer) {
            this.setState({
                playerSessionsDisabled: true,
            });
            return;
        }

        this.setState({
            playerSessionsLoading: true,
            playerSessionsDisabled: true,
        }, () => {
            helpers.QueryPlayerSessions(this.state.selectedPlayer.value, sessions => {
                this.setState({
                    playerSessions: sessions,
                    playerSessionsLoading: false,
                    playerSessionsDisabled: false,
                });
            })
        });
        
    }

    handleSelectSession(value) {
        console.log(value)
    }

    handleSelectRecentSession(value) {
        console.log(value)
    }

    render() {
        return (
            <div>
                <p className="text-left m-0 p-0"><b>
                    Select a user and a session:
                </b></p>
                <Select
                    className="Custom-select mb-1"
                    placeholder="Select a user"
                    options={this.state.allPlayers}
                    isClearable
                    isLoading={this.state.playersLoading}
                    isDisabled={this.state.playersLoading}
                    onChange={this.handleSelectUser}
                />
                <Select
                    className="Custom-select mb-4"
                    placeholder="Select a session"
                    options={this.state.playerSessions}
                    isClearable
                    isLoading={this.state.playerSessionsLoading}
                    isDisabled={this.state.playerSessionsDisabled}
                    onChange={this.handleSelectSession}
                />

                <p className="text-left m-0 p-0"><b>
                    Choose from the 20 most recent sessions:
                </b></p>
                <Select
                    className="Custom-select"
                    placeholder="Select a recent session"
                    options={this.state.recentSessions}
                    isClearable
                    isLoading={this.state.recentSessionsLoading}
                    isDisabled={this.state.recentSessionsLoading}
                    onChange={this.handleSelectRecentSession}
                />
            </div>
        )
    }

}

export default SessionSelect;