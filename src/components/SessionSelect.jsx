import React from 'react';

import Select from 'react-select';
import { getConfigErrorMessage } from '../config';
import * as helpers from '../helpers';

class SessionSelect extends React.Component {

  constructor(props) {
    super(props);

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

      selectedPlayer: null,
      selectedPlayerSession: null,
      selectedRecentSession: null,

      selectValues: {
        player: null,
        playerSession: null,
        recentSession: null,
      },
    };
  }

  componentDidMount() {
    if (getConfigErrorMessage()) {
      this.setState({
        playersLoading: false,
        recentSessionsLoading: false,
      });
      return;
    }

    helpers.QueryAllPlayers((data) => {
      this.setState({
        allPlayers: data,
        playersLoading: false,
      });
    }, this.props.onError);

    helpers.QueryRecentSessions((sessions) => {
      this.setState({
        recentSessions: sessions,
        recentSessionsLoading: false,
      });
    }, this.props.onError);
  }

  handleSelectUser(value) {
    const selectValues = {
      player: value,
      playerSession: null,
      recentSession: null,
    };

    this.setState({
      selectedPlayer: value,
      selectedPlayerSession: null,
      selectedRecentSession: null,
      selectValues,
    }, () => {
      this.props.sessionChange(null);
      this.generateUserSessions();
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
      helpers.QueryPlayerSessions(this.state.selectedPlayer.value, (sessions) => {
        this.setState({
          playerSessions: sessions,
          playerSessionsLoading: false,
          playerSessionsDisabled: false,
        });
      }, this.props.onError);
    });
  }

  handleSelectSession(value) {
    const selectValues = {
      ...this.state.selectValues,
      playerSession: value,
      recentSession: null,
    };

    const changedSession = {
      username: selectValues.player.label,
      start_time: value.start_time,
      end_time: value.end_time,
    };

    this.setState({
      selectedPlayerSession: value,
      selectedRecentSession: null,
      selectValues,
    }, () => {
      this.props.sessionChange(changedSession);
    });
  }

  handleSelectRecentSession(value) {
    const selectValues = {
      player: null,
      playerSession: null,
      recentSession: value,
    };

    const changedSession = {
      username: value.username,
      start_time: value.start_time,
      end_time: value.end_time,
    };

    this.setState({
      playerSessionsDisabled: true,
      selectedPlayer: null,
      selectedPlayerSession: null,
      selectedRecentSession: value,
      selectValues,
    }, () => {
      this.props.sessionChange(changedSession);
    });
  }

  render() {
    const disabled = this.props.disabled;

    return (
      <div>
        <p className="text-start m-0 p-0"><b>
          Select a user and a session:
        </b></p>
        <Select
          className="Custom-select mb-1"
          placeholder="Select a user"
          options={this.state.allPlayers}
          isClearable
          value={this.state.selectValues.player}
          isLoading={this.state.playersLoading}
          isDisabled={disabled || this.state.playersLoading}
          onChange={this.handleSelectUser}
        />
        <Select
          className="Custom-select mb-4"
          placeholder="Select a session"
          options={this.state.playerSessions}
          isClearable
          value={this.state.selectValues.playerSession}
          isLoading={this.state.playerSessionsLoading}
          isDisabled={disabled || this.state.playerSessionsDisabled}
          onChange={this.handleSelectSession}
        />

        <p className="text-start m-0 p-0"><b>
          Choose from the 20 most recent sessions:
        </b></p>
        <Select
          className="Custom-select"
          placeholder="Select a recent session"
          options={this.state.recentSessions}
          isClearable
          value={this.state.selectValues.recentSession}
          isLoading={this.state.recentSessionsLoading}
          isDisabled={disabled || this.state.recentSessionsLoading}
          onChange={this.handleSelectRecentSession}
        />
      </div>
    );
  }

}

export default SessionSelect;
