import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>论</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="论 是一个校内论文托管平台"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`${new Date().getFullYear()} .Net Course`}
          links={[
            {
              key: 'frontend',
              title: <><GithubOutlined /><span>前端仓库</span></>,
              href: 'https://github.com/drinkmooon/general-project-frontend/tree/PaperHub',
              blankTarget: true,
            },
            {
              key: 'backend',
              title: <><GithubOutlined /><span>后端仓库</span></>,
              href: 'https://github.com/Nntraveler/BookHub_backend',
              blankTarget: true,
            },
            {
              key: 'service',
              title: '联系方式',
              href: 'https://sse.tongji.edu.cn/',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
