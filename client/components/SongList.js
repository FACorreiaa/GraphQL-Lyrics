import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";
import deleteSong from "../queries/deleteSongs";

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>

          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link className="btn-floating btn-large red right" to="/song/new">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(graphql(query)(SongList));
