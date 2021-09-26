import React from 'react';
import { observer } from 'mobx-react';

import { FlexboxGrid, Container, Header, Icon } from 'rsuite';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Characters from './Characters/Characters';
import About from './About';

import '../css/app.css';
import Updates from './Updates';
import Weapons from './Weapons/Weapons';

// get original url hash
(function (location) {
  let search = location.search;
  if (location.hash && location.hash[1] === '/') {
    search = '?path=' + location.hash.slice(2);
  }
  if (search) {
    const path = /path=(.*?)(?:&|$)/.exec(search);
    const hash = /hash=(.*?)(?:&|$)/.exec(search);
    let newPath = '';
    if (path) newPath += path[1];
    if (hash) newPath += '#' + hash[1];
    if (newPath) {
      window.history.replaceState(null, null, '/' + newPath);
    }
  }
})(window.location);

const App = observer(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdates: false
    }
  }

  componentDidMount() {
    this.setState({
      showUpdates: this.props.store.outDated
    })
  }

  onShowUpdate = () => {
    this.setState({
      showUpdates: true
    })
  }

  onHideUpdate = () => {
    this.setState({
      showUpdates: false
    })
    this.props.store.ForceSave();
  }

  render() {
    const { store } = this.props;
    const isReady = store.isReady;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Container>
          <Header>
            <Route render={routeProps => (
              <NavBar store={store} {...routeProps} />
            )} />
          </Header>
          <FlexboxGrid justify="center">
            {
              isReady &&
              <Switch>
                <Route path="/weapons" render={routeProps => (
                  <Weapons store={store} {...routeProps} />
                )} />
                <Route path="/useful-info"></Route>
                <Route path="/about">
                  <About onShowUpdate={this.onShowUpdate} />
                </Route>
                <Route path="/schedule">
                  {/* <Content className="content schedule">
                  <Schedule store={store} />
                </Content> */}
                </Route>
                <Route path={["/characters/:characterID", "*"]} render={routeProps => (
                  <Characters store={store} {...routeProps} />
                )} />

              </Switch>
            }
            {
              !isReady &&
              <Icon icon="spinner" spin size="2x" className="pageLoading" />
            }
          </FlexboxGrid>
        </Container>
        <Updates show={this.state.showUpdates} onHide={this.onHideUpdate} />
      </Router>
    );
  }
})

export default App;