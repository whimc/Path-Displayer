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

        this.state = {
            playersLoading: true,
            playerSessionsLoading: false,
            playerSessionsDisabled: true,
            recentSessionsLoading: true,

            allPlayers: [],
            playerSessions: [],
            recentSessions: [],

            selectedPlayer: '',
            selectedPlayerSession: {},
            selectedRecentSession: {},
        }
    }

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
                />
                <Select
                    className="Custom-select mb-4"
                    placeholder="Select a session"
                    options={options}
                    isClearable
                    isLoading={this.state.playerSessionsLoading}
                    isDisabled={this.state.playerSessionsDisabled}
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
                />
            </div>
        )
    }

}

export default SessionSelect;