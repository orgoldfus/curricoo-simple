import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject }  from 'mobx-react';
import CreateEntryModal from './CreateEntry';
import { Button } from 'react-bootstrap/lib';
import styled from 'styled-components';
import Entry from './Entry';

const CurricooWrapper = styled.div`
  max-width: 83.75rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.5rem;
`;

class ViewCurricoo extends Component {
  constructor(props) {
    super(props);

    const { curricooId } = props.match.params;

    if(!props.curricoosStore.currentCurricooId) {
      props.curricoosStore.setCurrentCurricoo(curricooId);
    }

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
    const canEdit = userStore.isUserConnected && 
      curricoo.ownerId === userStore.currentUser.attributes.sub;

    return (
      !curricoo ? <h1>Curricoo was not found :(</h1> :
        <CurricooWrapper>
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
          <CreateEntryModal
            show={this.state.isCreateEntryOpen} 
            handleClose={this.handleCloseCreateEntry}
            curricooId={curricoo.id}
            newIndex={this.props.curricoosStore.entries.length + 1}
          />
        </CurricooWrapper>
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