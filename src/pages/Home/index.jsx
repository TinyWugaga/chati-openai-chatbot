import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Header = React.lazy(() => import("components/Header"));
const ChatBox = React.lazy(() => import("components/ChatBox"));

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <React.Fragment>
                <Header />
                <CssBaseline />
                <Container maxWidth="md">
                    <ChatBox/>
                </Container>
            </React.Fragment>
        )
    }
}


export default Home;