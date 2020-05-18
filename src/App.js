import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import './App.css';


// 撰寫如果網頁載入較慢時要 render 的 component
const Loading = () => <div>頁面加載中...</div>
const Layout = React.lazy(() => import("components/Layout"));

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent 
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  //return connect()(HOC);
  return HOC;
}


function App() {

  /*
    //可以依照登入身份不同，回傳不同 Layout
    const getLayout = () => {
      return NonAuthLayout;
    }
  */

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
        {routes.map((route, index) => {
          return (
            <route.route
              key={index}
              path={route.path}
              exact={route.exact}
              component={
                withLayout(props => {
                  return (
                    <Suspense fallback={Loading()}>
                      <Layout {...props} title={route.title}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
            />
          );
        })}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
