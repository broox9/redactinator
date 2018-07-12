import React from 'react'
import { Icon } from 'react-icons-kit'
import { fileO } from 'react-icons-kit/fa/fileO'

import Censor from './components/Censor'

export default class RedactPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      censors: props.censors || []
    }
  }

  createSensor = () => {
    console.log('clicked')
    const censors = this.state.censors.slice(0);
    const id = censors.length + 1;
    const newCensor = { id, top: 0, left: 0, height: '40px', width: '40px' };
    censors.push(newCensor)
    this.setState({
      censors
    })
  }

  submitImage = () => {
    fetch('/api/update_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        img_id: this.props.img_id,
        redaction_status: "redaction_complete"
      })
    })
      .then(res => {
        console.log('Success', res.json())
        window.location = '/'
      })
      .catch(console.error)
  }

  render() {
    const { img_id, url } = this.props
    return (
      <div>
        <header>
          <h3>
            Redaction #{img_id}
          </h3>
        </header>

        <section class="content">
          <section>
            <div class="image-section">
              <div class="image-section__dropzone">
                {
                  this.state.censors.map(data => <Censor {...data} />)
                }
                <img id="main-image" src={url} />
              </div>
            </div>

            <div>
              <button onClick={this.submitImage}>Done</button>
              <a href="/">Back to Home </a>
            </div>
          </section>

          <aside class="image-control-panel">
            <button id="new-censor" onClick={this.createSensor} >
              <Icon icon={fileO} />New Censor
            </button>

            <ul>
              {this.state.censors.map(data => {
                return (
                  <li>
                    id: {data.id}, top: {data.top}, left: {data.left}
                  </li>
                )
              })}
            </ul>
          </aside>
        </section>
      </div>
    )
  }
}

