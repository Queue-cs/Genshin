import React from 'react';
import { observer } from 'mobx-react';
import { Navbar, Nav, Button, Icon } from 'rsuite';
import { Link } from 'react-router-dom';


const barHeight = 56;

const NavLinks = ({ onClick }) => {
  return (
    <React.Fragment>
      <Nav.Item eventKey="/characters" componentClass={Link} to="/characters" onClick={onClick}>
        Characters
      </Nav.Item>
      <Nav.Item eventKey="/weapons" componentClass={Link} to="/weapons" onClick={onClick}>
        Weapons
      </Nav.Item>
      <Nav.Item eventKey="/useful-info" componentClass={Link} to="/useful-info" onClick={onClick}>
        Useful Info
      </Nav.Item>
      <Nav.Item eventKey="/about" componentClass={Link} to="/about" onClick={onClick}>
        About
      </Nav.Item>
    </React.Fragment>
  )
}

const NavBar = observer(class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      top: 0
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onWindowScroll);
    this.prevScroll = window.pageYOffset;
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  }
  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }
  onWindowScroll = () => {
    const currentScroll = window.pageYOffset;
    const delta = currentScroll - this.prevScroll;
    if (Math.abs(delta) < 5) return;
    const hide = delta < 0;
    this.setState({ top: hide ? 0 : -barHeight });
    this.prevScroll = currentScroll;
  }
  render() {
    const {
      showMenu, top
    } = this.state;
    const {
      isXS
    } = this.props.store;
    const activeKey = this.props.location.pathname;
    const barStyle = {
      height: barHeight,
      top
    }
    const linksStyle = {
      top: barHeight + top
    }
    return (
      <React.Fragment>
        {
          isXS &&
          <Nav className={"navToggle " + (showMenu ? "visible" : "")} style={linksStyle} vertical>
            <NavLinks onClick={this.toggleMenu} {...{ activeKey }} />
          </Nav>
        }
        <Navbar className="navbar" style={barStyle}>
          <Navbar.Body>
            {
              !isXS ?
                <Nav >
                  <NavLinks {...{ activeKey }} />
                </Nav> :
                <Navbar.Header style={{ padding: "8px 10px" }}>
                  <Button appearance="subtle" onClick={this.toggleMenu}>
                    <Icon icon="bars" size="2x" />
                  </Button>
                </Navbar.Header>
            }
          </Navbar.Body>
        </Navbar>
        <div style={{ height: barHeight }} />
      </React.Fragment>
    );
  }
});

export default NavBar;