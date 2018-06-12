import React, {Component} from 'react'
import styled from 'styled-components'

import Buttons from './weather-components/Buttons';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

class App extends Component {

  render() {
    return (
      <div>
        <Buttons />
        <Root />
      </div>
    )
  }
}

export default App
