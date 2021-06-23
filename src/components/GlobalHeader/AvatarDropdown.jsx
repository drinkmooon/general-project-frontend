import { LogoutOutlined, SettingOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event
    if (key === 'logout') {
      const { dispatch } = this.props
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        })
      }
      return
    }
    else {
      history.push(`/user/login`);
    }
  };

  render() {
    console.log(this.props);
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {!currentUser.name && (
          <Menu.Item key='login'>
            <LoginOutlined  />
            立即登录
          </Menu.Item>
        )}
        {currentUser.name && (
          <Menu.Item key='logout'>
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        )}
      </Menu>
    )
    let DefaultAvatar = require('../../assets/avatar.jpg')
    if (!currentUser.name) {
      DefaultAvatar = require('../../assets/anony_avatar.jpg')
      currentUser.name = "亲，请登录"
    }
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={DefaultAvatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <span className={`${styles.action} ${styles.account}`}>
          <Spin
            size="small"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </span>
      );
  }
}

export default connect(({ login }) => ({
  currentUser: login.currentUser,
}))(AvatarDropdown)

