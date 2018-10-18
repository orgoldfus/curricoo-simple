import React, { Component } from 'react'
import { observer, inject }  from 'mobx-react'
import CreateEntryModal from './CreateEntry';
import { Button } from 'react-bootstrap/lib';
import Entry from './Entry';

class ViewCurricoo extends Component {
  constructor(props) {
    super(props)
  
    let entries, canEdit
    const curricoo = props.curricoosStore.curricoos.find(curricoo => 
      curricoo.id === props.match.params.curricooId
    )

    if(curricoo) {
      props.curricoosStore.fetchEntries(curricoo.id)

      canEdit = props.userStore.user && 
        curricoo.ownerId ===  props.userStore.user.attributes.sub
    }

    this.state = {
      isCreateEntryOpen: false,
      curricoo,
      entries,
      canEdit
    }
  }

  handleCloseCreateEntry = () => {
    this.setState({ isCreateEntryOpen: false })
  }

  showCreateEntry = () => {
    this.setState({ isCreateEntryOpen: true })
  }
  
  render() {
    const { curricoo, canEdit } = this.state
    const { entries } = this.props.curricoosStore;

    return (
      !curricoo ? <h1>Not found</h1> :
      <div>
        <h1>{curricoo.title}</h1>
        <p>{curricoo.description}</p>
        { entries.map(entry => (
          <Entry entry={entry}/>
        )) }
        {canEdit &&
          <Button 
            variant="success" 
            size="lg" 
            onClick={this.showCreateEntry}
          >
            Add a new entry
          </Button>}
          <CreateEntryModal
            show={this.state.isCreateEntryOpen} 
            handleClose={this.handleCloseCreateEntry}
            curricooId={curricoo.id}
            newIndex={this.props.curricoosStore.entries.length + 1}
          />
      </div>
    )
  }
}

const ConnentedViewCurricoo = inject(
  'curricoosStore',
  'userStore'
)(observer(ViewCurricoo));
export default ConnentedViewCurricoo