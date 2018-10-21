import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject }  from 'mobx-react';
import CreateEntryModal from './CreateEntry';
import { Button } from 'react-bootstrap/lib';
import Entry from './Entry';

class ViewCurricoo extends Component {
  constructor(props) {
    super(props);

    const { curricooId } = props.match.params;
    let canEdit = false;

    if(!props.curricoosStore.currentCurricooId) {
      props.curricoosStore.setCurrentCurricoo(curricooId);
    }

    if(!props.curricoosStore.currentCurricoo) {
      props.curricoosStore.fetchCurricoo({ curricooId });
    } else {
      canEdit = props.userStore.user && 
        props.curricoosStore.currentCurricoo.ownerId ===  
        props.userStore.user.attributes.sub;
    }

    this.state = {
      isCreateEntryOpen: false,
      canEdit
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
    this.props.history.push('/');
  }

  handleDelete = (entryData) => {
    this.props.curricoosStore.deleteEntry(entryData);
  }
  
  render() {
    const { canEdit } = this.state;
    const { entries, currentCurricoo: curricoo } = this.props.curricoosStore;

    return (
      !curricoo ? <h1>Not found</h1> :
        <div>
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
        </div>
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