import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Header = React.lazy(() => import("components/Header"));
const ChatBox = React.lazy(() => import("components/ChatBox"));

const Home = (props) => {
    return (
        <div>
            <Header />
            <CssBaseline />
            <Container maxWidth="md">
                <ChatBox />
            </Container>
        </div>
    )
}


export default Home;