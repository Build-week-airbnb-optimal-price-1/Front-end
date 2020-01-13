import React from "react";
import style from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../store/actions";

const StyleHeader = style.header`
  width: 100%;
  display: flex;
  padding: 10px 30px;
  border-bottom: 1px solid #d8d8d8;
`;

const HeaderLeft = style.div`
    display: flex;
    flex-direction: columns;
    align-items: center;
    width: 50%;
`;

const HeaderRight = style.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`;

const Logo = style.img`
    margin-right: 30px;
`;

const HeaderText = style.h2`
    font-size: 18px;
    font-weight: 900;
    color: #363131;
    margin-right: 30px;
`;

const LogoutText = style.h2`
    font-size: 18px;
    color: #363131;
    margin-right: 30px;
    cursor: pointer;
    opacity: .7;
`;

const LinkButton = style(Link)`
    background-color: #2281bf;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    &:disabled {
      opacity: .5;
    }
  }
`;

const Header = props => {

    const logoutButton = (e, property) => {
      e.stopPropagation();
      props.logout(props.history);
    };

    return (
      <>
        <StyleHeader>
          <HeaderLeft>
            <Logo src="images/Logo.svg" />
            <HeaderText>Airbnb Pricer</HeaderText>
            <LinkButton to={`/add`}>Add Property +</LinkButton>
          </HeaderLeft>
          <HeaderRight>
            <LogoutText onClick={e => logoutButton(e)}>Logout</LogoutText>
          </HeaderRight>
        </StyleHeader>
      </>
    );
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(withRouter(Header));