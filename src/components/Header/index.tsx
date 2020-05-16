import React, {useState, useContext, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, message } from 'antd';
import './index.scss';
import UserContext from '../../UserContext';
import { logoutUser } from '../../actions/auth';
import { defaultUser } from '../../configs';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [key, setKey] = useState();
  const params: any = useParams();
  const handleClick = (e: any) => {
    setKey(e.key);
  };

  const [loginItems, setLoginItems] = useState<any>();

  const renderLoginItems = () => {
    if (user.loggedIn) {
      setLoginItems(
        <Menu.Item key="logout" onClick={() => {
          logoutUser();
          setUser(defaultUser);
          message.success("Logged out");
        }}>
          Logout
        </Menu.Item>
      )
    }
    else {
      setLoginItems(
        <Menu.Item key="login">
          <Link to={`/dimensions/${params.id}/login`} rel="noopener noreferrer">
            Login
          </Link>
        </Menu.Item>
      );
    }
  }
  useEffect(() => {
    renderLoginItems();
  }, [user]);

  return (
    <Menu onClick={handleClick} selectedKeys={key} mode="horizontal" className="Header">
      <Menu.Item className="logo">
        {/* <Link to="/"><img src={logo} /></Link> */}
      </Menu.Item>
      <Menu.Item key="home">
        <Link to="/" rel="noopener noreferrer">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="dimensions">
        <Link to="/dimensions" rel="noopener noreferrer">
          Dimensions
        </Link>
      </Menu.Item>
      { params.id &&
        loginItems
      }
      <Menu.Item className="empty">
      </Menu.Item>
    </Menu>
  );
}

export default Header;
