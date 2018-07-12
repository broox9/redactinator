import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';




export default class Consult extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    status: PropTypes.string,
    images: PropTypes.images
  }


  render() {
    const { id, status, images } = this.props
    const entries = images.map(imgProps => imgProps.redaction_status === 'incomplete' && <Entry key={id} {...imgProps} consult_id={id} />)
    return (
      <article id={id}>
        <strong>eConsult #{id}</strong>
        <ul>
          {entries.length && entries}
        </ul>
      </article>
    )
  }
}




const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

class Entry extends React.Component {
  setNoRedaction = () => {
    const { url, img_id, redaction_status } = this.props
    fetch('/api/update_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        img_id,
        redaction_status: "no_redaction_needed"
      })
    })
      .then(res => console.log('Success', res.json()))
      .catch(console.error)
  }
  render() {
    const { url, img_id, redaction_status, consult_id } = this.props

    return (
      <ListItem>
        <img width="200" src={url} />
        <a className="button-link" href={`/redact/${img_id}`}>Redact</a>
        <button onClick={this.setNoRedaction}>No redaction needed</button>
      </ListItem>
    )
  }
}