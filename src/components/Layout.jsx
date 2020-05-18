import React, { Component, Suspense } from "react";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Footer = React.lazy(() => import("./Footer"));


// loading
const loading = () => <div className="text-center">Loading...</div>

class Layout extends Component {
    render() {
        const children = this.props.children || null;
        return (
            <Suspense fallback={loading()}>
                {children}
            </Suspense>
        );
    }
}

export default Layout;