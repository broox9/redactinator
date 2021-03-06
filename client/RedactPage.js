import React from 'react'
import { Icon } from 'react-icons-kit'
import { fileO } from 'react-icons-kit/fa/fileO'

import Censor from './components/Censor'

export default class RedactPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      censors: props.censors || [],
      redaction_status: props.redaction_status
    }
  }

  createSensor = () => {
    const censors = this.state.censors.slice(0)
    const id = censors.length + 1;
    const newCensor = { id, top: 0, left: 0, height: '40px', width: '40px' };
    censors.push(newCensor)
    this.setState({
      censors
    })
  }

  submitImage = () => {
    this.setState({ redaction_status: "redaction_complete" }, () => {
      this.updateImage()
        .then(res => {
          console.log('Success', res.json())
          window.location = '/'
        })
        .catch(console.error);
    });
  }

  updateImage = (data) => {
    const { redaction_status, censors } = this.state;
    return fetch('/api/update_image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        img_id: this.props.img_id,
        redaction_status,
        censors
      })
    })
  }

  handleCensorMove = (e) => {
    const { x, y, target } = e;
    const { id } = target;
    const censors = this.state.censors.slice(0)

    const censor = censors.find(censor => censor.id === parseInt(id))
    censor.top = y;
    censor.left = x;

    this.setState({ censors })
    this.updateImage()
      .then(res => res.json())
      .catch(console.err)
      .then(console.log)
  }

  render() {
    const { img_id, url } = this.props;
    const censors = this.state.censors.map((data, index) => (
      <Censor {...data} key={index} censor_id={index + 1} handleCensorMove={this.handleCensorMove} />
    ));

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
                {censors}
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
      </div >
    )
  }
}

