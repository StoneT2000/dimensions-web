import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import './index.scss';

function Header() {
  const [key, setKey] = useState();
  const params: any = useParams();
  const handleClick = (e: any) => {
    setKey(e.key);
  };

  const renderLoginItems = () => {
    return (
      <Menu.Item key="dimensions">
        <Link to="/dimensions" rel="noopener noreferrer">
          Login
        </Link>
      </Menu.Item>
    )
  }

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
        renderLoginItems()
      }
      <Menu.Item className="empty">
      </Menu.Item>
    </Menu>
  );
}

export default Header;
