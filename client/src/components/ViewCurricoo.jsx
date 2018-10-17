import React, { Component } from 'react'
import { observer, inject }  from 'mobx-react'

class ViewCurricoo extends Component {
  constructor(props) {
    super(props)
  
    const curricoo = props.curricoosStore.curricoos.find(curricoo => 
      curricoo.id === props.match.params.curricooId
    )
    const canEdit = curricoo.ownerId === 
      props.userStore.user && props.userStore.user.attributes.sub

    this.state = {
       curricoo,
       canEdit
    }
  }
  
  render() {
    const { curricoo, canEdit } = this.state
    return (
      <div>
        <h1>{curricoo.title}</h1>
        <p>{curricoo.description}</p>
      </div>
    )
  }
}

const ConnentedViewCurricoo = inject(
  'curricoosStore',
  'userStore'
)(observer(ViewCurricoo));
export default ConnentedViewCurricoo