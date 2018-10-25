import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject }  from 'mobx-react';
import { Button, Container } from 'react-bootstrap/lib';
import {
  Entry,
  CreateEntry as CreateEntryModal
} from '../components';

class ViewCurricoo extends Component {
  constructor(props) {
    super(props);

    const { curricooId } = props.match.params;

    props.curricoosStore.setCurrentCurricoo(curricooId);

    if(!props.curricoosStore.currentCurricoo) {
      props.curricoosStore.fetchCurricoo({ curricooId });
    }

    this.state = {
      isCreateEntryOpen: false
    };
  }

  handleCloseCreateEntry = () => {
    this.setState({ isCreateEntryOpen: false });
  }

  showCreateEntry = () => {
    this.setState({ isCreateEntryOpen: true });
  }

  deleteCurricoo = () => {
    const { curricoo } = this.state;
    this.props.curricoosStore.deleteCurricoo({ curricooId: curricoo.id });
    this.props.history.replace('/');
  }

  handleDelete = (entryData) => {
    this.props.curricoosStore.deleteEntry(entryData);
  }
  
  render() {
    const { userStore, curricoosStore } = this.props;
    const { entries, currentCurricoo: curricoo } = curricoosStore;
    const canEdit = userStore.isUserConnected && curricoo &&
      curricoo.ownerId === userStore.currentUser.attributes.sub;

    if (curricoosStore.inProgress) return null;
    return (
      !curricoo ? <h1>Curricoo was not found :(</h1> :
        <Container>
          <h1>{curricoo.title}</h1>
          <p>{curricoo.description}</p>
          { entries.map(entry => (
            <Entry
              key={entry.id}
              entry={entry} 
              canEdit={canEdit}
              handleDelete={this.handleDelete}
            />
          )) }
          {canEdit &&
          <div>
            <Button 
              variant="success" 
              size="lg" 
              onClick={this.showCreateEntry}
            >
              Add a new entry
            </Button>
            <Button 
              variant="danger" 
              size="lg" 
              onClick={this.deleteCurricoo}
            >
              Delete Curricoo
            </Button>
          </div>
          }
          {(userStore.isUserConnected || this.state.isCreateEntryOpen) &&
          <CreateEntryModal
            show={this.state.isCreateEntryOpen} 
            handleClose={this.handleCloseCreateEntry}
            curricooId={curricoo.id}
            newIndex={this.props.curricoosStore.entries.length + 1}
          />}
        </Container>
    );
  }
}

ViewCurricoo.propTypes = {
  curricoosStore: PropTypes.object,
  userStore: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

const ConnentedViewCurricoo = inject(
  'curricoosStore',
  'userStore'
)(observer(ViewCurricoo));
export default ConnentedViewCurricoo;