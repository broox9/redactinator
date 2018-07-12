import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Consult from './components/Consult'


const CodeBlock = styled.pre`
  border: darkgray;
  background: lightgray;
  font: 11px 'Courier New', Courier, monospace;
  padding: 1em;
  margin: 1em;
`

const HomePageContainer = styled.section`
  margin: 0 auto;
  max-width: 1024px;
  min-width: 512px;
  padding: 50px 64px;
`


export default class HomePage extends React.Component {

  state = {
    consults: [],
    currentTransfer: ''
  }

  getAllData = () => {
    fetch('/api/get_consults')
      .then(rsp => rsp.json())
      .then(rsp => {
        this.setState({
          currentTransfer: rsp,
          consults: rsp.consults
        })
      })
  }

  resetAllData = () => {
    fetch('/api/reset_data')
      .then(rsp => rsp.json())
      .then(rsp => {
        this.setState({
          currentTransfer: rsp,
          consults: rsp.consults
        })
      })
  }

  componentDidMount() {
    this.getAllData();
  }

  render() {
    const { consults, currentTransfer } = this.state
    console.log('Consults', consults)

    const consultList = consults.map(consult => <Consult {...consult} />)

    return (
      <HomePageContainer>
        {consults.length && consultList}

        <strong>current transfer data</strong>
        {<CodeBlock>{JSON.stringify(currentTransfer, null, 2)}</CodeBlock>}
        <button onClick={this.resetAllData}>Reset Data</button>
      </HomePageContainer>
    )
  }
}
