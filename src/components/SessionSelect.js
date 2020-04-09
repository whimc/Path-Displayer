import React from 'react';

import Select from 'react-select';
import * as helpers from '../helpers';

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

            selectValues: {
                player: null,
                playerSession: null,
                recentSession: null,
            },
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

        var selectValue = {
            player: value,
            playerSession: null,
            recentSession: null,
        }

        this.setState({
            selectedPlayer: value,
            selectedPlayerSession: null,
            selectValues: selectValue,
        }, () => {
            this.props.sessionChange(null);
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

        var selectValue = this.state.selectValues
        selectValue.playerSession = value

        var changedSession = {
            username: selectValue.player.label,
            start_time: value.start_time,
            end_time: value.end_time,
        }

        this.setState({
            selectedPlayerSession: value,
            selectValue: selectValue,
        }, () => {
            this.props.sessionChange(changedSession)
        });
    }

    handleSelectRecentSession(value) {

        var selectValue = {
            player: null,
            playerSession: null,
            recentSession: value,
        }

        this.setState({
            playerSessionsDisabled: true,
            selectedPlayer: null,
            selectedPlayerSession: null,
            selectedRecentSession: value,
            selectValues: selectValue,
        }, () => {
            this.props.sessionChange(value)
        });
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
                    value={this.state.selectValues.player}
                    isLoading={this.state.playersLoading}
                    isDisabled={this.state.playersLoading}
                    onChange={this.handleSelectUser}
                />
                <Select
                    className="Custom-select mb-4"
                    placeholder="Select a session"
                    options={this.state.playerSessions}
                    isClearable
                    value={this.state.selectValues.playerSession}
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
                    value={this.state.selectValues.recentSession}
                    isLoading={this.state.recentSessionsLoading}
                    isDisabled={this.state.recentSessionsLoading}
                    onChange={this.handleSelectRecentSession}
                />
            </div>
        )
    }

}

export default SessionSelect;